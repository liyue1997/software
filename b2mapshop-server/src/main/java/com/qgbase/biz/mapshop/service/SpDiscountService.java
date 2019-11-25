package com.qgbase.biz.mapshop.service;

import com.qgbase.biz.mapshop.domain.SpDiscount;
import com.qgbase.biz.mapshop.domain.SpTeam;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import org.joda.time.DateTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-08-22
 * * 主要用于：商铺优惠 业务处理，此代码为自动生成
 */
@Component
public class SpDiscountService extends TBaseBo<SpDiscount>{
    @Autowired
    CommonDao commonDao;
    @Autowired
    SpTeamService spTeamService;

    @Override
    public SpDiscount createObj() {
        return new SpDiscount();
    }
    @Override
    public Class getEntityClass() {
        return SpDiscount.class;
    }

    @Override
    public SpDiscount newObj(OperInfo oper) throws Exception {
        SpDiscount obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法

        obj.setDiscountId(commonDao.getNewKey("dis", "dis", 4, 2));

        return obj;
    }

	@Override
    public String checkAddorUpdate(SpDiscount obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(SpDiscount obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public SpTeam startTeam(String disid,OperInfo oper) throws Exception{
        SpDiscount obj =getobj(disid,oper);
        TUser user =oper.getCurrentUser();
        SpTeam team=null;
        if (StringUtil.isNotBlank(obj.getLastTeamId()) )
        {
            team= spTeamService.getobj(obj.getLastTeamId(),oper);
            if (spTeamService.checkTeam(team,oper))
            {
                team=  spTeamService.addToTeam(team,user,oper);
                //obj.setLastTeamId(team.getTeamId());
                //updateobj(obj,oper);
                return team;
            }
        }
            team = spTeamService.newObj(oper);
            team.setDiscountId(obj.getDiscountId());
            team.setDiscountDesc(obj.getDiscountDesc());
            team.setTeamUserCount(0);
            team.setValidDate(TTool.addDateMinut(TTool.getSystime(), 4 * 60));
            team.setMinUsers(obj.getMinUsers());
            team.setTeamName(obj.getDiscountName());
            team.setDiscountDesc(obj.getDiscountDesc());
            team.setDiscountId(obj.getDiscountId());
            team.setShopId(obj.getShopId());

            team.setStartUserid(user.getUserId());

        team= spTeamService.createTeam(team, user, oper);
        obj.setLastTeamId(team.getTeamId());
        updateobj(obj,oper);
        return team;


    }

}