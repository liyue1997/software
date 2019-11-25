package com.qgbase.biz.info.service;

import com.qgbase.biz.info.domain.ImGroupUser;
import com.qgbase.biz.info.repository.ImGroupUserRepository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-09-05
 * * 主要用于： 业务处理，此代码为自动生成
 */
@Component
public class ImGroupUserService extends TBaseBo<ImGroupUser>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    ImGroupUserRepository imGroupUserRepository;

    @Override
    public ImGroupUser createObj() {
        return new ImGroupUser();
    }
    @Override
    public Class getEntityClass() {
        return ImGroupUser.class;
    }

    @Override
    public ImGroupUser newObj(OperInfo oper) throws Exception {
        ImGroupUser obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法


        return obj;
    }

	@Override
    public String checkAddorUpdate(ImGroupUser obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法
        return "";
    }
	
	 @Override
    public String checkDelete(ImGroupUser obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法
         return "";
    }
    @Override
    public ImGroupUser updateobj(ImGroupUser obj,OperInfo oper)throws Exception  {

        tBaseDao.updateobj(obj);
        LogOpinfo("updateobj", obj, oper);
        return obj;
    }
    public ImGroupUser getGroupUser(String userId,String groupId,OperInfo oper)throws Exception  {
        List<ImGroupUser> users= imGroupUserRepository.findByUserIdAndAndGroupId(userId,groupId);
        if (users.size()>0)
            return users.get(0);
        return null;
    }

    public List<ImGroupUser> queryGroupUsers() throws  Exception {
        List<ImGroupUser> users= imGroupUserRepository.findByGroupstatusIs(0);
        return users;
    }

}