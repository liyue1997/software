package com.qgbase.app.controller;

import cn.hutool.json.JSON;
import com.alibaba.fastjson.JSONObject;
import com.qgbase.app.domain.*;
import com.qgbase.biz.huodong.domain.HdHuodong;
import com.qgbase.biz.huodong.domain.HdHuodong2user;
import com.qgbase.biz.huodong.domain.HdShop;
import com.qgbase.biz.huodong.domain.HdUser;
import com.qgbase.biz.huodong.service.HdHuodong2userService;
import com.qgbase.biz.huodong.service.HdHuodongService;
import com.qgbase.biz.huodong.service.HdShopService;
import com.qgbase.biz.huodong.service.HdUserService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.permission.utils.MD5Util;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import com.qgbase.wxpay.sdk.WXPay;
import com.qgbase.wxpay.sdk.WXPayConstants;
import com.qgbase.wxpay.sdk.WXPayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.*;

@RestController
public class AppPayController extends BaseController {

    @Autowired
    HdHuodongService hdHuodongService;
    @Autowired
    HdHuodong2userService hdHuodong2userService;
    @Autowired
    HdShopService hdShopService;
    @Autowired
    HdUserService hdUserService;

    @RequestMapping(value = "/pay/unifiedOrder")
    public JSONObject payunifiedOrder() {
        long startTime = System.currentTimeMillis();
        try {
            JSONObject ret = unifiedOrder();
            TTool.LogInfo( ret.toJSONString());
            return ret;
        }
        catch (Exception e)
        {
             TTool.LogErr(e);
             return getFail("系统异常");
        }
        finally {
            long endTime = System.currentTimeMillis();    //获取结束时间
            TTool.LogInfo("pay/return,运行时间：" + (endTime - startTime) + "ms");    //输出程序运行时间
        }
    }
    //排序
    private SortedMap<String, String> wxPay(String packages, String paySignKey,String appid) {
        SortedMap<String, String> params = new TreeMap<String, String>();
        params.put("appId", appid);
        params.put("timeStamp", String.valueOf(System.currentTimeMillis() / 1000));
        params.put("nonceStr", "52076498"+String.valueOf(System.currentTimeMillis() / 1000));//支付签名随机串，不长于 32 位
        params.put("package", packages);
        params.put("signType", "MD5");
        String signature = createSign(params, paySignKey);
        params.put("paySign", signature);
        return params;
    }
    /**
      * 创建md5摘要,规则是:按参数名称a-z排序,遇到空值的参数不参加签名。
     */
    private String createSign(SortedMap<String, String> packageParams, String AppKey) {
         StringBuffer sb = new StringBuffer();
         Set es = packageParams.entrySet();
         Iterator it = es.iterator();
        while (it.hasNext()) {
             Map.Entry entry = (Map.Entry) it.next();
             String k = (String) entry.getKey();
             String v = (String) entry.getValue();
             if (null != v && !"".equals(v) && !"sign".equals(k) && !"key".equals(k)) {
            sb.append(k + "=" + v + "&");
            }
         }
         sb.append("key=" + AppKey);
        String sign = MD5Util.MD5Encode(sb.toString()).toUpperCase();//https://blog.csdn.net/zdl_250143171/article/details/81207439
         return sign;
     }
    public JSONObject getFail(String info){
        JSONObject jsonObj=new JSONObject();
        jsonObj.put("code", 100003);
        jsonObj.put("msg", info);
        return jsonObj;
    }

