package com.qgbase.netty;

import cn.hutool.core.date.DateTime;
import com.qgbase.biz.reportSystem.domain.RsDevice;
import com.qgbase.biz.reportSystem.domain.RsDeviceLastlog;
import com.qgbase.biz.reportSystem.domain.RsDeviceerrorlog;
import com.qgbase.biz.reportSystem.domain.RsDevicelog;
import com.qgbase.biz.reportSystem.service.*;
import com.qgbase.common.domain.OperInfo;

import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import com.qgbase.util.TToolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import  com.qgbase.netty.NewCommand;

/**
 * @author : Winner
 * @name :
 * @date : 2019/6/14 0014
 * @desc :
 */
@Component
public class MessageHandle {

    @Autowired
    private RsDeviceerrorlogService rsDeviceerrorlogService;
    @Autowired
    RsDevicelogService rsDevicelogService;
    @Autowired
    RsDeviceReportService rsDeviceReportService;
    @Autowired
    RsDeviceLastlogService rsDeviceLastlogService;
    @Autowired
    private RsDeviceService deviceService;

    public static MessageHandle messageHandle;  // 关键2

    // 关键3
    @PostConstruct
    public void init() {
        messageHandle = this;
        messageHandle.deviceService = this.deviceService;
        messageHandle.rsDevicelogService = this.rsDevicelogService;
        messageHandle.rsDeviceerrorlogService = this.rsDeviceerrorlogService;
        messageHandle.rsDeviceReportService = this.rsDeviceReportService;
        messageHandle.rsDeviceLastlogService=this.rsDeviceLastlogService;
    }

    public String getError(String errorType,String info)
    {
        return "AA65,"+errorType+","+info;
    }
    public String getSuccess(NewCommand command,String info)
    {
        return "AA66,"+command.getUuid()+","+info;
    }

    public String  decode(String cmd)throws Exception{
        NewCommand command = new NewCommand();
        command.setData(cmd.split(","));
        if (command.getData().length <5)
            return getError("cmd length error","count:"+command.getData().length);
        command.setHead(command.getData()[0]);
        if (!command.getHead().equals("AA55"))
            return getError("cmd head error","head:"+command.getHead());
        command.setDeviceType(command.getData()[1]);
        command.setCmd(command.getData()[2]);
        //command.setDataLen(cmd.substring(6,8));
        command.setUuid(command.getData()[3]);
        //int dlen = Integer.valueOf(command.getDataLen());
        //command.setData(cmd.substring(25,25+(dlen - 17)));
        return convertDevice(command);

    }

