package com.qgbase.biz.reportSystem.service;

import com.qgbase.biz.reportSystem.domain.RsDeviceReport;
import com.qgbase.biz.reportSystem.domain.RsDevicelog;
import com.qgbase.biz.reportSystem.repository.RsDeviceReportRespository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.List;


/**
 * Created by Mark on 2019-10-09
 * * 主要用于：设备使用统计 业务处理，此代码为自动生成
 */
@Component
public class RsDeviceReportService extends TBaseBo<RsDeviceReport>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    RsDeviceReportRespository rsDeviceReportRespository;

    @Override
    public RsDeviceReport createObj() {
        return new RsDeviceReport();
    }
    @Override
    public Class getEntityClass() {
        return RsDeviceReport.class;
    }

    @Override
    public RsDeviceReport newObj(OperInfo oper) throws Exception {
        RsDeviceReport obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setLogId(commonDao.getNewKey("rlog", "rlog", 4, 2));



        return obj;
    }

	@Override
    public String checkAddorUpdate(RsDeviceReport obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(RsDeviceReport obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }
    public RsDeviceReport newReport(RsDevicelog rsDevicelog, OperInfo oper)throws Exception
    {
        RsDeviceReport obj=newObj(oper);
        Date now=rsDevicelog.getStartDate();
        Calendar cal = Calendar.getInstance();
        cal.setTime(now);
        String year=Integer.toString(cal.get(Calendar.YEAR)) ;
        String month=year+Integer.toString(cal.get(Calendar.MONTH)+1);
        String day=month+Integer.toString(cal.get(Calendar.DAY_OF_MONTH)) ;
        String week=year+Integer.toString(cal.get(Calendar.WEEK_OF_YEAR));
        obj.setLogDay(day);
        obj.setLogMonth(month);
        obj.setLogYear(year);
        obj.setLogWeek(week);
        obj.setErrorTimes(0);
        obj.setUseTime(0);
        obj.setUseTimes(0);
        return obj;
    }

    public RsDeviceReport reportUseLog(RsDevicelog rsDevicelog, OperInfo oper) throws Exception  {
        Date now=rsDevicelog.getStartDate();
        Calendar cal = Calendar.getInstance();
        cal.setTime(now);
        String year=Integer.toString(cal.get(Calendar.YEAR)) ;
        String month=year+Integer.toString(cal.get(Calendar.MONTH)+1);
        String day=month+Integer.toString(cal.get(Calendar.DAY_OF_MONTH)) ;
        String week=year+Integer.toString(cal.get(Calendar.WEEK_OF_YEAR));
        RsDeviceReport rsDeviceReport= rsDeviceReportRespository.getFirstByDeviceIdAndAndLogDay(rsDevicelog.getDeviceId(),day);
        if ( rsDeviceReport==null)
        {
            rsDeviceReport =newReport(rsDevicelog,oper);
            rsDeviceReport.setClientId(rsDevicelog.getClientId());
            rsDeviceReport.setDeviceId(rsDevicelog.getDeviceId());
            rsDeviceReport.setDeviceType(rsDevicelog.getDeviceType());
            rsDeviceReport.setDeviceUuid(rsDevicelog.getDeviceUuid());
            rsDeviceReport.setDlsId(rsDevicelog.getDlsId());
            rsDeviceReport.setYwUserId(rsDevicelog.getYwUserId());
            rsDeviceReport.setUseTimes(rsDeviceReport.getUseTimes()+1);
            rsDeviceReport.setUseTime(rsDeviceReport.getUseTime()+rsDevicelog.getUseTime());
            return addobj(rsDeviceReport,oper);

        }
        else
        {

            rsDeviceReport.setUseTimes(rsDeviceReport.getUseTimes()+1);
            rsDeviceReport.setUseTime(rsDeviceReport.getUseTime()+rsDevicelog.getUseTime());
            return updateobj(rsDeviceReport,oper);
        }
    }

}