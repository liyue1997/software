package com.qgbase.app.controller;

import cn.hutool.core.date.DateTime;
import com.qgbase.app.dao.TAppQuery;
import com.qgbase.app.domain.CommonJust;
import com.qgbase.app.domain.CommonObjectRet;
import com.qgbase.app.domain.CommonRet;
import com.qgbase.app.domain.AuthLogin;
import com.qgbase.biz.info.domain.TPicture;
import com.qgbase.biz.info.domain.TYzm;
import com.qgbase.biz.info.service.TPictureService;
import com.qgbase.biz.info.service.TYzmService;
import com.qgbase.biz.info.service.TsUserService;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.biz.user.service.TUserService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.Constants;
import com.qgbase.util.StringUtil;
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
import java.util.List;
import java.util.Map;

/**
 * 手机端接口
 *
 * @author mark
 * @date 2019-08-02
 */
@RestController
public class AppAuthController {

    @Autowired
    TUserService tUserService;
    @Autowired
    TYzmService tYzmService;
    @Autowired
    TAppQuery tAppQuery;
    @Autowired
    TsUserService TsUserService;
    @Autowired
    TPictureService tPictureService;

    public String getParmams(String key,HttpServletRequest request)
    {
         String value=  request.getParameter(key);
         return value;
    }

    public OperInfo getOper(HttpServletRequest request) throws Exception {
        OperInfo oper=OperInfo.createVirtualUser();
        if (StringUtil.isNotBlank(request.getParameter("userid")) )
        {
            oper.setCurrentUser(tUserService.getobj(request.getParameter("userid"),oper));
            if (oper.getCurrentUser()==null)
                return null;

        }
        oper.lastTime=DateTime.now();
        oper.lastIp= TToolRequest.getClientIp(request);
        oper.lastOs="App"+TToolRequest.getOsInfo(request.getHeader("user-agent"));
        return oper;

    }

    @RequestMapping(value = "/app/auth")
    public CommonRet index() throws Exception {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        HttpServletResponse response = servletRequestAttributes.getResponse();
        System.out.println(request.getQueryString());
        String command = request.getParameter("command");
        System.out.println(command);
        try {
            OperInfo oper=getOper(request);// OperInfo.createVirtualUser();
            if (oper==null && command !="CommonJust")
                return CommonRet.getFail("请重新登录");
            if (StringUtil.isNotBlank(command)) {
                switch (command) {
                    case "CommonJust":
                        CommonJust ret = new CommonJust();
                        return ret;
                    case "login":
                        TUser user = tUserService.login(getParmams("useraccount", request), getParmams("password", request), oper);
                        boolean flag = user != null;
                        if (flag) {
                            AuthLogin authLogin = new AuthLogin();
                            authLogin.setUserid(user.getUserId());
                            authLogin.setUseraccount(user.getUserAccount());
                            authLogin.setUsername(user.getUsername());
                            authLogin.setUsertype(user.getUserType());
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
                            return authLogin;
                        } else {
                            return CommonRet.getFail("用户名或密码错误");
                        }
                    case "yzm":
                        TUser user1= tUserService.getUserByUserAccount(getParmams("useraccount", request));
                        if (user1 !=null)
                            return CommonRet.getFail("手机号已经注册");
                        TYzm yzm = tYzmService.createYzm(getParmams("useraccount", request), oper);
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
                            TUser user3 = tUserService.zhuce(getParmams("useraccount", request), getParmams("password", request)
                                    , getParmams("username", request),"user","user", oper);
                            return CommonRet.getSuccess("");
                        }
                        else
                            return CommonRet.getFail(result1);
                    case "getuser":
                        Map user4 = tAppQuery.getSqlMap("select user_id,user_account,username,last_ip,last_os,last_time FROM ts_user o where o.user_id = ?", getParmams("userid", request));
                        if (user4==null)
                            return CommonRet.getFail("用户也被注销"+getParmams("userid", request));
                        else {
                            List pics = tPictureService.getPicturesByObjectid("user_head", getParmams("userid", request), oper);
                            if (pics.size()==0)
                                user4.put("t_picture","");
                            else
                                user4.put("t_picture",((TPicture)pics.get(0)).getPictureUrl());

                            return CommonObjectRet.getObject(user4);
                        }
                    case "saveuser":

                        TUser user5= tUserService.getobj(getParmams("userid", request),oper);
                        user5.setUsername(getParmams("username", request));
                        tUserService.updateobj(user5,oper);
                        tPictureService.delPicturesByObjectid("user_head", getParmams("userid", request), oper);
                        TPicture pic= tPictureService.newObj(oper);
                        pic.setObjectId(getParmams("userid", request));
                        String picurl=getParmams("pictureurl", request);
                        pic.setFileType(picurl.substring(picurl.lastIndexOf(".")+1));
                        pic.setPictureSurl(getParmams("picturesurl", request));
                        pic.setPictureUrl(picurl);
                        pic.setPictureType("user_head");
                        tPictureService.addobj(pic,oper);
                        return CommonRet.getSuccess("");
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
