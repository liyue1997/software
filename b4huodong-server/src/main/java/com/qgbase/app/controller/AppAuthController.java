package com.qgbase.app.controller;

import cn.hutool.core.date.DateTime;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.qgbase.app.AppTool;
import com.qgbase.app.TIMserver;
import com.qgbase.app.dao.TAppQuery;
import com.qgbase.app.domain.*;
import com.qgbase.biz.info.domain.*;
import com.qgbase.biz.info.service.*;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.biz.user.service.TUserService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.Constants;
import com.qgbase.util.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 手机端接口
 *
 * @author mark
 * @date 2019-08-02
 */
@RestController
public class AppAuthController extends BaseController {

    @Autowired
    TYzmService tYzmService;
    @Autowired
    TAppQuery tAppQuery;
    @Autowired
    TsUserService TsUserService;;
    @Autowired
    TsUserSettingService TsUserSettingService;

    @Autowired
    AppVerService appVerService;

    public static final String userHeadPic = "https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/TsUser/209f9ea5-f1bd-4060-8c22-442b2a9a73ff.jpg";

    public String getUserHeadPic(String userID,OperInfo oper)
    {
        List pics = tPictureService.getPicturesByObjectid("user_head", userID, oper);
        if (pics.size()==0)
            return userHeadPic;
        else
            return ((TPicture)pics.get(0)).getPictureUrl();
    }
    public void saveUserJpushid(TUser user,String jpushid,OperInfo oper)throws Exception
    {
        if (StringUtil.isEmpty(jpushid))
            return;
        if ("undefined".equals(jpushid))
            return;
        TsUserSetting value= TsUserSettingService.getBySettingKey(user.getUserId()
                ,"jpushid",oper);
        if (value==null)
        {
            value=TsUserSettingService.newObj(oper);
            value.setSettingKey("jpushid");
            value.setSettingValue(jpushid);
            value.setUserId(user.getUserId());
            TsUserSettingService.addobj(value,oper);
        }
        else
        {
            value.setSettingKey("jpushid");
            TsUserSettingService.updateobj(value,oper);
        }
    }

    public String userReg(String useraccount,String uname,String psww,String userType,String roleid,String faceurl, OperInfo oper)  throws Exception
    {
        TUser userwx = tUserService.zhuce(useraccount, psww , uname,userType,roleid, oper);
        TIMserver.addUser(useraccount,uname,faceurl);
        return userwx.getUserId();
    }
    public AuthLogin getAuthLogin(TUser user,OperInfo oper,String ver) throws Exception
    {
        AuthLogin authLogin = new AuthLogin();
        authLogin.setUserid(user.getUserId());
        authLogin.setImuid(user.getUserId());
        authLogin.setUseraccount(user.getUserAccount());
        authLogin.setUsername(user.getUsername());
        authLogin.setUsertype(user.getUserType());

        authLogin.setPhone(user.getUserAccount());//暂时取用户账户，后面要考虑微信用户的情况
//        TPicture head=tPictureService.getImgOne(user.getUserId(),"user_head");
//        if (head==null)
//            authLogin.setUserheadpic(userHeadPic);
//        else
//            authLogin.setUserheadpic(head.getPictureSurl());
        authLogin.setUserheadpic(getUserHeadPic(user.getUserId(),oper));
        //authLogin.setImid(TsUserSettingService.getValueBySettingKey(user.getUserId(),"imid",oper));

        String jwt = Jwts.builder()
                .setSubject(user.getUserAccount())
                .claim("uid","c7434e88e2404690b6c5674329dd408aT1527474113957")
                // 有效期设置
                .setExpiration(new Date(System.currentTimeMillis() + Constants.EXPIRATIONTIME))
                // 签名设置
                .signWith(SignatureAlgorithm.HS512, Constants.SECRET)
                .compact();
        System.out.println(jwt);
        authLogin.setToken(jwt);
        //根据ver 去获取 版本配置信息，如果没有取到就取 版本为0的配置信息
        AppVer appVer= appVerService.getbyVer(ver,user.getUserType());
        authLogin.setDemolink(appVer.getDemolink());
        authLogin.setDownloadlink(appVer.getDownloadlink());
        authLogin.setT_ver(appVer.getTVer());
        authLogin.setInfoBeforePaid(appVer.getInfoBeforePaid());
        authLogin.setInfoBeforeUse(appVer.getInfoBeforeUse());
        authLogin.setStrPrice(appVer.getStrPrice());
        authLogin.setLawlink(appVer.getLawlink());
        authLogin.setPaid(appVer.getPaid());
        authLogin.setIszfbpay(String.valueOf(appVer.getIszfbpay()));
        authLogin.setIsweixinpay(String.valueOf(appVer.getIsWeixinpay()));
        authLogin.setIsweixinwappay(String.valueOf(appVer.getIsweixinwappay()));

        return authLogin;
    }
    public CommonRet login(HttpServletRequest request,OperInfo oper) throws Exception
    {
        TUser user = tUserService.login(getParmams("useraccount", request), getParmams("password", request), oper);
        boolean flag = user != null;
        if (flag) {
            saveUserJpushid(user,getParmams("jpushid", request),oper);
            return getAuthLogin(user,oper,getParmams("ver", request));
        } else {
            return CommonRet.getFail("用户名或密码错误");
        }
    }

