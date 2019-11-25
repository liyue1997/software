package com.qgbase.app.controller;

import cn.hutool.core.date.DateTime;
import com.qgbase.app.TIMserver;
import com.qgbase.biz.info.domain.TPicture;
import com.qgbase.biz.info.service.TPictureService;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.biz.user.service.TUserService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TToolRequest;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

public class BaseController {

    @Autowired
    TUserService tUserService;
    @Autowired
    TPictureService tPictureService;

    public String getParmams(String key, HttpServletRequest request)
    {
        String value=  request.getParameter(key);
        return value;
    }


    public String getUserid(HttpServletRequest request)
    {
        String value=  request.getParameter("userid");
        return value;
    }
    public OperInfo getOper(HttpServletRequest request) throws Exception {
        OperInfo oper=OperInfo.createVirtualUser();
        String userid=getUserid(request);
        if (StringUtil.isNotBlank(userid) )
        {
            oper.setCurrentUser(tUserService.getobj(userid,oper));
            if (oper.getCurrentUser()==null)
                return null;

        }
        oper.lastTime= DateTime.now();
        oper.lastIp= TToolRequest.getClientIp(request);
        oper.lastOs="App"+TToolRequest.getOsInfo(request.getHeader("user-agent"));
        return oper;

    }

    public TPicture updateUserHeadPic(String userID, String picurl, String picSurl, OperInfo oper)throws Exception
    {
        TPicture pic1=tPictureService.saveImgOne(userID
                ,"user_head",picurl ,picSurl,oper);
        TUser user= tUserService.getobj(userID,oper);
        TIMserver.addUser(userID,user.getUsername(),picSurl);

        return pic1;
    }
}
