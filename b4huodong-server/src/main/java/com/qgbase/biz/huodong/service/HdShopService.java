package com.qgbase.biz.huodong.service;

import com.qgbase.biz.huodong.domain.HdShop;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-10-29
 * * 主要用于：门店 业务处理，此代码为自动生成
 */
@Component
public class HdShopService extends TBaseBo<HdShop>{
    @Autowired
    CommonDao commonDao;

    @Override
    public HdShop createObj() {
        return new HdShop();
    }
    @Override
    public Class getEntityClass() {
        return HdShop.class;
    }

    @Override
    public HdShop newObj(OperInfo oper) throws Exception {
        HdShop obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setShopId(commonDao.getNewKey("shop", "shop", 4, 2));
        obj.setShopLevel("1");
        obj.setShopStatus("0");
        obj.setHkSpeed("0");


        return obj;
    }

	@Override
    public String checkAddorUpdate(HdShop obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(HdShop obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

}