    public CommonRet wxlogin1( String wxid,String uname,String headimgurl,String ver,String deviceseq,String platform,OperInfo oper) throws Exception{

        TsUserSetting wxin= TsUserSettingService.findBySettingKeyOne("wxid",wxid,oper);
        String userid="";

        if (wxin==null)
        {
            userid=userReg(wxid,uname,"*","user","user",headimgurl,  oper);
            TsUserSetting wxin1=TsUserSettingService.newObj(oper);
            wxin1.setSettingKey("wxid");
            wxin1.setSettingValue(wxid);
            wxin1.setUserId(userid);
            wxin=TsUserSettingService.addobj(wxin1,oper);
        }
        userid =TsUserService.getobj(wxin.getUserId(),oper).getUserId();

        //tPictureService.saveImgOne(userid,"user_head",headimgurl,headimgurl,oper);
        updateUserHeadPic(userid,headimgurl,headimgurl,oper);
        TUser user= tUserService.getobj(userid,oper);
        //saveUserJpushid(user,getParmams("jpushid", request),oper);
        return getAuthLogin(user,oper,ver);
    }


    public CommonRet wxlogin(HttpServletRequest request,OperInfo oper) throws Exception
    {
        String uname=getParmams("uname", request);
        String headimgurl=getParmams("headimgurl", request);
        String wxid=getParmams("wxid", request);
        String ver=getParmams("ver", request);
        String deviceseq=getParmams("deviceseq", request);
        String platform=getParmams("platform", request);
        return    wxlogin1(wxid,uname,headimgurl,ver,deviceseq,platform,oper);

    }

    public CommonRet wxloginbycode(HttpServletRequest request,OperInfo oper) throws Exception{
        String openid="";
        try {
            openid = TWeixinTool.getOpenidByCode(getParmams("code", request));
        }
        catch (Exception e)
        {
            return CommonRet.getFail("微信授权失败");
        }
        String uname="";
        String headimgurl=userHeadPic;
        try {
            //如果关注了我们公众号的，可以获取昵称等信息记录
            String userinfo = TWeixinTool.getWeixinUserInfo(openid);
        }
        catch (Exception e)
        {
            //return CommonRet.getFail("微信授权失败");
        }
        String ver=getParmams("ver", request);
        String deviceseq=getParmams("deviceseq", request);
        String platform=getParmams("platform", request);
        return  wxlogin1(openid,uname,headimgurl,ver,deviceseq,platform,oper);


    }
    public  CommonRet miniprogramLogin(HttpServletRequest request,OperInfo oper) throws Exception{
        //https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
        //小程序登录
        String s=  TIMserver.httpConn("https://api.weixin.qq.com/sns/jscode2session",
                "appid=wxedd02aae2c2e8d3c&secret=08797ece95cb75855fbe25f336d2fa11&js_code="
                +getParmams("code",request)+"&grant_type=authorization_code");
        JSONObject json= JSON.parseObject(s);
        
        if ("1".equals(json.getString("errcode")) )
        {
            return CommonRet.getFail(s);
        }
        String unionid=json.getString("unionid");
        String openid=json.getString("openid");
        String session_key=json.getString("session_key");
        TsUserSetting wxin= TsUserSettingService.findBySettingKeyOne("openid",openid,oper);
        String userid="";

        if (wxin==null)
        {
            userid=userReg(openid,"微信小程序用户","*","shop","shop",userHeadPic,  oper);
            TsUserSetting wxin1=TsUserSettingService.newObj(oper);
            wxin1.setSettingKey("openid");
            wxin1.setSettingValue(openid);
            wxin1.setUserId(userid);
            TsUserSettingService.addobj(wxin1,oper);
        }
        userid =TsUserService.getobj(wxin.getUserId(),oper).getUserId();

        TUser user= tUserService.getobj(userid,oper);
        //TUser user = tUserService.getobj("r201909120043",oper);
        AuthLogin result= getAuthLogin(user,oper,"");
        result.setOpenid(openid);
        result.setUnionId(unionid);
        result.setSession_key(session_key);
        TsUserSetting userSetting=  TsUserSettingService.getBySettingKey(userid,"shopid",oper);
        if (userSetting==null)
            result.setShopid("0");
        else
            result.setShopid(userSetting.getSettingValue());


        return result;
    }


