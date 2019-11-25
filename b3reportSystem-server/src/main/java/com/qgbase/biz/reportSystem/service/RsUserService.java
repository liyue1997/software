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
 * Created by Mark on 2019-10-11
 * * 主要用于：代理商用户 业务处理，此代码为自动生成
 */
@Component
public class RsUserService extends TBaseBo<RsUser>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    TUserService tUserService;

    @Override
    public RsUser createObj() {
        return new RsUser();
    }
    @Override
    public Class getEntityClass() {
        return RsUser.class;
    }

    @Override
    public RsUser newObj(OperInfo oper) throws Exception {
        RsUser obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setUserId(commonDao.getNewKey("USER", "USER", 4, 5));
        obj.setIsActive(Constants.yesorno_Yes);

        return obj;
    }

	@Override
    public String checkAddorUpdate(RsUser obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(RsUser obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }
    @Override
    public RsUser addobj(RsUser obj, OperInfo oper) throws Exception {

        if (obj.getDlsUserType().equals("oper")) {
            TUser user = tUserService.zhuce(obj.getUserPhone(), MD5.MD5Encode("123456"), obj.getUserName(), "dls", Constants.role_dlsoper, oper);
            obj.setUserId(user.getUserId());
        }
        else if (Constants.role_dlsadmin.equals(obj.getDlsUserType()))
        {

            TUser user = tUserService.zhuce(obj.getUserName(), MD5.MD5Encode("123456"), obj.getUserName(), "dls", Constants.role_dlsadmin, oper);
            obj.setUserId(user.getUserId());
        }
        RsUser rsUser= super.addobj(obj, oper);
        return rsUser;
    }

}