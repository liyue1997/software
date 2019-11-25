package com.qgbase.biz.info.service;

import com.qgbase.biz.info.domain.HdBaoming;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-11-06
 * * 主要用于：报名申请 业务处理，此代码为自动生成
 */
@Component
public class HdBaomingService extends TBaseBo<HdBaoming>{
    @Autowired
    CommonDao commonDao;

    @Override
    public HdBaoming createObj() {
        return new HdBaoming();
    }
    @Override
    public Class getEntityClass() {
        return HdBaoming.class;
    }

    @Override
    public HdBaoming newObj(OperInfo oper) throws Exception {
        HdBaoming obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setBaomingId(commonDao.getNewKey("shop", "shop", 4, 2));
        obj.setHandleStatus("0");

        return obj;
    }

	@Override
    public String checkAddorUpdate(HdBaoming obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(HdBaoming obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

}