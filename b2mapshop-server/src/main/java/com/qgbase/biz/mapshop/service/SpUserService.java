package com.qgbase.biz.mapshop.service;

import com.qgbase.biz.mapshop.domain.SpUser;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-08-22
 * * 主要用于：买家 业务处理，此代码为自动生成
 */
@Component
public class SpUserService extends TBaseBo<SpUser>{
    @Autowired
    CommonDao commonDao;

    @Override
    public SpUser createObj() {
        return new SpUser();
    }
    @Override
    public Class getEntityClass() {
        return SpUser.class;
    }

    @Override
    public SpUser newObj(OperInfo oper) throws Exception {
        SpUser obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法


        return obj;
    }

	@Override
    public String checkAddorUpdate(SpUser obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(SpUser obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

}