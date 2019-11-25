package com.qgbase.app.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.qgbase.app.TIMserver;
import com.qgbase.app.domain.*;
import com.qgbase.biz.huodong.ThuodongQuery;
import com.qgbase.biz.huodong.domain.*;
import com.qgbase.biz.huodong.service.*;
import com.qgbase.biz.info.domain.*;
import com.qgbase.biz.info.service.AppVerService;
import com.qgbase.biz.info.service.TComkeyService;
import com.qgbase.biz.info.service.TDicService;
import com.qgbase.biz.info.service.TPictureService;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.Constants;
import com.qgbase.util.PageControl;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import com.qgbase.util.TWeixinTool;
import com.qgbase.wxpay.sdk.WXPayConstants;
import com.qgbase.wxpay.sdk.WXPayUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
public class ApphuodongController extends BaseController {

    @Autowired
    HdUserService hdUserService;
    @Autowired
    HdShopuserService hdShopuserService;
    @Autowired
    AppVerService appVerService;
    @Autowired
    HdHuodongService hdHuodongService;
    @Autowired
    TPictureService pictureService;
    @Autowired
    HdShopService hdShopService;
    @Autowired
    HdHuodong2userService hdHuodong2userService;
    @Autowired
    ThuodongQuery thuodongQuery;
    @Autowired
    TDicService tDicService;


