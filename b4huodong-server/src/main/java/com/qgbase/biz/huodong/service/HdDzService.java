package com.qgbase.biz.huodong.service;

import com.qgbase.biz.huodong.domain.HdDz;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-10-29
 * * 主要用于：对账单 业务处理，此代码为自动生成
 */
@Component
public class HdDzService extends TBaseBo<HdDz>{
    @Autowired
    CommonDao commonDao;

    @Override
    public HdDz createObj() {
        return new HdDz();
    }
    @Override
    public Class getEntityClass() {
        return HdDz.class;
    }

    @Override
    public HdDz newObj(OperInfo oper) throws Exception {
        HdDz obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setJzOrderId(commonDao.getNewKey("dzd", "dzd", 4, 2));


        return obj;
    }

	@Override
    public String checkAddorUpdate(HdDz obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(HdDz obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

}