    public JSONObject unifiedOrder() throws Exception {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        HttpServletResponse response = servletRequestAttributes.getResponse();
        TTool.LogInfo(request.getQueryString());
        String huodongid=getParmams("huodongid",request);
        if (StringUtil.isEmpty(huodongid))
            return getFail("参数错误:缺少huodongid");
        String shopid=getParmams("shopid",request);
        if (StringUtil.isEmpty(shopid))
            return getFail("参数错误:shopid");
        String userid=getParmams("userid",request);
        if (StringUtil.isEmpty(userid))
            return getFail("参数错误:userid");
        String car=getParmams("car",request);
//        if (StringUtil.isEmpty(car))
//            return getFail("车牌必须输入");
        String cartype=getParmams("cartype",request);
        String phone=getParmams("phone",request);
        String username=getParmams("username",request);
        String sfz=getParmams("sfz",request);
        String fromuser=getParmams("fromuser",request);
        OperInfo oper=getOper(request);

        HdHuodong hdHuodong=hdHuodongService.getobj(huodongid,oper);
        if (hdHuodong==null)
            return getFail("活动已经结束或取消");
        if (!hdHuodong.getHuodongStatus().equals("1"))
            return getFail("活动已经结束");
//        System.out.println(new Date().getTime());
//        System.out.println(hdHuodong.getStartTime().getTime());
//        System.out.println(hdHuodong.getEndTime().getTime());

        if (hdHuodong.getStartTime().getTime() > new Date().getTime())
            return getFail("活动还未开始");
        if (hdHuodong.getEndTime().getTime() < new Date().getTime())
            return getFail("活动结束");

        HdShop hdShop=hdShopService.getobj(shopid,oper);
        if (hdShop==null)
            return getFail("门店未参与活动");
        if (!hdShop.getShopStatus().equals("1"))
            return getFail("门店不参与活动");

        HdUser hdUser=hdUserService.getobj(userid,oper);
        if (hdUser==null)
            return getFail("登录异常，请重新登录");
        if (hdUser.getIsActive() != 1)
            return getFail("用户未激活");


        HdHuodong2user hdHuodong2user= hdHuodong2userService.getHuodong(huodongid,shopid,userid,oper);
        if (hdHuodong2user==null)
        {
            hdHuodong2user =hdHuodong2userService.newObj(oper);
            //hdHuodong2user.setHuodonguserId(huodongid);
            hdHuodong2user.setHuodongId(huodongid);
            hdHuodong2user.setShopId(shopid);
            hdHuodong2user.setUserId(userid);
            hdHuodong2user.setUserCar(car);
            hdHuodong2user.setUserCartype(cartype);
            hdHuodong2user.setUserPhone(phone);
            hdHuodong2user.setInfoStatus("1");
            hdHuodong2user.setPayOrder(hdHuodong2userService.getOrderid());
            hdHuodong2user.setPayStatus("0");
            hdHuodong2user.setPayTime(new Date());
            hdHuodong2user.setUserName(username);
            hdHuodong2user.setUserSfz(sfz);
            hdHuodong2user.setFromUser(fromuser);
            hdHuodong2user.setPayMoney(hdHuodong.getPayMoney());
            hdHuodong2user.setPayFee(hdHuodong.getPayFee());

            hdHuodong2user=hdHuodong2userService.addobj(hdHuodong2user,oper);
        }
        else
        {
            switch (hdHuodong2user.getPayStatus())
            {
                case "0":
                    int sec=  TTool.getTimeDelta(new Date(),hdHuodong2user.getPayTime());
                    if (sec <300)
                        return getFail("你得订单正在支付，如有问题，5分钟后，再重新发起支付");

                    hdHuodong2user.setPayOrder(hdHuodong2userService.getOrderid());
                    hdHuodong2user.setPayStatus("0");
                    hdHuodong2user.setPayTime(new Date());
                    hdHuodong2user.setUserCar(car);
                    hdHuodong2user.setUserCartype(cartype);
                    hdHuodong2user.setUserPhone(phone);
                    hdHuodong2user.setUserName(username);
                    hdHuodong2user.setUserSfz(sfz);
                    hdHuodong2user.setFromUser(fromuser);
                    hdHuodong2user.setPayMoney(hdHuodong.getPayMoney());
                    hdHuodong2user.setPayFee(hdHuodong.getPayFee());
                    hdHuodong2user=hdHuodong2userService.updateobj(hdHuodong2user,oper);
                    break;
                case "1":
                    return getFail("你得订单已经支付成功，请莫重复支付");
                case "2":
                    hdHuodong2user.setPayOrder(hdHuodong2userService.getOrderid());
                    hdHuodong2user.setPayStatus("0");
                    hdHuodong2user.setPayTime(new Date());
                    hdHuodong2user.setUserCar(car);
                    hdHuodong2user.setUserCartype(cartype);
                    hdHuodong2user.setUserPhone(phone);
                    hdHuodong2user.setUserName(username);
                    hdHuodong2user.setUserSfz(sfz);
                    hdHuodong2user.setFromUser(fromuser);
                    hdHuodong2user.setPayMoney(hdHuodong.getPayMoney());
                    hdHuodong2user.setPayFee(hdHuodong.getPayFee());
                    hdHuodong2user=hdHuodong2userService.updateobj(hdHuodong2user,oper);
                    break;
                default:
                    return getFail("你得订单异常请联系管理员，订单号:"+hdHuodong2user.getPayOrder());

            }
        }
        hdUser.setUserName(username);
        hdUser.setUserPhone(phone);
        hdUser.setUserCar(car);
        hdUser.setUserCartype(cartype);
        hdUserService.updateobj(hdUser,oper);


        WxPayConfig config = new WxPayConfig();
        WXPay wxpay = new WXPay(config);
        float f= Float.parseFloat(hdHuodong.getPayMoney())*100;
        int money= Math.round(f);
        Map<String, String> data = new HashMap<String, String>();
        data.put("body", "weixin pay");
        data.put("out_trade_no", hdHuodong2user.getPayOrder());
        data.put("device_info", "");
        data.put("fee_type", "CNY");
        data.put("total_fee",String.valueOf(money) );
        data.put("spbill_create_ip", "123.12.12.123");
        data.put("notify_url", "http://www.xinxingtech.com.cn/b4huodong/pay/return");
        data.put("trade_type", "JSAPI");  // 此处指定为扫码支付
        data.put("product_id", hdHuodong.getHuodongId());
        data.put("openid", hdUser.getUserWeixinid());
        data.put("sign_type",WXPayConstants.HMACSHA256);
        //System.out.println(data);

        try {

            //System.out.println("wxpay返回");
            Map<String, String> resp = wxpay.unifiedOrder(data);
            System.out.println(resp);
            String return_code=resp.get("return_code");
            String prepay_id=resp.get("prepay_id");
            if (return_code.equals("SUCCESS"))
            {
                String timeStamp = Long.toString((long) ((new Date().getTime())*0.001));
                String nonceStr = WXPayUtil.generateNonceStr();
                Map params = new TreeMap();
                params.put("appId", config.getAppID());
                params.put("timeStamp", timeStamp);
                params.put("nonceStr", nonceStr);
                params.put("package", "prepay_id="+resp.get("prepay_id"));
                params.put("signType", WXPayConstants.HMACSHA256);
                params.put("paySign", WXPayUtil.generateSignature(params, config.getKey(), WXPayConstants.SignType.HMACSHA256));

                JSONObject jsonObj=new JSONObject();
                //String packages = "prepay_id=" + prepay_id;
                //SortedMap<String, String> payInfo = this.wxPay(packages, config.getKey(),config.getAppID());  //MCHKEY-微信支付商户密钥
                jsonObj.put("payInfo", params);
                jsonObj.put("code", 100000);
                jsonObj.put("msg", "SUCCESS");
                return jsonObj;
            }
            else
            {
                TTool.LogErr(resp.get("return_msg"));
                return getFail("暂时无法支付");
            }

        } catch (Exception e) {
            //e.printStackTrace();
            TTool.LogErr(e);
            return getFail(e.getMessage());
        }
    }

