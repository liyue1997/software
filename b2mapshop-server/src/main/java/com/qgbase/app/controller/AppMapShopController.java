package com.qgbase.app.controller;

import cn.hutool.core.date.DateTime;
import com.qgbase.app.TIMserver;
import com.qgbase.app.dao.TAppQuery;
import com.qgbase.app.domain.*;
import com.qgbase.biz.info.domain.*;
import com.qgbase.biz.info.service.*;
import com.qgbase.biz.mapshop.TmapshopQuery;
import com.qgbase.biz.mapshop.domain.SpShop;
import com.qgbase.biz.mapshop.domain.SpTeam;
import com.qgbase.biz.mapshop.domain.SpTeamuser;
import com.qgbase.biz.mapshop.domain.SpUser2shop;
import com.qgbase.biz.mapshop.service.*;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.biz.user.service.TUserService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.Constants;
import com.qgbase.util.PageControl;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import com.qgbase.util.TToolRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 手机端接口
 *
 * @author mark
 * @date 2019-08-02
 */
@RestController
public class AppMapShopController extends BaseController {

    @Autowired
    SpTeamService spTeamService;
    @Autowired
    TmapshopQuery tmapshopQuery;
    @Autowired
    SpDiscountService spDiscountService;
    @Autowired
    SpUser2shopService spUser2shopService;
    @Autowired
    SpTeamuserService spTeamuserService;
    @Autowired
    ImGroupUserService imGroupUserService;

    @Autowired
    SpShopService spShopService;
    @Autowired
    TsUserSettingService tsUserSettingService;

    public CommonRet miniprogramUserinfo(HttpServletRequest request,OperInfo oper) throws Exception{
        String userid=getParmams("userid", request);
        String username=getParmams("username", request);
        String phone=getParmams("phone", request);
        String shopname=getParmams("shopname", request);
        String picture=getParmams("picture", request);

        TUser user = tUserService.getobj(userid,oper);
        user.setUsername(username);
        tUserService.updateobj(user,oper);

        SpShop shop= spShopService.newObj(oper);
        shop.setShopName(shopname);
        shop.setShopFullname(shopname);
        shop.setShopPhone(phone);
        shop=spShopService.addobj(shop,oper);

        TsUserSetting wxin1=tsUserSettingService.newObj(oper);
        wxin1.setSettingKey("shopid");
        wxin1.setSettingValue(shop.getShopId());
        wxin1.setUserId(userid);
        tsUserSettingService.addobj(wxin1,oper);

        updateUserHeadPic(userid,picture,picture,oper);

        return CommonDataRet.getObject(shop);
    }

