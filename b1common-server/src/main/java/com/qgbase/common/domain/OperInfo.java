package com.qgbase.common.domain;

import com.qgbase.biz.user.domain.TUser;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.http.HttpServlet;
import java.util.Date;

/**
 * Created by lbb on 2018/4/24.
 * 主要用于：操作用户
 */
public class OperInfo {

    private TUser currentUser;
    public String token;

    public  String subwareCode;

    public String clientUid;
    public Date lastTime;//create by lbb 最后访问时间

    public String lastOs;//create by lbb 最后登陆操作系统

    public String lastIp;//create by lbb 最后登陆IP

    public TUser getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(TUser currentUser) {
        this.currentUser = currentUser;
    }

    public static OperInfo createVirtualUser()
    {
        OperInfo operInfo = new OperInfo();
        TUser tUser = new TUser();
        tUser.setUserId("Guest");
        tUser.setUsername("Guest");
        operInfo.setCurrentUser(tUser);
        return operInfo;

    }
}
