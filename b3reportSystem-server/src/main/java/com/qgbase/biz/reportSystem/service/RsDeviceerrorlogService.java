package com.qgbase.biz.reportSystem.service;

import com.qgbase.biz.reportSystem.domain.RsDeviceerrorlog;
import com.qgbase.biz.reportSystem.repository.RsDeviceerrorlogRespository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


/**
 * Created by Mark on 2019-10-09
 * * 主要用于：设备异常记录 业务处理，此代码为自动生成
 */
@Component
public class RsDeviceerrorlogService extends TBaseBo<RsDeviceerrorlog>{
    @Autowired
    CommonDao commonDao;
@Autowired
RsDeviceerrorlogRespository rsDeviceerrorlogRespository;

    @Override
    public RsDeviceerrorlog createObj() {
        return new RsDeviceerrorlog();
    }
    @Override
    public Class getEntityClass() {
        return RsDeviceerrorlog.class;
    }

    @Override
    public RsDeviceerrorlog newObj(OperInfo oper) throws Exception {
        RsDeviceerrorlog obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setLogId(commonDao.getNewKey("elog", "elog", 4, 2));
        obj.setHandleBak("");
        obj.setStartDate(new Date());
        obj.setUseTime(0);



        return obj;
    }

	@Override
    public String checkAddorUpdate(RsDeviceerrorlog obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(RsDeviceerrorlog obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public void handleError(String deviceid,String errorType, OperInfo oper) throws Exception  {
       List<RsDeviceerrorlog> rsDeviceerrorlogs=  rsDeviceerrorlogRespository.findByDeviceIdAndErrorTypeAndEndDateIsNull(deviceid,errorType);
        for (RsDeviceerrorlog rslog:rsDeviceerrorlogs
             ) {
            rslog.setEndDate(new Date());
            updateobj(rslog,oper);
        }
    }

}