package com.qgbase.biz.info.service;

import com.qgbase.biz.info.domain.AppVer;
import com.qgbase.biz.info.repository.AppVerRespository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.exception.SysRunException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-08-03
 * * 主要用于：手机端版本 业务处理，此代码为自动生成
 */
@Component
public class AppVerService extends TBaseBo<AppVer>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    AppVerRespository appVerRespository;

    @Override
    public AppVer createObj() {
        return new AppVer();
    }
    @Override
    public Class getEntityClass() {
        return AppVer.class;
    }

    @Override
    public AppVer newObj(OperInfo oper) throws Exception {
        AppVer obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法


        return obj;
    }

	@Override
    public String checkAddorUpdate(AppVer obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
    @Override
    public String checkDelete(AppVer obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public AppVer getbyVer(String ver,String userType)   {
        //先根据 ver +userType 找
        List<AppVer> apps=appVerRespository.findByTVerAndTUsertype(ver,userType);
        if (apps.size()>0)
            return apps.get(0);
        //如果找不到，根据 ver +userType=0 找
        apps=appVerRespository.findByTVerAndTUsertype(ver,"0");
        if (apps.size()>0)
            return apps.get(0);
        //如果找不到，根据 ver=0+userType 找
        apps=appVerRespository.findByTVerAndTUsertype("0",userType);
        if (apps.size()>0)
            return apps.get(0);
        //如果找不到，根据 ver=0+userType=0 找
        apps=appVerRespository.findByTVerAndTUsertype("0","0");
        if (apps.size()>0)
            return apps.get(0);
        throw new SysRunException("-2", "AppVer 未初始化");

    }

}