    public CommonRet updateUserinfo(HttpServletRequest request,OperInfo oper) throws Exception
    {
        TUser user = tUserService.getobj(getParmams("userid", request),oper);
        user.setUsername(getParmams("username", request));
        //
        tUserService.updateobj(user,oper);
        //
        String pic=getUserHeadPic(getParmams("userid", request),oper);
        TIMserver.addUser(getParmams("userid", request),getParmams("username", request),pic);
        return CommonRet.getSuccess("保存成功");
    }
    @RequestMapping(value = "/app/auth")
    public CommonRet index() throws Exception {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        HttpServletResponse response = servletRequestAttributes.getResponse();
        //System.out.println(request.getQueryString());
        String command = request.getParameter("command");
        //System.out.println(command);

        long startTime = System.currentTimeMillis();
        try {
            OperInfo oper=getOper(request);// OperInfo.createVirtualUser();
            if (oper==null && !command.equals("CommonJust") )
                return CommonRet.getFail("请重新登录");
            if (StringUtil.isNotBlank(command)) {
                switch (command) {
                    case "CommonJust":
                        CommonJust ret = new CommonJust();
                        return ret;
                    case "login":
                        return login(request,oper);
                    case "yzm":
                        TUser user1= tUserService.getUserByUserAccount(getParmams("useraccount", request));
                        if (user1 !=null)
                            return CommonRet.getFail("手机号已经注册");
                        TYzm yzm = tYzmService.createYzm(getParmams("useraccount", request), oper);
                        AppTool.SendSms(getParmams("useraccount", request),yzm.getYzm());
                        return CommonRet.getSuccess("");
                    case "yzmcheck":
                        String result = tYzmService.checkYzm(getParmams("useraccount", request),getParmams("yzm", request), oper);
                        if ("".equals(result))
                            return CommonRet.getSuccess("");
                        else
                            return CommonRet.getFail(result);
                    case "zhuce":
                        String result1 = tYzmService.checkYzm(getParmams("useraccount", request),getParmams("yzm", request), oper);
                        if ("".equals(result1)) {
                            TUser user2 = tUserService.getUserByUserAccount(getParmams("useraccount", request));
                            if (user2 != null)
                                return CommonRet.getFail("手机号已经注册");
                            userReg(getParmams("useraccount", request), getParmams("username", request)
                                    , getParmams("password", request)
                                    ,"user","user",userHeadPic
                                    , oper);
                            //TUser user3 = tUserService.zhuce(getParmams("useraccount", request), getParmams("password", request)
                            //        , getParmams("username", request),"user","user", oper);
                            return CommonRet.getSuccess("");
                        }
                        else
                            return CommonRet.getFail(result1);
                    case "forgetpwd":
                        String result2 = tYzmService.checkYzm(getParmams("useraccount", request)
                                ,getParmams("yzm", request), oper);
                        if ("".equals(result2)) {
                            TUser user2 = tUserService.getUserByUserAccount(getParmams("useraccount", request));
                            if (user2 == null)
                                return CommonRet.getFail("账户不存在");
                            tUserService.forgetpwd(getParmams("useraccount", request)
                                    , getParmams("password", request), oper);
                            return CommonRet.getSuccess("密码已经重置");
                        }
                        else
                            return CommonRet.getFail(result2);
                    case "yzm2":
                        TUser user7= tUserService.getUserByUserAccount(getParmams("useraccount", request));
                        if (user7 ==null)
                            return CommonRet.getFail("手机号不存在");
                        TYzm yzm4 = tYzmService.createYzm(getParmams("useraccount", request), oper);
                        AppTool.SendSms(getParmams("useraccount", request),yzm4.getYzm());
                        return CommonRet.getSuccess("验证码已发送");
                    case "wxlogin":
                        return wxlogin(request,oper);
                    case "wxloginbycode":
                        return wxloginbycode(request,oper);

                    case "getuser":
                        Map user4 = tAppQuery.getSqlMap("select user_id,user_account,username,last_ip,last_os,last_time FROM ts_user o where o.user_id = ?", getParmams("userid", request));
                        if (user4==null)
                            return CommonRet.getFail("用户已经被注销"+getParmams("userid", request));
                        else {

                            user4.put("t_picture",getUserHeadPic(getParmams("userid", request),oper));

                            return CommonObjectRet.getObject(user4);
                        }
                    case "updateUserinfo":
                        return updateUserinfo(request,oper);
                    case "uploadfileone":
                        TPicture pic1=updateUserHeadPic(getParmams("userid", request)
                               ,getParmams("url", request)
                                ,getParmams("surl", request),oper);
                        return CommonDataRet.getObject(pic1);
                        /*  铛铛IM 才需要
                    case "imgetusers":
                        List user8 = tAppQuery.getSqlList("select u.user_account as useraccount,u.username,\n" +
                                "(select us.setting_value from ts_user_setting us where us.user_id=u.user_id and us.setting_key='imid') as t_imid\n" +
                                ",u.user_id as t_imuid from ts_user u;", null);

                        return CommonPageRet.getObject(user8);
                    case "imgetuseronly":
                        Map user9 = tAppQuery.getSqlMap("select u.user_id as sPersonID,u.user_account as sCode,u.username as sName,u.user_account as sChineseFirstPY\n" +
                                ",(select us.setting_value from ts_user_setting us where us.user_id=u.user_id and us.setting_key='imid') as sNumb\n" +
                                ",u.user_id as t_imuid from ts_user u where user_id =?;", getParmams("imuid", request));
                        if (user9==null)
                            return CommonRet.getFail("用户已被注销"+getParmams("userid", request));
                        else {
                            List pics = tPictureService.getPicturesByObjectid("user_head", getParmams("userid", request), oper);
                            if (pics.size()==0)
                                user9.put("t_picture","");
                            else
                                user9.put("t_picture",((TPicture)pics.get(0)).getPictureUrl());

                            return CommonObjectRet.getObject(user9);
                        }
                    case "updateimid":
                        TsUserSetting imidset= TsUserSettingService.saveSettingOne( getParmams("userid", request),"imid"
                                , getParmams("imid", request),"",oper);
                        return CommonDataRet.getObject(imidset);

                         */
                    case "pushall":
                        //http://127.0.0.1:12001/app/auth?command=pushall&msg=%E6%B5%8B%E8%AF%9509111036
                        AppTool.pushAll(getParmams("msg", request));
                        return CommonRet.getSuccess("已经发送");
                    case "pushuser":
                        //http://127.0.0.1:12001/app/auth?command=pushuser&msg=%E6%B5%8B%E8%AF%95201909111411&touserid=r201909110033
                        //有问题
                         AppTool.pushbyAlias(getParmams("touserid", request),getParmams("msg", request));
                        return CommonRet.getSuccess("已经发送");
                    case "pushuserbyid":
                        //http://127.0.0.1:12001/app/auth?command=pushall&msg=%E6%B5%8B%E8%AF%9509111036
                        AppTool.pushbyID(getParmams("jpushid", request),getParmams("msg", request));
                        return CommonRet.getSuccess("已经发送");

                    case "timsign":
                        return CommonRet.getSuccess(TIMserver.getUsersign(getUserid(request)));

                    case "miniprogramLogin":
                        //http://127.0.0.1:12001/app/auth?command=miniprogramLogin&code=
                        return miniprogramLogin(request,oper);

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
            //System.out.println(e);
            //e.printStackTrace();
            TTool.LogErr(e);
            return CommonRet.getFail(e.getMessage());

        }
        finally {
            long endTime = System.currentTimeMillis();    //获取结束时间
            TTool.LogInfo(request.getQueryString()+",运行时间：" + (endTime - startTime) + "ms");    //输出程序运行时间
        }
    }


}
