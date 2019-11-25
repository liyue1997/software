package com.qgbase.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.qgbase.app.domain.CommonRet;
import com.qgbase.config.exception.SysRunException;

/**
 * Created by pc on 2019/10/29.
 * //https://blog.csdn.net/qq_36020545/article/details/56011311 处理微信登录，根据code获取openid
 */
public class TWeixinTool {
    public static String appid = "wx3394377d7e06a7cc";
    public static String secret = "cc4f06d2f243b15e201bf074d52a328d";

    public static String getOpenidByCode(String code) {

        System.out.println(code);
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=APPSECRET&code=CODE&grant_type=authorization_code"
                .replace("APPID", appid).replace("APPSECRET", secret).replace("CODE", code);
        //System.out.println(url);
        String requestResult = THttpTool.doGet(url);//我们需要自己写或者在网上找一个 doGet 方法 发送doGet请求
        //System.out.println(requestResult);
        JSONObject getCodeResultJson = JSON.parseObject(requestResult);//把请求成功后的结果转换成JSON对象
        if (getCodeResultJson == null || getCodeResultJson.getInteger("errcode") != null || getCodeResultJson.getString("openid") == null) {
//            System.out.println("获取微信授权失败");
//            return CommonRet.getFail("获取微信授权失败");
            throw new SysRunException("-2", "获取微信授权失败");
        }
        String openid = getCodeResultJson.getString("openid");//拿到openid
        return openid;
    }

    public static String getWeixinToken() {
        //我们需要获取当前公众号通用的access_token 和用户的access_token是不一样的
        //这里我为了让大家可以方便就没有写太复杂  因为微信他那边获取微信公众号的通用access_token每天只能取2000次 每次token有效期是7200S 所以在自己动手写最好放在缓存中 我的项目放在redis中
        String requestUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET"
                .replace("APPID", appid).replace("APPSECRET", secret);
        String result1 = THttpTool.doGet(requestUrl);
        System.out.println(result1);
        JSONObject weixinToken = JSON.parseObject(result1);
        if(weixinToken == null){
            throw new SysRunException("-2", "获取微信token失败");
        }
        String wxgzhToken =  weixinToken.getString("access_token");
        TTool.LogInfo("getWeixinToken:"+wxgzhToken);
        return wxgzhToken;

    }
    public static String getJsapi_ticket(String accesstoken)
    {
        String requestUrl ="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi"
                .replace("ACCESS_TOKEN", accesstoken)  ;
        String result1 = THttpTool.doGet(requestUrl);
        JSONObject weixinToken = JSON.parseObject(result1);
        if(weixinToken == null){
            throw new SysRunException("-2", "获取微信token失败");
        }
        String wxgzhToken =  weixinToken.getString("ticket");
        TTool.LogInfo("getJsapi_ticket:"+wxgzhToken);
        return wxgzhToken;
    }

    public static String getWeixinUserInfo(String openid) {
        String wxgzhToken=getWeixinToken();
        //这里是获取用户在我们公众里面的信息 如果没有关注公众号那么就没有办法获取详细信息 参数需要 微信公众号通用token 和 用户openid
        String requestUrl1 = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN"
                .replace("ACCESS_TOKEN", wxgzhToken).replace("OPENID", openid);
        System.out.println(requestUrl1);
        String infore1 = THttpTool.doGet(requestUrl1);
        System.out.println(infore1);
        JSONObject user = JSON.parseObject(infore1);
        if(user == null || user.getInteger("errcode") != null ) {
            throw new SysRunException("-2", "不能获取微信昵称");
        }
        //"subscribe":0  {"subscribe":0,"openid":"oFPue5iZnZ0Q-_vRC-uvOaEkqNwk","tagid_list":[]}
        //{"subscribe":1,"openid":"oFPue5iZnZ0Q-_vRC-uvOaEkqNwk","nickname":"熬夜不秃头🌚","sex":2,"language":"zh_CN","city":"无锡","province":"江苏","country":"中国","headimgurl":"http:\/\/thirdwx.qlogo.cn\/mmopen\/gma9tX44AZLOR5jR6BQHBcpvd9Us4ibfK0YNbQTcaiaUEzNfZMgrodto2f5iauAlQhVHnWX0icLk6NuhoAodHY7AkNVibpNk07RVt\/132","subscribe_time":1572337523,"remark":"","groupid":0,"tagid_list":[],"subscribe_scene":"ADD_SCENE_SEARCH","qr_scene":0,"qr_scene_str":""}
        return "";
    }

}
