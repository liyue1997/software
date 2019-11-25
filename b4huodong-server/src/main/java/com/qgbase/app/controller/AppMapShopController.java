package com.qgbase.app.controller;

import cn.hutool.core.date.DateTime;
import com.qgbase.app.TIMserver;
import com.qgbase.app.dao.TAppQuery;
import com.qgbase.app.domain.*;
import com.qgbase.biz.info.domain.*;
import com.qgbase.biz.info.service.*;
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
    ImGroupUserService imGroupUserService;

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

//        SpShop shop= spShopService.newObj(oper);
//        shop.setShopName(shopname);
//        shop.setShopFullname(shopname);
//        shop.setShopPhone(phone);
//        shop=spShopService.addobj(shop,oper);

//        TsUserSetting wxin1=tsUserSettingService.newObj(oper);
//        wxin1.setSettingKey("shopid");
//        wxin1.setSettingValue(shop.getShopId());
//        wxin1.setUserId(userid);
//        tsUserSettingService.addobj(wxin1,oper);

        updateUserHeadPic(userid,picture,picture,oper);

//        return CommonDataRet.getObject(shop);
        return null;  //根据自己得业务实现
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

                    case "querygroupuser":
                        return CommonPageRet.getObject(imGroupUserService.queryGroupUsers())   ;
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
