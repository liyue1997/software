package com.qgbase.biz.reportSystem.service;

import com.qgbase.biz.reportSystem.domain.RsDevicelog;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


/**
 * Created by Mark on 2019-10-09
 * * 主要用于：设备使用记录 业务处理，此代码为自动生成
 */
@Component
public class RsDevicelogService extends TBaseBo<RsDevicelog>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    RsDeviceReportService rsDeviceReportService;

    @Override
    public RsDevicelog createObj() {
        return new RsDevicelog();
    }
    @Override
    public Class getEntityClass() {
        return RsDevicelog.class;
    }

    @Override
    public RsDevicelog newObj(OperInfo oper) throws Exception {
        RsDevicelog obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setLogId(commonDao.getNewKey("dlog", "dlog", 4, 2));


        return obj;
    }

	@Override
    public String checkAddorUpdate(RsDevicelog obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(RsDevicelog obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public RsDevicelog endDeviceLog(RsDevicelog rsDevicelog, OperInfo oper) throws Exception  {
        if (rsDevicelog.getEndDate()==null)
        {
            rsDevicelog.setEndDate(new Date());
            rsDevicelog.setUseTime(TTool.getTimeDelta(rsDevicelog.getStartDate(),rsDevicelog.getEndDate()));
            rsDevicelog =this.updateobj(rsDevicelog,oper);
            //还需要处理 统计表
            rsDeviceReportService.reportUseLog(rsDevicelog,oper);
        }
        else
            logger.warn("Devicelog has end,logid:"+rsDevicelog.getLogId());
        return rsDevicelog;
    }

}