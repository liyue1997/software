package com.qgbase.app;

import cn.jiguang.common.ClientConfig;
import cn.jiguang.common.resp.APIConnectionException;
import cn.jiguang.common.resp.APIRequestException;
import cn.jpush.api.JPushClient;
import cn.jpush.api.push.PushResult;
import cn.jpush.api.push.model.Platform;
import cn.jpush.api.push.model.PushPayload;
import cn.jpush.api.push.model.audience.Audience;
import cn.jpush.api.push.model.notification.Notification;
import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.profile.DefaultProfile;
import com.qgbase.biz.user.service.TUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;


public class AppTool {

    protected static Logger LOG = LoggerFactory.getLogger("AppTool");

    public static void SendSms(String phone,String yzm) {
        DefaultProfile profile = DefaultProfile.getProfile("default", "LTAIXcRiUYNsDwrb"
                , "g9MdYTOhQOtJ0H5TjSQXgPanR0vMan");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");
        request.putQueryParameter("RegionId", "default");
        request.putQueryParameter("PhoneNumbers", phone);
        request.putQueryParameter("SignName", "心星科技");
        request.putQueryParameter("TemplateCode", "SMS_118140087");
        request.putQueryParameter("TemplateParam", "{\"code\":\""+yzm+"\"}");
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
    }
    private static String appKey = "78178e180a0dd726e361589e";
    private static String masterSecret = "d588b4ec2939c87b8be87674";
    public static PushPayload buildPushObject_all_all_alert(String msg) {
        return PushPayload.alertAll(msg);
    }
    public static PushPayload buildPushObject_all_alias_alert(String alias,String msg) {
        return PushPayload.newBuilder()
                .setPlatform(Platform.all())
                .setAudience(Audience.alias(alias))
                .setNotification(Notification.alert(msg))
                .build();
    }
    public static PushPayload buildPushObject_id_alert(String id,String msg) {
        return PushPayload.newBuilder()
                .setPlatform(Platform.all())
                .setAudience(Audience.registrationId(id))
                .setNotification(Notification.alert(msg))
                .build();
    }

    public static void jpush(PushPayload payload)
    {

        JPushClient jpushClient = new JPushClient(masterSecret, appKey, null, ClientConfig.getInstance());

        // For push, all you need do is to build PushPayload object.
        //PushPayload payload = buildPushObject_all_alias_alert(alias, msg);

        try {
            PushResult result = jpushClient.sendPush(payload);
            LOG.info("Got result - " + result);

        } catch (APIConnectionException e) {
            // Connection error, should retry later
            LOG.error("Connection error, should retry later", e);

        } catch (APIRequestException e) {
            // Should review the error, and fix the request
            LOG.error("Should review the error, and fix the request", e);
            LOG.info("HTTP Status: " + e.getStatus());
            LOG.info("Error Code: " + e.getErrorCode());
            LOG.info("Error Message: " + e.getErrorMessage());
        }
    }

    public static void pushAll(String msg)
    {
        jpush(buildPushObject_all_all_alert( msg));
    }

    public static void pushbyAlias(String alias,String msg)
    {
        jpush(buildPushObject_all_alias_alert(alias, msg));
    }

    public static void pushbyID(String id,String msg)
    {
        jpush(buildPushObject_id_alert(id, msg));
    }
}