    public OperInfo getOper() throws Exception {
        OperInfo oper=OperInfo.createVirtualUser();

        oper.lastTime= DateTime.now();
        return oper;

    }
    public RsDeviceLastlog getLastLog(NewCommand command,OperInfo operInfo) throws Exception {
        RsDeviceLastlog rsDeviceLastlog= messageHandle.rsDeviceLastlogService.getobj(command.getDeviceId(),operInfo);
        if (rsDeviceLastlog==null)
        {
            rsDeviceLastlog=messageHandle.rsDeviceLastlogService.newObj(operInfo);
            rsDeviceLastlog.setDeviceId(command.getDeviceId());
            return messageHandle.rsDeviceLastlogService.addobj(rsDeviceLastlog,operInfo);
        }
        return rsDeviceLastlog;
    }
    public RsDeviceLastlog handLastlog(RsDeviceLastlog lastlog,OperInfo operInfo) throws Exception {
        if (StringUtil.isEmpty(lastlog.getLastLogid()))
            return lastlog;
        RsDevicelog rsDevicelog= messageHandle.rsDevicelogService.getobj(lastlog.getLastLogid(),operInfo);
        if (rsDevicelog!=null)
        {
            System.out.println(rsDevicelog.getEndDate());
            messageHandle.rsDevicelogService.endDeviceLog(rsDevicelog,operInfo);
        }
        lastlog.setLastLogid("");
        return messageHandle.rsDeviceLastlogService.updateobj(lastlog,operInfo);
    }
    public String convertDevice(NewCommand command) throws Exception {
        //String deviceName;
        System.out.println(command);
        OperInfo operInfo=getOper();
        //
        RsDevice rsDevice=messageHandle.deviceService.getByUuid(command.getUuid(),operInfo);
        if (rsDevice==null)
        {
            if (command.getUuid().length()!=17)
                return getError("cmd uuid error","uuid:"+command.getUuid());
            return getError("cmd uuid not regist","uuid:"+command.getUuid());
        }
        command.setDeviceId(rsDevice.getDeviceId());
        switch (command.getCmd())
        {
            case "1":
                //开机时，如果有未处理得记录，应该记录未最后心跳时间
                if (command.getData().length <7)
                    return getError("cmd start length error","count:"+command.getData().length);
                rsDevice.setDeviceLat(command.getData()[4]);
                rsDevice.setDeviceLon(command.getData()[5]);
                rsDevice.setSoftVersion(command.getData()[6]);
                messageHandle.deviceService.updateobj(rsDevice,operInfo);
                RsDeviceLastlog rsDeviceLastlog=getLastLog(command,operInfo);
                handLastlog(rsDeviceLastlog,operInfo);
                if (rsDevice.getDeviceStatus().equals("1"))
                    return getSuccess(command,"0");
                else
                    return getSuccess(command,"1");
            case "2":
                if (command.getData().length <7)
                    return getError("cmd workstart length error","count:"+command.getData().length);
                RsDeviceLastlog rsDeviceLastlog1=getLastLog(command,operInfo);
                rsDeviceLastlog1=handLastlog(rsDeviceLastlog1,operInfo);

                RsDevicelog rsDevicelog=messageHandle.rsDevicelogService.newObj(operInfo);
                rsDevicelog.setDeviceId(rsDevice.getDeviceId());
                rsDevicelog.setDeviceType(rsDevice.getDeviceType());
                rsDevicelog.setClientId(rsDevice.getClientId());
                rsDevicelog.setDeviceUuid(rsDevice.getDeviceUuid());
                rsDevicelog.setDlsId(rsDevice.getDlsId());
                rsDevicelog.setYwUserId(rsDevice.getYwUserId());
                rsDevicelog.setOpname(command.getData()[5]);
                rsDevicelog.setStartDate(new Date());
                rsDevicelog.setUseTime(0);
                messageHandle.rsDevicelogService.addobj(rsDevicelog,operInfo);
                rsDeviceLastlog1.setLastLogid(rsDevicelog.getLogId());
                messageHandle.rsDeviceLastlogService.updateobj(rsDeviceLastlog1,operInfo);

                if (rsDevice.getDeviceStatus().equals("1"))
                    return getSuccess(command,"0");
                else
                    return getSuccess(command,"1");
            case "3":
                RsDeviceLastlog rsDeviceLastlog2=getLastLog(command,operInfo);
                rsDeviceLastlog2=handLastlog(rsDeviceLastlog2,operInfo);
                return getSuccess(command,"0");
            case "4":
                if (command.getData().length <6)
                    return getError("cmd errorreport length error","count:"+command.getData().length);
                RsDeviceerrorlog rsDeviceerrorlog=  messageHandle.rsDeviceerrorlogService.newObj(operInfo);
                rsDeviceerrorlog.setDeviceId(rsDevice.getDeviceId());
                rsDeviceerrorlog.setDeviceType(rsDevice.getDeviceType());
                rsDeviceerrorlog.setClientId(rsDevice.getClientId());
                rsDeviceerrorlog.setDeviceUuid(rsDevice.getDeviceUuid());
                rsDeviceerrorlog.setDlsId(rsDevice.getDlsId());
                rsDeviceerrorlog.setYwUserId(rsDevice.getYwUserId());
                rsDeviceerrorlog.setErrorType(command.getData()[5]);
                rsDeviceerrorlog=  messageHandle.rsDeviceerrorlogService.addobj(rsDeviceerrorlog,operInfo);
                return getSuccess(command,"0");
            case "5":
                if (command.getData().length <6)
                    return getError("cmd errorendreport length error","count:"+command.getData().length);
                messageHandle.rsDeviceerrorlogService.handleError(rsDevice.getDeviceId(),command.getData()[5],operInfo);
                //需要处理统计报表
                return getSuccess(command,"0");
            case "8":
                if (command.getData().length <6)
                    return getError("cmd heart length error","count:"+command.getData().length);
                //需要 检查是否工作中，检查是否异常中，处理心跳时间

                RsDeviceLastlog rsDeviceLastlog3=getLastLog(command,operInfo);
                rsDeviceLastlog3.setModifyDate(new Date());
                messageHandle.rsDeviceLastlogService.updateobj(rsDeviceLastlog3,operInfo);

                if (rsDevice.getDeviceStatus().equals("1"))
                    return getSuccess(command,"0");
                else
                    return getSuccess(command,"1");


            default:
                    return getError("cmd cmd error","cmd:"+command.getCmd());

        }

    }

}