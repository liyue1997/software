package com.qgbase.biz.reportSystem.service;

import com.qgbase.biz.reportSystem.domain.RsDls;
import com.qgbase.biz.reportSystem.domain.RsUser;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.biz.user.service.TUserService;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.Constants;
import com.qgbase.util.MD5;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-10-09
 * * 主要用于：代理商 业务处理，此代码为自动生成
 */
@Component
public class RsDlsService extends TBaseBo<RsDls>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    RsUserService rsUserService;

    @Override
    public RsDls createObj() {
        return new RsDls();
    }
    @Override
    public Class getEntityClass() {
        return RsDls.class;
    }

    @Override
    public RsDls newObj(OperInfo oper) throws Exception {
        RsDls obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setDlsId(commonDao.getNewKey("dls", "dls", 4, 2));
        obj.setDlsStatus("0");

        return obj;
    }

	@Override
    public String checkAddorUpdate(RsDls obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(RsDls obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    @Override
    public RsDls addobj(RsDls obj, OperInfo oper) throws Exception {
        RsDls dls= super.addobj(obj, oper);
        //TUser user =tUserService.zhuce(dls.getDlsName(), MD5.MD5Encode("123456") ,dls.getDlsName(),"dls", Constants.role_dlsadmin,oper);
        RsUser user=rsUserService.newObj(oper);
        user.setDlsId(dls.getDlsId());
        user.setDlsUserType(Constants.role_dlsadmin);
        user.setUserName(dls.getDlsName());
        user.setZoneCode(dls.getZoneCode());
        rsUserService.addobj(user,oper);
        return dls;
    }
}