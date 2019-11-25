package com.qgbase.biz.mapshop.service;

import com.qgbase.biz.info.domain.TsUser;
import com.qgbase.biz.mapshop.domain.SpTeam;
import com.qgbase.biz.mapshop.domain.SpTeamuser;
import com.qgbase.biz.mapshop.domain.SpUser2shop;
import com.qgbase.biz.mapshop.repository.SpTeamuserRepository;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-08-22
 * * 主要用于：组团成员 业务处理，此代码为自动生成
 */
@Component
public class SpTeamuserService extends TBaseBo<SpTeamuser>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    SpTeamuserRepository spTeamuserRepository;

    @Override
    public SpTeamuser createObj() {
        return new SpTeamuser();
    }
    @Override
    public Class getEntityClass() {
        return SpTeamuser.class;
    }

    @Override
    public SpTeamuser newObj(OperInfo oper) throws Exception {
        SpTeamuser obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setIscare(0);
        obj.setIspayed(0);
        obj.setIsteamer(1);
        obj.setShopCredits(0);
        obj.setShopCreditsDesc("");
        obj.setUserCredits(0);
        obj.setUserCreditsDesc("");
        obj.setStartDate(TTool.getSystime());



        return obj;
    }

	@Override
    public String checkAddorUpdate(SpTeamuser obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        //return super.checkAddorUpdate(obj, oper, isNew);
        return "";
    }
	
	 @Override
    public String checkDelete(SpTeamuser obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		//return super.checkDelete(obj, oper);
         return "";
    }
    public SpTeamuser getTeamuser(String teamId,String userId,OperInfo oper) throws Exception{
        List<SpTeamuser> users= spTeamuserRepository.findByTeamIdAndUserId(teamId,userId);
        if (users.size()>0)
            return users.get(0);
        return null;
    }
    public List<SpTeamuser> getTeamusers(String teamId,OperInfo oper) throws Exception{
        List<SpTeamuser> users= spTeamuserRepository.findByTeamId(teamId);
        System.out.println("getTeamusers "+teamId+":"+users.size());
        return users;
    }

    public boolean AddTeamUser(SpTeam team, TUser user, OperInfo oper) throws Exception  {
        if (getTeamuser(team.getTeamId(),user.getUserId(),oper)==null)
        {
            SpTeamuser ts=newObj(oper);
            ts.setUserId(user.getUserId());
            ts.setTeamId(team.getTeamId());
            addobj(ts,oper);
            return true;
        }
        return false;

    }
    public boolean leaveTeamUser(SpTeam team, TUser user, OperInfo oper) throws Exception  {
        List<SpTeamuser> teamuusers=spTeamuserRepository.findByTeamIdAndUserId(team.getTeamId(),user.getUserId());
        if (teamuusers.size()>0)
        {
            SpTeamuser ts=teamuusers.get(0);
            tBaseDao.deleteobj(getEntityClass(), ts);
            LogOpinfo("deleteobj", ts, oper);
            return true;
        }
        return false;

    }
    @Override
    public SpTeamuser updateobj(SpTeamuser obj, OperInfo oper)throws Exception  {

        tBaseDao.updateobj(obj);
        LogOpinfo("updateobj", obj, oper);
        return obj;
    }

}