    @RequestMapping(value = "/pay/return")
    public String payreturn1() {
        long startTime = System.currentTimeMillis();
        try {
            String ret = payreturn();
            TTool.LogInfo(ret);
            return ret;
        }
        catch (Exception e)
        {
            TTool.LogErr(e);
            return "系统异常";
        }
        finally {
            long endTime = System.currentTimeMillis();    //获取结束时间
            TTool.LogInfo("pay/return,运行时间：" + (endTime - startTime) + "ms");    //输出程序运行时间
        }
    }
    public String payreturnOk()
    {
        return "<xml>\n" +
                "\n" +
                "  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
                "  <return_msg><![CDATA[OK]]></return_msg>\n" +
                "</xml>";
    }
    public String payreturnErr(String info)
    {
        return "<xml>\n" +
                "\n" +
                "  <return_code><![CDATA[error]]></return_code>\n" +
                "  <return_msg><![CDATA["+info+"]]></return_msg>\n" +
                "</xml>";
    }
    public String payreturn() throws Exception {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        HttpServletResponse response = servletRequestAttributes.getResponse();
        PrintWriter out = null;
        StringBuffer xmlStr = new StringBuffer();
        try {
            BufferedReader reader = request.getReader();
            String line = null;
            while ((line = reader.readLine()) != null) {
                xmlStr.append(line);
            }
            TTool.LogInfo("支付回调通知：" + xmlStr.toString());
            WxPayConfig config = new WxPayConfig();
            WXPay wxpay = new WXPay(config);

            Map<String, String> notifyMap = WXPayUtil.xmlToMap(xmlStr.toString());  // 转换成map

            if (!wxpay.isPayResultNotifySignatureValid(notifyMap)) {
                TTool.LogInfo("回调健权失败");
            }
                // 签名正确
                // 进行处理。
                // 注意特殊情况：订单已经退款，但收到了支付结果成功的通知，不应把商户侧订单状态从退款改成支付成功

                String return_code = notifyMap.get("return_code");
                if (StringUtil.isEmpty(return_code))
                    return payreturnErr("参数错误:return_code");
                if (!return_code.equals( "SUCCESS"))
                    return payreturnErr("支付失败"+return_code);

                String out_trade_no = notifyMap.get("out_trade_no");
                if (StringUtil.isEmpty(out_trade_no))
                    return payreturnErr("参数错误:out_trade_no");
                String transaction_id = notifyMap.get("transaction_id");

                HdHuodong2user hdHuodong2user = hdHuodong2userService.getHuodongByorder(out_trade_no, getOper(request));
                if (hdHuodong2user == null)
                    return payreturnErr("订单丢失:" + out_trade_no);
                if (hdHuodong2user.getPayStatus().equals("0")) {
                    hdHuodong2user.setPayStatus("1");
                    hdHuodong2user.setPayTime(new Date());
                    hdHuodong2user.setUserDemo(hdHuodong2user.getUserDemo() + ",order:" + transaction_id);
                    hdHuodong2user.setPayType("wx_JSAPI");
                    hdHuodong2userService.updateobj(hdHuodong2user, getOper(request));
                    return payreturnOk();
                }
                return payreturnOk();



        }catch (Exception e)
        {
            TTool.LogErr(e);
            return payreturnErr("处理异常");
        }
    }
}
