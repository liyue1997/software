package com.qgbase.biz.reportSystem.service;

import com.qgbase.biz.reportSystem.domain.RsDevice;
import com.qgbase.biz.reportSystem.repository.RsDeviceRespository;
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
 * * 主要用于：设备 业务处理，此代码为自动生成
 */
@Component
public class RsDeviceService extends TBaseBo<RsDevice>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    RsDeviceRespository rsDeviceRespository;

    @Override
    public RsDevice createObj() {
        return new RsDevice();
    }
    @Override
    public Class getEntityClass() {
        return RsDevice.class;
    }

    @Override
    public RsDevice newObj(OperInfo oper) throws Exception {
        RsDevice obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法

        obj.setDeviceId(commonDao.getNewKey("Device", "Device", 4, 2));
        obj.setDeviceStatus("0");
        //obj.setSellDate(new Date());

        return obj;
    }

	@Override
    public String checkAddorUpdate(RsDevice obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(RsDevice obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public RsDevice getByUuid(String uuid,OperInfo oper) throws Exception  {
        return rsDeviceRespository.getFirstByDeviceUuid(uuid);
    }

}