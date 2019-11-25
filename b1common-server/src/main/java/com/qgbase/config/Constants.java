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
    public final static String user_adminRole = "admin";
    public final static String user_famerRole = "farmer";
    public final static String role_admin = "admin";
    public final static String role_cpadmin = "cpadmin";
    public final static String role_cgm = "CGM";//仓库管理员
    public final static String role_cgy = "CGY";//仓库员
    public final static String role_cw = "CW";//财务
    public final static String role_tmy = "TMY";//条码员
    public final static String role_market= "market";//超市
    public final static String role_famer = "farmer";//农户
    public final static String role_vehicle = "vehicle";//车辆
    public final static String role_zzc = "zzc";//中转仓



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
    public static final String usertype_farmer = "farmer";//农户
    public static final String usertype_chaoshi = "market";//超市
    public static final String usertype_car = "vehicle";//车辆
    public static final String usertype_zzc = "zzc";//中转仓

    /**
     * 单据类型
     */
    public static final String orderType_inware = "inware";//采购入库单
    public static final String orderType_transfer = "transfer";//	调拨单
    public static final String orderType_inventory = "inventory";//	仓库盘点单
    public static final String orderType_returnout = "returnout";//	退货出库单
    public static final String orderType_recoverin= "recoverin";//余货入库单
    public static final String orderType_outware= "outware";//	发货出库单
    public static final String orderType_returnin= "returnin";//回收入库单
    public final static String orderType_wmsFarmerget="farmerget";//农户确认收货
    public final static String orderType_wmsFarmersend="farmersend";//农户发货
    public final static String orderType_wmsMarketget="marketget";//商超确认收货
    public final static String orderType_wmsMarketsend="marketsend";//商超回收
    public final static String orderType_wmsPack="pack";//商超回收

    /**
     * 入库单状态
     */
    public static final String orderStatus_new = "new";
    public static final String orderStatus_confirm = "confirm";
    public static final String orderStatus_yfp = "yfp";
    public static final String orderStatus_wfp = "wfp";
    public static final String orderStatus_close = "close";


    public static  final String Lot_type_zha="lot";//	一扎
    public static final String Lot_type_TP = "TP";//托盘

    /*
        支付类型
     */
    public final static String payType_cash="cash";
    public final static String payType_zfb="zfb";
    public final static String payType_weixin="weixin";
    public final static String payType_sys="sys";

    public final static String datadic_location="Location";

    public final static String locationType_finished="finished";//成品
}
