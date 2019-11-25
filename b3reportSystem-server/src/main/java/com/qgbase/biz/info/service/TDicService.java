package com.qgbase.biz.info.service;

import com.qgbase.biz.info.domain.TDic;
import com.qgbase.biz.info.repository.DicRepository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-08-16
 * * 主要用于：数据字典 业务处理，此代码为自动生成
 */
@Component
public class TDicService extends TBaseBo<TDic>{
    @Autowired
    CommonDao commonDao;

    @Autowired
    DicRepository dicRepository;

    @Override
    public TDic createObj() {
        return new TDic();
    }
    @Override
    public Class getEntityClass() {
        return TDic.class;
    }

    @Override
    public TDic newObj(OperInfo oper) throws Exception {
        TDic obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法


        return obj;
    }

	@Override
    public String checkAddorUpdate(TDic obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(TDic obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public List<TDic> getAllList(OperInfo operInfo) {
        //全部 前端只调用一次 做翻译
        return (List<TDic>) dicRepository.findAllOderByDicTypeAndOrderNo();
    }


    public List<TDic> getByDicType(String dicType, OperInfo operInfo) {
        //isUsed=1
        return (List<TDic>) dicRepository.getByDicType(dicType);
    }
}