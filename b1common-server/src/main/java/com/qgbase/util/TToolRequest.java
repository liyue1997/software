package com.qgbase.util;

import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.domain.TReturnInfo;
import com.qgbase.common.enumeration.EnumResultType;
import com.qgbase.config.Constants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by lbb on 2018/4/26.
 * 主要用于：请求返回结果工具类
 */
public class TToolRequest {
    public static String Result(String code, String msg, Object o) {
        TReturnInfo ri = new TReturnInfo();
        ri.code = code;
        ri.msg = msg;
        ri.data = o;
        return JsonUtil.toJson(ri);
    }

    public static String ResultSuccess(Object o) {
        TReturnInfo ri = new TReturnInfo();
        ri.code = "0";
        ri.msg = "";
        ri.data = o;
        return JsonUtil.toJson(ri);
    }

    public static String ResultLogin(String o, Object obj) {
        TReturnInfo ri = new TReturnInfo();
        if ("".equals(o)) {
            ri.code = EnumResultType.LOGIN_FAILED.getCode();
            ri.msg = EnumResultType.LOGIN_FAILED.getMsg();
        } else {
            ri.code = EnumResultType.LOGIN_SUCCESS.getCode();
            ri.msg = EnumResultType.LOGIN_SUCCESS.getMsg();
        }
        ri.token = o;
        ri.data = obj;
        return JsonUtil.toJson(ri);
    }

    public static String ResultException(String code, String msg) {
        TReturnInfo ri = new TReturnInfo();
        ri.code = code;
        ri.msg = msg;
        return JsonUtil.toJson(ri);
    }

    /**
     * 无视代理获得ip
     *
     * @param request
     * @return
     */
    public static String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (StringUtil.isNotBlankIfStr(ip)) {
            ip = ip.split(",")[0];
        }
        return ip;

    }

    /**
     * 获得用户操作系统信息
     *
     * @return 返回操作系统信息
     */
    public static String getOsInfo(String browserDetails) {
        if (browserDetails == null) {
            return "";
        }
        String os;
        if (browserDetails.toLowerCase().contains("windows")) {
            os = "Windows";
        } else if (browserDetails.toLowerCase().contains("mac")) {
            os = "Mac";
        } else if (browserDetails.toLowerCase().contains("x11")) {
            os = "Unix";
        } else if (browserDetails.toLowerCase().contains("android")) {
            os = "Android";
        } else if (browserDetails.toLowerCase().contains("iphone")) {
            os = "IPhone";
        } else {
            os = "UnKnown, More-Info: " + browserDetails;
        }
        return os;
    }
}
