package com.qgbase.config;

/**
 * Created by lbb on 2018/4/26.
 * 主要用于：
 */
public class Constants {
    public final static int yesorno_Yes = 1;
    public final static int yesorno_No = 0;

    /*
    系统最高级别管理员
     */
    public final static String user_admin = "admin";
    public final static String role_admin = "admin";
    public final static String role_shop = "shop";
    public final static String role_user = "user";
    public final static String role_manage = "manager";



    /**
     * Token配置
     */
    public static final long EXPIRATIONTIME = 100000L * 60 * 60 * 24 * 30;// 1000秒
    public static final String SECRET = "P@ssw02d";            // JWT密码
    public static final String TOKEN_PREFIX = "Bearer";        // Token前缀
    public static final String HEADER_STRING = "token";// 存放Token的Header Key


    /**
     * 方法执行结果
     */

    public static final String SUCCESS = "0";
    public static final String BIZ_EXCEPTION = "1";
    public static final String SYS_EXCEPTION = "2";

    /**
     * 用户类型
     */
    public static final String usertype_user = "user";//系统内部用户

    public static final String devicestatus_unsell="0";//未销售
    public static final String devicestatus_sell="1";//已销售
    public static final String devicestatus_locked="2";//已锁定

}
