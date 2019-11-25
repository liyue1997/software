package com.qgbase.biz.huodong.service;

import com.qgbase.biz.huodong.domain.HdHuodong2user;
import com.qgbase.biz.huodong.repository.HdHuodong2userRespository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-10-29
 * * 主要用于：活动用户 业务处理，此代码为自动生成
 */
@Component
public class HdHuodong2userService extends TBaseBo<HdHuodong2user>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    HdHuodong2userRespository hdHuodong2userRespository;

    @Override
    public HdHuodong2user createObj() {
        return new HdHuodong2user();
    }
    @Override
    public Class getEntityClass() {
        return HdHuodong2user.class;
    }

    @Override
    public HdHuodong2user newObj(OperInfo oper) throws Exception {
        HdHuodong2user obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setHuodonguserId(commonDao.getNewKey("huser", "huser", 4, 2));


        return obj;
    }

	@Override
    public String checkAddorUpdate(HdHuodong2user obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(HdHuodong2user obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public HdHuodong2user getHuodong(String huodongId,String shopId,String userId, OperInfo oper)throws Exception  {
        return hdHuodong2userRespository.getFirstByHuodongIdAndShopIdAndUserId(huodongId,shopId,userId);
    }
    public HdHuodong2user getHuodongByorder(String orderId, OperInfo oper)throws Exception  {
        return hdHuodong2userRespository.getFirstByPayOrder(orderId);
    }


    public String getOrderid() throws Exception
    {
        return commonDao.getNewKey("hdod", "", 3, 0);
    }

}