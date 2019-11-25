package com.qgbase.netty;

import cn.hutool.core.date.DateTime;
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



    public static MessageHandle messageHandle;  // 关键2

    // 关键3
    @PostConstruct
    public void init() {
        messageHandle = this;
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
        //return convertDevice(command);
        return "";

    }

    public OperInfo getOper() throws Exception {
        OperInfo oper=OperInfo.createVirtualUser();

        oper.lastTime= DateTime.now();
        return oper;

    }



}