package com.qgbase.biz.info.service;

import com.qgbase.biz.info.domain.AppDevice;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-08-03
 * * 主要用于：用户设备 业务处理，此代码为自动生成
 */
@Component
public class AppDeviceService extends TBaseBo<AppDevice>{
    @Autowired
    CommonDao commonDao;

    @Override
    public AppDevice createObj() {
        return new AppDevice();
    }
    @Override
    public Class getEntityClass() {
        return AppDevice.class;
    }

    @Override
    public AppDevice newObj(OperInfo oper) throws Exception {
        AppDevice obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法


        return obj;
    }

	@Override
    public String checkAddorUpdate(AppDevice obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(AppDevice obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

}