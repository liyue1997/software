package com.qgbase.common.controller;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.ShearCaptcha;
import cn.hutool.core.util.StrUtil;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.enumeration.EnumResultType;
import com.qgbase.common.service.RedisService;
import com.qgbase.config.Constants;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.biz.user.service.TUserService;
import com.qgbase.util.TToolRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

/**
 * 登录相关
 * @author cuiwei
 * @date 2018-05-04
 */
@Controller
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    TUserService tUserService;
    @Autowired
    RedisService redisService;

    @ApiOperation(value = "登录")
    @PostMapping(value = "/login")
    @ResponseBody
    public String login(@RequestParam("username") String userName, @RequestParam("password") String password
                       ) throws Exception {
        OperInfo operInfo = OperInfo.createVirtualUser();
//        if (result.hasError()) {
//            return TToolRequest.ResultException(result.getCode(), result.getMsg());
//        }
        TUser user = tUserService.login(userName, password,operInfo);
        if (user != null) {
            //TUserinfo userinfo = tUserInfoService.getobj(user.getUserId(),operInfo);
            //tUserService.updateobj(user,operInfo);
            //todo ????????? uid 为何写死
            String jwt = Jwts.builder()
                    .setSubject(user.getUserAccount())
                    .claim("uid","c7434e88e2404690b6c5674329dd408aT1527474113957")
                    // 有效期设置
                    .setExpiration(new Date(System.currentTimeMillis() + Constants.EXPIRATIONTIME))
                    // 签名设置
                    .signWith(SignatureAlgorithm.HS512, Constants.SECRET)
                    .compact();
            return TToolRequest.ResultLogin(jwt, user.getLoginUser());
        } else {
            return TToolRequest.ResultLogin("", null);
        }

    }
    @RequestMapping("/refresh/{uid}")
    public void verifyCode(@PathVariable String uid, HttpServletResponse response) throws IOException {
        response.setContentType("image/png");
        response.setHeader("Cache-Control", "no-cache, no-store");
        response.setHeader("Pragma", "no-cache");
        ShearCaptcha captcha = CaptchaUtil.createShearCaptcha(160, 70, 4, 0);
        redisService.setValue(uid, captcha.getCode(), 30);
        captcha.write(response.getOutputStream());
    }

    @GetMapping("/getGuestUid")
    @ResponseBody
    public String getGuestUid() {
        return TToolRequest.ResultSuccess(StrUtil.uuid().replace("-", ""));
    }

    @ApiOperation(value="退出登录")
    @GetMapping(value = "/logout")
    @ResponseBody
    public String logout(OperInfo opUser) throws Exception {
        //令牌时效未处理
        return  TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(),null);
    }
}