    public AuthLogin getAuthLogin(TUser user, OperInfo oper, String ver) throws Exception
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
        //authLogin.setUserheadpic(getUserHeadPic(user.getUserId(),oper));
        //authLogin.setImid(TsUserSettingService.getValueBySettingKey(user.getUserId(),"imid",oper));

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
//        Map extend = new HashMap();
//        extend.put("userType",user.getUserType());
//        extend.put("zonecode", "210000");
//        extend.put("zonename", "南京");
//        extend.put("zonelon", "118.834042");
//        extend.put("zonelan", "32.085274");
//        extend.put("zonelevel", "12");
//        user.setExtendInfo(extend);
//        authLogin.data=user.getLoginUser();
        return authLogin;
    }
    public String userReg(String useraccount,String uname,String psww,String userType,String roleid,String faceurl, OperInfo oper)  throws Exception
    {
        TUser userwx = tUserService.zhuce(useraccount, psww , uname,userType,roleid, oper);

        return userwx.getUserId();
    }
    public AuthLogin wxlogin1( String wxid,String uname,String headimgurl,String ver,String deviceseq,String platform,String usertype,String shopid, OperInfo oper) throws Exception{

        String userid="";
        if (usertype.equals("user")) {
            HdUser user = hdUserService.getByWeixinId(wxid, oper);
            if (user == null) {
                userid = userReg(wxid, uname, "*", "user", "user", headimgurl, oper);
                user = hdUserService.newObj(oper);
                user.setUserId(userid);
                user.setUserLevel("0");
                user.setUserName(uname);
                user.setUserWeixinid(wxid);
                user = hdUserService.addobj(user, oper);
            }
            userid = user.getUserId();
        }
        else if (usertype.equals("shop"))
        {
            //if (StringUtil.isEmpty(shopid))
           //     return AuthLogin.getFail("缺少参数：shopid");
            HdShopuser shopuser=hdShopuserService.getByWeixinId(wxid, oper);
            if (shopuser == null) {
                userid = userReg( "shop"+wxid, uname, "*", "shop", "shop", headimgurl, oper);
                shopuser = hdShopuserService.newObj(oper);
                shopuser.setUserId(userid);
                shopuser.setUserName(uname);
                shopuser.setUserWeixinid(wxid);
                shopuser.setShopId(shopid);
                shopuser = hdShopuserService.addobj(shopuser, oper);
            }
            userid = shopuser.getUserId();
        }
        else{
                return AuthLogin.getFail("usertype错误");

        }

        //tPictureService.saveImgOne(userid,"user_head",headimgurl,headimgurl,oper);
        //updateUserHeadPic(userid,headimgurl,headimgurl,oper);
        TUser tuser= tUserService.getobj(userid,oper);
        //saveUserJpushid(user,getParmams("jpushid", request),oper);
        AuthLogin authLogin= getAuthLogin(tuser,oper,ver);
        authLogin.setUserheadpic(headimgurl);
        if (usertype=="shop")
        {
                
        }
        return authLogin;
    }



    public CommonRet wxloginbycode(HttpServletRequest request,OperInfo oper) throws Exception{
        String code=getParmams("code", request);
        TTool.LogInfo("wxloginbycode:"+code);
        String openid="";
        try {
            if (code.equals("testest"))
            {
                openid="shopoFPue5ri3lj9HPCBHxMv9-r8kcr4";
            }
            else
                openid = TWeixinTool.getOpenidByCode(code);
        }
        catch (Exception e)
        {
            return CommonRet.getFail("微信授权失败");
        }
        TTool.LogInfo("openid:"+openid);
        String uname="微信用户";
        String headimgurl=AppAuthController.userHeadPic;
//        try {
//            //如果关注了我们公众号的，可以获取昵称等信息记录
//            String userinfo = TWeixinTool.getWeixinUserInfo(openid);
//        }
//        catch (Exception e)
//        {
//            //return CommonRet.getFail("微信授权失败");
//        }
        String ver=getParmams("ver", request);
        String deviceseq=getParmams("deviceseq", request);
        String platform=getParmams("platform","H5weixin", request);
        String usertype=getParmams("usertype","user", request);
        String shopid=getParmams("shopid","", request);

        AuthLogin authLogin=  wxlogin1(openid,uname,headimgurl,ver,deviceseq,platform,usertype,shopid,oper);
        if (usertype.equals("user")) {
            HdHuodong hdHuodong = hdHuodongService.getobj(getParmams("huodongid", request), oper);

            if (hdHuodong == null) {
                System.out.println("活动找不到" + getParmams("huodongid", request));
                return CommonRet.getFail("活动已经结束");
            }
            authLogin.setMoudle(hdHuodong.getHuodongModule());
        }
        else if (usertype.equals("shop"))
        {
            HdShopuser hdShopuser =hdShopuserService.getobj(authLogin.userid,oper);
            if (hdShopuser==null)
                return AuthLogin.getFail("hdShopuser丢失");
            else
                authLogin.isactive =hdShopuser.getIsActive().toString();

        }
        TTool.LogInfo("wxloginbycode完成:"+openid);
        return authLogin;


    }


    public  CommonRet gethuodonguser(HttpServletRequest request,OperInfo oper) throws Exception{
        String userid=getParmams("userid",request);
        if (StringUtil.isEmpty(userid))
            return CommonRet.getFail("参数错误:userid");
        String huodongid=getParmams("huodongid",request);
        if (StringUtil.isEmpty(huodongid))
            return CommonRet.getFail("参数错误:缺少huodongid");
        String shopid=getParmams("shopid",request);
        if (StringUtil.isEmpty(shopid))
            return CommonRet.getFail("参数错误:shopid");
        Map<String, String> values=new HashMap<String, String>();
        HdHuodong hdHuodong=hdHuodongService.getobj(huodongid,oper);
        if (hdHuodong==null)
            return CommonRet.getFail("活动已经结束或取消");
        values.put("HuodongName",hdHuodong.getHuodongName());
        values.put("HuodongTitle",hdHuodong.getHuodongTitle());
        values.put("HuodongSubtitle",hdHuodong.getHuodongSubtitle());
        values.put("HuodongStatus",hdHuodong.getHuodongStatus());
        //values.put("",hdHuodong.getEndTime());
        //values.put("",hdHuodong.setEndTime());
        String picurls="";
        List<TPicture> pictures= pictureService.getImgList(huodongid,"huodong_hb");
        for (TPicture picture:pictures
             ) {
            picurls+=picture.getPictureUrl()+",";
        }
        values.put("HuodongHb",picurls);

        HdShop hdShop=hdShopService.getobj(shopid,oper);
        if (hdShop==null)
            return CommonRet.getFail("门店未参与活动");
        if (!hdShop.getShopStatus().equals("1"))
            return CommonRet.getFail("门店不参与活动");

        HdHuodong2user hdHuodong2user= hdHuodong2userService.getHuodong(huodongid,shopid,userid,oper);
        if (hdHuodong2user==null)
            values.put("PayStatus","0");
        else{
            values.put("PayStatus",hdHuodong2user.getPayStatus());
            values.put("UserCar",hdHuodong2user.getUserCar());
            values.put("UserCartype",hdHuodong2user.getUserCartype());
            values.put("UserPhone",hdHuodong2user.getUserPhone());
            values.put("PayOrder",hdHuodong2user.getPayOrder());
            values.put("UserName",hdHuodong2user.getUserName());
            values.put("UserSFZ",hdHuodong2user.getUserSfz());

        }

        values.put("ShopAddress",hdShop.getShopAddress());
        values.put("ShopFullname",hdShop.getShopFullname());
        values.put("ShopName",hdShop.getShopName());
        values.put("ShopTel",hdShop.getShopTel());
        values.put("ShopLat",hdShop.getShopLat());
        values.put("ShopLon",hdShop.getShopLon());
        return CommonObjectRet.getObject(values);


    }
    public  CommonRet miniprogramLogin(HttpServletRequest request,OperInfo oper) throws Exception{
        //https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
        //小程序登录
        String code=getParmams("code",request);
        TTool.LogInfo("miniprogramLogin:"+code);
        String s=  TIMserver.httpConn("https://api.weixin.qq.com/sns/jscode2session",
                "appid=wxabb0573802dffb51&secret=1100b6bdc8d9ee7232439c13bc8396d2&js_code="
                        +code+"&grant_type=authorization_code");
        JSONObject json= JSON.parseObject(s);
        String uname="微信用户";
        String headimgurl=AppAuthController.userHeadPic;

        if ("1".equals(json.getString("errcode")) )
        {
            return CommonRet.getFail(s);
        }
        String unionid=json.getString("unionid");
        String openid=json.getString("openid");
        String session_key=json.getString("session_key");
        TTool.LogInfo("miniprogramLogin openid:"+openid);

        String ver=getParmams("ver","", request);
        String deviceseq=getParmams("deviceseq","", request);
        String platform=getParmams("platform","miniprogram", request);
        String usertype="shop";
        String shopid=getParmams("shopid","", request);

        AuthLogin authLogin=  wxlogin1(openid,uname,headimgurl,ver,deviceseq,platform,usertype,shopid,oper);

            HdShopuser hdShopuser =hdShopuserService.getobj(authLogin.userid,oper);
            if (hdShopuser==null)
                return AuthLogin.getFail("hdShopuser丢失");
            else
                authLogin.isactive =hdShopuser.getIsActive().toString();

        authLogin.setOpenid(openid);
        authLogin.setUnionId(unionid);
        authLogin.setSession_key(session_key);
        TTool.LogInfo("wxloginbycode完成:"+openid);
        if (StringUtil.isEmpty(hdShopuser.getShopId()))
            authLogin.setShopid("0");
        else
            authLogin.setShopid(hdShopuser.getShopId());
        return authLogin;

    }
    public  CommonRet getpayorder(HttpServletRequest request,OperInfo oper) throws Exception{
        String userid=getParmams("userid",request);
        if (StringUtil.isEmpty(userid))
            return CommonRet.getFail("参数错误:userid");
        String payorder=getParmams("payorder",request);
        if (StringUtil.isEmpty(payorder))
            return CommonRet.getFail("参数错误:payorder");
        HdHuodong2user hdHuodong2user= hdHuodong2userService.getHuodongByorder(payorder,oper);
        if (hdHuodong2user ==null)
            return CommonRet.getFail("订单错误，请联系管理员");
        return CommonDataRet.getObject(hdHuodong2user);

    }
    public  CommonRet hxpayorder(HttpServletRequest request,OperInfo oper) throws Exception{
        String userid=getParmams("userid",request);
        if (StringUtil.isEmpty(userid))
            return CommonRet.getFail("参数错误:userid");
        String payorder=getParmams("payorder",request);
        if (StringUtil.isEmpty(payorder))
            return CommonRet.getFail("参数错误:payorder");
        HdShopuser hdShopuser =hdShopuserService.getobj(userid,oper);
        if (hdShopuser==null)
            return CommonRet.getFail("请向管理员申请，店铺绑定");
        if (hdShopuser.getIsActive()==0)
            return CommonRet.getFail("请向管理员申请激活");

        HdHuodong2user hdHuodong2user= hdHuodong2userService.getHuodongByorder(payorder,oper);
        if (hdHuodong2user ==null)
            return CommonRet.getFail("订单错误，请联系管理员");
        if (!hdHuodong2user.getShopId().equals(hdShopuser.getShopId())) {
            TTool.LogInfo("核销错误:"+hdHuodong2user.getShopId()+","+hdShopuser.getShopId());
            return CommonRet.getFail("核销错误，请咨询管理员");
        }

        if (hdHuodong2user.getPayStatus().equals("1"))
        {
            hdHuodong2user.setHxTime(new Date());
            hdHuodong2user.setHxUser(userid);
            hdHuodong2user.setPayStatus("3");
            hdHuodong2user =hdHuodong2userService.updateobj(hdHuodong2user,oper);
        }
        else if (hdHuodong2user.getPayStatus().equals("3")){
            return CommonRet.getFail("订单已核销");
        }
        else    return CommonRet.getFail("订单未支付");

        return CommonDataRet.getObject(hdHuodong2user);
    }
    public  CommonRet queryorder(HttpServletRequest request,OperInfo oper) throws Exception{
        String userid=getParmams("userid",request);
        if (StringUtil.isEmpty(userid))
            return CommonRet.getFail("参数错误:userid");
        String huodongid=getParmams("huodongid",request);
        if (StringUtil.isEmpty(huodongid))
            return CommonRet.getFail("参数错误:缺少huodongid");
        String shopid=getParmams("shopid",request);
        if (StringUtil.isEmpty(shopid))
            return CommonRet.getFail("参数错误:shopid");
        Map<String,String> params=new HashMap<String, String>();
        params.put("huodong_id",huodongid);
        params.put("shop_id",shopid);
        params.put("page",getParmams("page","1",request));
        params.put("len",getParmams("len","20",request));
        params.put("columnProp","pay_time");
        params.put("columnOrder","desc    ");
        PageControl pageControl= thuodongQuery.queryHdHuodong2userList(params,oper);

        return CommonPageRet.getObject(pageControl);

    }

    public CommonRet wxshare(HttpServletRequest request,OperInfo oper) throws Exception{
        String url=getParmams("url",request).replace("_","&");
        if (StringUtil.isEmpty(url))
            return CommonRet.getFail("参数错误:url");
        String jsaptoken="";
        TDic comkey= tDicService.getobj("system_jsaptoken",oper);
        if (TTool.getTimeDelta(comkey.getModifyDate(),new Date()) <7000 )
        {
            jsaptoken= comkey.getDicValue();
        }
        else
        {
            String accesskey="";
            TDic comkey1= tDicService.getobj("system_access_token",oper);
            if (TTool.getTimeDelta(comkey1.getModifyDate(),new Date()) <7000 )
            {
                accesskey= comkey1.getDicValue();
            }
            else
            {
                accesskey=TWeixinTool.getWeixinToken();
                comkey1.setDicValue(accesskey);
                tDicService.updateobj(comkey1,oper);

            }
            jsaptoken=TWeixinTool.getJsapi_ticket(accesskey);
            comkey.setDicValue(jsaptoken);
            tDicService.updateobj(comkey,oper);

        }


        Map<String, String> data = new HashMap<String, String>();

        String nonceStr = WXPayUtil.generateNonceStr();

        String timeStamp = Long.toString((long) ((new Date().getTime())*0.001));
        Map params = new TreeMap();
        params.put("url", url);
        params.put("timestamp", timeStamp);
        params.put("noncestr", nonceStr);
        params.put("jsapi_ticket", jsaptoken);
        //params.put("paySign", WXPayUtil.generateSignature(params, config.getKey(), WXPayConstants.SignType.HMACSHA256));
       //;
        Map params1 = new TreeMap();
        params1.put("url", url);
        params1.put("timestamp", timeStamp);
        params1.put("noncestr", nonceStr);
        params1.put("signature",  WXPayUtil.generateSHA(params));
        //params1.put("jsapi_ticket", jsaptoken);
        return CommonObjectRet.getObject(params1);

    }
    @RequestMapping(value = "/app/huodong")
    public CommonRet index() throws Exception{
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        HttpServletResponse response = servletRequestAttributes.getResponse();
        //TTool.LogInfo(request.getQueryString());
        String command = request.getParameter("command");
        //System.out.println(command);
        long startTime = System.currentTimeMillis();
        try {
            OperInfo oper = getOper(request);// OperInfo.createVirtualUser();
            if (oper == null && !command.equals("CommonJust"))
                return CommonRet.getFail("请重新登录");
            if (StringUtil.isNotBlank(command)) {
                switch (command) {
                    case "CommonJust":
                        CommonJust ret = new CommonJust();
                        return ret;
                    case "wxloginbycode":
                        return wxloginbycode(request,oper);
                    case "wxshare":
                        return wxshare(request,oper);
                    case "miniprogramLogin":
                        //http://127.0.0.1:12001/app/auth?command=miniprogramLogin&code=
                        return miniprogramLogin(request,oper);
                    case "gethuodonguser":
                        return gethuodonguser(request,oper);
                    case "getpayorder":
                        return getpayorder(request,oper);
                    case "hxpayorder":
                        return hxpayorder(request,oper);
                    case "queryorder":
                        return queryorder(request,oper);
                }
            }
            CommonRet commonRet = CommonRet.getFail("请求参数错误");
            //JSONObject object =new JSONObject(ret);
            // String jsonstr = object.toString();
            return commonRet;
        }
        catch (Exception e){
            System.out.println(e);
            e.printStackTrace();
            return CommonRet.getFail(e.getMessage());

        }
        finally {
            long endTime = System.currentTimeMillis();    //获取结束时间
            TTool.LogInfo(request.getQueryString()+",运行时间：" + (endTime - startTime) + "ms");    //输出程序运行时间
        }

    }
}
