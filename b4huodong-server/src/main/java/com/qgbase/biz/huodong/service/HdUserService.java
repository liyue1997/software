package com.qgbase.biz.huodong.service;

import com.qgbase.biz.huodong.domain.HdUser;
import com.qgbase.biz.huodong.repository.HdUserRespository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-10-29
 * * 主要用于：门店用户 业务处理，此代码为自动生成
 */
@Component
public class HdUserService extends TBaseBo<HdUser>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    HdUserRespository hdUserRespository;

    @Override
    public HdUser createObj() {
        return new HdUser();
    }
    @Override
    public Class getEntityClass() {
        return HdUser.class;
    }

    @Override
    public HdUser newObj(OperInfo oper) throws Exception {
        HdUser obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setIsActive(1);



        return obj;
    }

	@Override
    public String checkAddorUpdate(HdUser obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(HdUser obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public HdUser getByWeixinId(String weixinid,OperInfo oper) throws Exception{
        return hdUserRespository.getFirstByUserWeixinid(weixinid);
    }

}