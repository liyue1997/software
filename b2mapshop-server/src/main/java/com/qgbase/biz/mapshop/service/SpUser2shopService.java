package com.qgbase.biz.mapshop.service;

import com.qgbase.biz.mapshop.domain.SpUser2shop;
import com.qgbase.biz.mapshop.domain.SpUser2shopKey;
import com.qgbase.biz.mapshop.repository.SpUser2ShopRepository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-08-30
 * * 主要用于：用户浏览收藏得店铺 业务处理，此代码为自动生成
 */
@Component
public class SpUser2shopService extends TBaseBo<SpUser2shop>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    SpUser2ShopRepository spUser2ShopRepository;

    @Override
    public SpUser2shop createObj() {
        return new SpUser2shop();
    }
    @Override
    public Class getEntityClass() {
        return SpUser2shop.class;
    }

    @Override
    public SpUser2shop newObj(OperInfo oper) throws Exception {
        SpUser2shop obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法


        return obj;
    }

	@Override
    public String checkAddorUpdate(SpUser2shop obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        //return super.checkAddorUpdate(obj, oper, isNew);
        return "";
    }
	
	 @Override
    public String checkDelete(SpUser2shop obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		//return super.checkDelete(obj, oper);
         //
         return "";
    }
    @Override
    public SpUser2shop updateobj(SpUser2shop obj,OperInfo oper)throws Exception  {

        tBaseDao.updateobj(obj);
        LogOpinfo("updateobj", obj, oper);
        return obj;
    }

    public SpUser2shop getobj(String shopid, String userId,OperInfo oper) throws Exception {

         List<SpUser2shop> values= spUser2ShopRepository.findByShopIdAndUserId(shopid,userId);
         if (values.size()>0)
             return values.get(0);
         else
             return null;
    }
}