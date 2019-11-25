package com.qgbase.app;

import com.qgbase.app.domain.CommonRet;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.biz.user.service.TUserService;
import com.qgbase.common.controller.AuthController;
import org.springframework.beans.factory.annotation.Autowired;

public class AppTool {

    @Autowired
    private TUserService userService;

    public boolean login(String userName, String passWord) {
        try {
            if (userService.login(userName, passWord, null) == null) {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

}
