package com.qgbase.biz.huodong.service;

import com.qgbase.biz.huodong.domain.HdHuodong;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


/**
 * Created by Mark on 2019-10-29
 * * 主要用于：活动 业务处理，此代码为自动生成
 */
@Component
public class HdHuodongService extends TBaseBo<HdHuodong>{
    @Autowired
    CommonDao commonDao;

    @Override
    public HdHuodong createObj() {
        return new HdHuodong();
    }
    @Override
    public Class getEntityClass() {
        return HdHuodong.class;
    }

    @Override
    public HdHuodong newObj(OperInfo oper) throws Exception {
        HdHuodong obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setHuodongId(commonDao.getNewKey("hd", "hd", 4, 2));
        obj.setStartTime(new Date());
        obj.setEndTime(TTool.addDateDay(new Date(),7));
        obj.setIsNeedpay(1);
        obj.setPayFee("0");
        obj.setPayMoney("0");
        obj.setUserLimit(99999);
        obj.setHuodongStatus("0");
        return obj;
    }

	@Override
    public String checkAddorUpdate(HdHuodong obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(HdHuodong obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

}