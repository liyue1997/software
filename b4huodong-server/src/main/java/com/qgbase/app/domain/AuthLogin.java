package com.qgbase.app.domain;

import com.qgbase.biz.user.domain.TUser;
import lombok.Data;

/**
 * @author : shl
 * @name :
 * @date : 2019/8/2
 * @desc :
 */
@Data
public class AuthLogin extends CommonRet {
    public String username = "";
    public String useraccount = "";
    public String usertype = "";
    public String userid = "";
    public String userheadpic="";//用户头像
    public String credits="100";
    public String phone="";

    public String t_ver="";
    public String paid="0";
    public String infoBeforePaid="要买吗？";//购买前提示信息
    public String infoBeforeUse="如何用"; //使用前提示信息
    public String isweixinpay="0";//是否显示微信支付
    public String isweixinwappay="1";//是否显示微信支付
    public String iszfbpay="1";//是否显示支付宝支付
    public String iszfbpaywap ="0";//是否显示支付宝网页支付
    public String strPrice="1";//价格 最低充值金额
    public String demolink="http://www.rabbitpre.com/m/fIZ7zeh";//演示链接
    public String lawlink="http://www.rabbitpre.com/m/fIZ7zeh";//免责链接
    public String downloadlink="http://www.rabbitpre.com/m/fIZ7zeh";//下载链接


    public String qq="";
    public String cityname = "";
    public String picture = "";


    public String imid = "";
    public String imuid = "";

    public String telofpt="";
    public String car="";
    public String company="";

    public String minichongzhimoeny ="2";//最低充值金额
    public String token="";

    //微信小程序
    public String unionId="";
    public String session_key="";
    public String openid="";

    public String shopid="";
    public String moudle="";
    public String isactive="";

    //public TUser data;

    public static AuthLogin getFail(String ainfo)
    {
        AuthLogin ret =new AuthLogin();
        ret.ret="fail";
        ret.info=ainfo;
        ret.errcode="-1";
        return ret;
    }
}
