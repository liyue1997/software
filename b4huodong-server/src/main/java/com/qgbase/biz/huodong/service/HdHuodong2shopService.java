package com.qgbase.biz.huodong.service;

import com.qgbase.biz.huodong.domain.HdHuodong2shop;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-10-29
 * * 主要用于：活动门店 业务处理，此代码为自动生成
 */
@Component
public class HdHuodong2shopService extends TBaseBo<HdHuodong2shop>{
    @Autowired
    CommonDao commonDao;

    @Override
    public HdHuodong2shop createObj() {
        return new HdHuodong2shop();
    }
    @Override
    public Class getEntityClass() {
        return HdHuodong2shop.class;
    }

    @Override
    public HdHuodong2shop newObj(OperInfo oper) throws Exception {
        HdHuodong2shop obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法


        return obj;
    }

	@Override
    public String checkAddorUpdate(HdHuodong2shop obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(HdHuodong2shop obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

}