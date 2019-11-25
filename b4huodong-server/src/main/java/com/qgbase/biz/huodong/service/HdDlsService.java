package com.qgbase.biz.huodong.service;

import com.qgbase.biz.huodong.domain.HdDls;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-10-29
 * * 主要用于：代理商 业务处理，此代码为自动生成
 */
@Component
public class HdDlsService extends TBaseBo<HdDls>{
    @Autowired
    CommonDao commonDao;

    @Override
    public HdDls createObj() {
        return new HdDls();
    }
    @Override
    public Class getEntityClass() {
        return HdDls.class;
    }

    @Override
    public HdDls newObj(OperInfo oper) throws Exception {
        HdDls obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setDlsId(commonDao.getNewKey("dls", "dls", 4, 2));
        obj.setDlsStatus("0");



        return obj;
    }

	@Override
    public String checkAddorUpdate(HdDls obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(HdDls obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

}