    @RequestMapping(value = "/app/mapshop")
    public CommonRet index() throws Exception {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        HttpServletResponse response = servletRequestAttributes.getResponse();
        System.out.println(request.getQueryString());
        String command = request.getParameter("command");
        System.out.println(command);
        try {
            OperInfo oper=getOper(request);// OperInfo.createVirtualUser();
            if (oper==null && !command.equals("CommonJust") )
                return CommonRet.getFail("请重新登录");
            if (StringUtil.isNotBlank(command)) {
                switch (command) {
                    case "queryteams": //首页获取组团
                        Map<String,String> map = new HashMap<String,String>();
                        map.put("len","6");
                        map.put("page","1");
                        map.put("isvalided","1");
                        map.put("iscancle","0");
                        map.put("start_valid_date", TTool.getDatetimeString(TTool.getSystime()));
                        map.put("groupid",getParmams("groupid",request));
                        PageControl page= tmapshopQuery.querySpTeamList(map,oper);

                        return CommonPageRet.getObject(page)   ;

                    case "queryteams_user": //查询个人
                        Map<String,String> mapUser = new HashMap<String,String>();
                        mapUser.put("len","20");
                        mapUser.put("page","1");
                        mapUser.put("isvalided",getParmams("isvalided",request));
                        mapUser.put("iscancle",getParmams("iscancle",request));
                        mapUser.put("teamuserid",oper.getCurrentUser().getUserId());
                        mapUser.put("shop_credits",getParmams("shop_credits",request));
                        if ("1".equals(getParmams("valid_date",request)))
                            mapUser.put("start_valid_date", TTool.getDatetimeString(TTool.getSystime()));
                        PageControl pageUser= tmapshopQuery.querySpTeamList(mapUser,oper);

                        return CommonPageRet.getObject(pageUser)   ;
                    case "queryshops": //首页获取组团
                        Map<String,String> map1 = new HashMap<String,String>();
                        map1.put("shop_name",getParmams("shopname",request));
                        map1.put("loveuser",getParmams("userid",request));
                        map1.put("len","20");
                        map1.put("page","1");
//zlon=118.7896400607547&zlan=31.99540434262711&ylon=118.81939193924518&ylan=31.95742370132319
                        map1.put("zlon",getParmams("zlon",request));
                        map1.put("zlan",getParmams("zlan",request));
                        map1.put("ylon",getParmams("ylon",request));
                        map1.put("ylan",getParmams("ylan",request));

                        PageControl page1= tmapshopQuery.querySpShopList(map1,oper);

                        return CommonPageRet.getObject(page1)   ;

                    case "querydisc": //首页获取组团
                        Map<String,String> map2 = new HashMap<String,String>();
                        map2.put("shop_id",getParmams("shop_id",request));
                        map2.put("discount_id",getParmams("discount_id",request));
                        map2.put("len","20");
                        map2.put("page","1");
                        PageControl page2= tmapshopQuery.querySpDiscountList(map2,oper);

                        return CommonPageRet.getObject(page2)   ;
                    case "getteam": //首页获取组团
                        Map<String,String> map3 = new HashMap<String,String>();
                        map3.put("team_id",getParmams("teamid",request));
                        map3.put("len","20");
                        map3.put("page","1");
                        PageControl page3= tmapshopQuery.querySpTeamList(map3,oper);

                        return CommonPageRet.getObject(page3)   ;
                    case "startteam": //首页获取组团
                        String discount_id=getParmams("discount_id",request);
                        SpTeam teamjoin=spDiscountService.startTeam(discount_id,oper);
                        //ImGroupUser guser= imGroupUserService.newObj(oper);
                        //guser.setGroupId();

                        TIMserver.addGroup(teamjoin.getTeamId(),teamjoin.getTeamName(),teamjoin.getStartUserid()
                           ,tPictureService.getImgOneSurl(teamjoin.getShopId(),"shop_img",""));

                        return CommonDataRet.getObject(teamjoin);
                    case "jointeam": //首页获取组团
                        String last_team_id=getParmams("team_id",request);
                        SpTeam team=spTeamService.getobj(last_team_id,oper);
                        if (spTeamService.checkTeam(team,oper)) {
                            //不用加团就可以直接聊天
                            //TIMserver.addGroupUser(team.getTeamId(),getUserid(request));

                            return CommonDataRet.getObject(spTeamService.addToTeam(team,
                                    oper.getCurrentUser(), oper));
                        }
                        else
                            return CommonRet.getFail("拼团已经结束，请加入下一拼团");
                    case "cancleteam": //首页获取组团
                        String team_id1=getParmams("team_id",request);
                        SpTeam team1=spTeamService.getobj(team_id1,oper);
                        if (spTeamService.checkTeam(team1,oper))
                            return CommonDataRet.getObject( spTeamService.leaveTeam(team1,
                                    oper.getCurrentUser(), oper));
                        else
                            return CommonRet.getFail("拼团已经结束，请加入下一拼团");
                    case "getloveshop":
                        SpUser2shop v2= spUser2shopService.getobj(getParmams("shopid",request),getParmams("userid",request),oper);
                        if (v2 ==null)
                            return CommonRet.getSuccess("-1");
                        if (v2.getIslove()==1)
                            return CommonRet.getSuccess("1");
                        else
                            return CommonRet.getSuccess("0");
                    case "loveshop":
                        SpUser2shop v1= spUser2shopService.getobj(getParmams("shopid",request),getParmams("userid",request),oper);
                        if (v1 ==null)
                        {
                            v1=spUser2shopService.newObj(oper);
                            v1.setIslove(1);
                            v1.setUserId(getParmams("userid",request));
                            v1.setShopId(getParmams("shopid",request));
                            spUser2shopService.addobj(v1,oper);
                        }
                        else
                        {
                            v1.setIslove(1);
                            spUser2shopService.updateobj(v1,oper);
                        }
                        return CommonRet.getSuccess("收藏成功");
                    case "unloveshop":
                        SpUser2shop v3= spUser2shopService.getobj(getParmams("shopid",request),getParmams("userid",request),oper);
                        if (v3 ==null)
                        {
                        }
                        else
                        {
                            v3.setIslove(0);
                            spUser2shopService.updateobj(v3,oper);
                        }
                        return CommonRet.getSuccess("取消收藏成功");
                    case "addgroup":

                        // 铛铛会生成新的groupid，才需要这段逻辑
//                        SpTeam team2=spTeamService.getobj(getParmams("teamid", request),oper);
//                        team2.setGroupId(Integer.parseInt(getParmams("groupid", request)));
//                         spTeamService.updateobj(team2,oper);
//                        ImGroupUser groupUser= imGroupUserService.newObj(oper);
//                        groupUser.setGroupId(team2.getGroupId().toString());
//                        groupUser.setUserId(team2.getStartUserid());
//                        groupUser.setGroupstatus(1);
//                        groupUser.setGroupTitle(team2.getTeamName());
//                        groupUser=imGroupUserService.addobj(groupUser,oper);
//                        return CommonDataRet.getObject(groupUser);
                        //腾讯云不需要，直接把teamid 作为groupid
                        SpTeam team2=spTeamService.getobj(getParmams("teamid", request),oper);
                        ImGroupUser groupUser= imGroupUserService.newObj(oper);
                        groupUser.setGroupId(team2.getTeamId());
                        groupUser.setUserId(team2.getStartUserid());
                        groupUser.setGroupstatus(1);
                        groupUser.setGroupTitle(team2.getTeamName());
                        groupUser=imGroupUserService.addobj(groupUser,oper);
                        return CommonDataRet.getObject(groupUser);

                    case "querygroupuser":
                        return CommonPageRet.getObject(imGroupUserService.queryGroupUsers())   ;
                    case "addteam":
                        /*  铛铛会生成新的groupid，才需要这段逻辑
                        ImGroupUser imGroupUser=  imGroupUserService.getGroupUser(getParmams("userid", request),getParmams("groupid", request),oper);
                        if (imGroupUser==null)
                        {
                            imGroupUser= imGroupUserService.newObj(oper);
                            imGroupUser.setGroupId(getParmams("groupid", request));
                            imGroupUser.setUserId(getParmams("userid", request));
                            imGroupUser.setGroupstatus(0);
                            imGroupUser.setGroupTitle("申请加群");
                            imGroupUser= imGroupUserService.addobj(imGroupUser,oper);
                            TIMserver.addGroupUser(getParmams("teamid", request),getUserid(request));
                        }*/
                        //腾讯云不需要，直接把teamid 作为groupid
                        ImGroupUser imGroupUser=  imGroupUserService.getGroupUser(getParmams("userid", request),getParmams("teamid", request),oper);
                        if (imGroupUser==null)
                        {
                            imGroupUser= imGroupUserService.newObj(oper);
                            imGroupUser.setGroupId(getParmams("teamid", request));
                            imGroupUser.setUserId(getParmams("userid", request));
                            imGroupUser.setGroupstatus(0);
                            imGroupUser.setGroupTitle("申请加群");
                            imGroupUser= imGroupUserService.addobj(imGroupUser,oper);
                            TIMserver.addGroupUser(getParmams("teamid", request),getUserid(request));
                        }
                        return CommonDataRet.getObject(imGroupUser)   ;
                    case "handleaddteam":
                        ImGroupUser imGroupUser1=  imGroupUserService.getGroupUser(getParmams("userid", request),getParmams("groupid", request),oper);
                        if (imGroupUser1!=null)
                        {
                            imGroupUser1.setGroupstatus(1);
                            imGroupUser= imGroupUserService.updateobj(imGroupUser1,oper);
                        }
                        return CommonDataRet.getObject(imGroupUser1)   ;
                    case "fabiao":
                        SpTeamuser spTeamuser= spTeamuserService.getTeamuser(getParmams("teamid", request)
                                ,getParmams("userid", request),oper);
                        if (spTeamuser==null)
                            return CommonRet.getFail("data lost:" + command);
                        spTeamuser.setShopCredits(Integer.parseInt(getParmams("credits", request)));
                        spTeamuser.setShopCreditsDesc(getParmams("creditsdesc", request));
                        spTeamuserService.updateobj(spTeamuser,oper);
                        return CommonRet.getSuccess("save ok");
                    case "getshopcredits":
                        SpTeamuser spTeamuser1= spTeamuserService.getTeamuser(getParmams("teamid", request)
                                ,getParmams("userid", request),oper);
                        if (spTeamuser1==null)
                            return CommonRet.getFail("data lost:" + command);
                        return  CommonDataRet.getObject(spTeamuser1);
                    case "miniprogramUserinfo":
                        return miniprogramUserinfo(request,oper);
                    default:
                        return CommonRet.getFail("请求参数不支持:" + command);
                }
            } else {
                CommonRet commonRet = CommonRet.getFail("请求参数错误");
                //JSONObject object =new JSONObject(ret);
                // String jsonstr = object.toString();
                return commonRet;
            }
        }
        catch (Exception e){
            System.out.println(e);
            e.printStackTrace();
            return CommonRet.getFail(e.getMessage());

        }
    }

}
