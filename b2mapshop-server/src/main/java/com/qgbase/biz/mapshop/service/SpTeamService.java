package com.qgbase.biz.mapshop.service;

import com.qgbase.app.AppTool;
import com.qgbase.biz.info.domain.TsUser;
import com.qgbase.biz.info.service.TsUserService;
import com.qgbase.biz.info.service.TsUserSettingService;
import com.qgbase.biz.mapshop.domain.SpDiscount;
import com.qgbase.biz.mapshop.domain.SpTeam;
import com.qgbase.biz.mapshop.domain.SpTeamuser;
import com.qgbase.biz.user.domain.TUser;
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
 * Created by Mark on 2019-08-22
 * * 主要用于：组团 业务处理，此代码为自动生成
 */
@Component
public class SpTeamService extends TBaseBo<SpTeam>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    TsUserService tsUserService;
    @Autowired
    SpTeamuserService spTeamuserService;
    @Autowired
    SpDiscountService spDiscountService;
    @Autowired
    TsUserSettingService tsUserSettingService;

    @Override
    public SpTeam createObj() {
        return new SpTeam();
    }
    @Override
    public Class getEntityClass() {
        return SpTeam.class;
    }

    @Override
    public SpTeam newObj(OperInfo oper) throws Exception {
        SpTeam obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setTeamId(commonDao.getNewKey("team", "team", 4, 2));
        obj.setIscancle(0);
        obj.setIsvalided(1);
        obj.setGroupId(0);
        obj.setStartDate(TTool.getSystime());


        return obj;
    }

	@Override
    public String checkAddorUpdate(SpTeam obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(SpTeam obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public void sendmsgtoUser(SpTeam team,String info, OperInfo oper)throws Exception
    {
        List<SpTeamuser> users=spTeamuserService.getTeamusers(team.getTeamId(),oper);
        for (SpTeamuser user:users
             ) {
            String value=tsUserSettingService.getValueBySettingKey(user.getUserId(),"jpushid",oper);
            if (StringUtil.isEmpty(value))
                continue;
            AppTool.pushbyID(value,info);
        }
    }
    //成团后，应该发送一个推送（jpush）
    public void successTeam(SpTeam obj, OperInfo oper)throws Exception  {
        System.out.println("successTeam");
        obj.setEndDate(TTool.getSystime());
        obj.setIsvalided(0);
        updateobj(obj,oper);
        SpDiscount dis= spDiscountService.getobj(obj.getDiscountId(),oper);
        System.out.println(obj.getTeamId()+","+dis.getLastTeamId());
        if (obj.getTeamId().equals(dis.getLastTeamId()))
        {
            dis.setLastTeamId("");
            spDiscountService.updateobj(dis,oper);
        }
        sendmsgtoUser(obj,"你得拼团已经成功！快去购买哦！",oper);
    }
    //取消团后，应该发送一个推送（jpush）
    public void cancleTeam(SpTeam obj, OperInfo oper)throws Exception  {
        System.out.println("cancleTeam");
        obj.setEndDate( TTool.getSystime());
        obj.setIscancle(1);
        updateobj(obj,oper);
        SpDiscount dis= spDiscountService.getobj(obj.getDiscountId(),oper);
        System.out.println(obj.getTeamId()+","+dis.getLastTeamId());
        if (obj.getTeamId().equals(dis.getLastTeamId()))
        {
            dis.setLastTeamId("");
            spDiscountService.updateobj(dis,oper);
        }
        sendmsgtoUser(obj,"你得拼团超时被取消了，请重新参与拼团！",oper);
    }

    public boolean checkTeam(SpTeam obj, OperInfo oper)throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
        //写下你的处理方法
        if (obj==null)
            return false;
        if (obj.getIscancle()==1)
            return false;
        if (obj.getIsvalided()!=1)
            return false;
        if (obj.getTeamUserCount()>=obj.getMinUsers())
        {
            successTeam(obj,oper);
            return false;
        }
        Date date1 = new Date();
        if (date1.after(obj.getValidDate()) )
        {
            cancleTeam(obj,oper);
            return false;
        }

        return true;

    }

    public SpTeam createTeam(SpTeam obj,TUser user, OperInfo oper)throws Exception{
        //   spTeamuserService
        addobj(obj,oper);
        if (spTeamuserService.AddTeamUser(obj,user,oper)) {
            obj.setTeamUserCount(obj.getTeamUserCount() + 1);
            updateobj(obj,oper);
        }
        checkTeam(obj,oper);
        return obj;
    }
    public SpTeam addToTeam(SpTeam obj, TUser user, OperInfo oper)throws Exception{
        if (spTeamuserService.AddTeamUser(obj,user,oper)) {
            obj.setTeamUserCount(obj.getTeamUserCount() + 1);
            updateobj(obj, oper);
        }
        checkTeam(obj,oper);
        return obj;
    }
    public SpTeam leaveTeam(SpTeam obj, TUser user, OperInfo oper)throws Exception{
        if (spTeamuserService.leaveTeamUser(obj,user,oper)) {
            obj.setTeamUserCount(obj.getTeamUserCount() - 1);
            updateobj(obj, oper);
        }
        checkTeam(obj,oper);
        return obj;
    }
}