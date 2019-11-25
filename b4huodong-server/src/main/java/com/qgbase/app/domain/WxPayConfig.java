package com.qgbase.app.domain;

import com.qgbase.wxpay.sdk.IWXPayDomain;
import com.qgbase.wxpay.sdk.WXPayConfig;
import com.qgbase.wxpay.sdk.WXPayConstants;

import java.io.*;

public  class WxPayConfig extends  WXPayConfig{

    private byte[] certData;

    public WxPayConfig() throws Exception {
        String certPath = "/work/certs/apiclient_cert.p12";
        File file = new File(certPath);
        InputStream certStream = new FileInputStream(file);
        this.certData = new byte[(int) file.length()];
        certStream.read(this.certData);
        certStream.close();
    }

    public String getAppID() {
        return "wx3394377d7e06a7cc";
    }

    public String getMchID() {
        return "1560898211";
    }

    public String getKey() {
        return "cc4f06d2f243b15e201bf074d52a328d";
    }

    public InputStream getCertStream() {
        ByteArrayInputStream certBis = new ByteArrayInputStream(this.certData);
        return certBis;
    }

    public int getHttpConnectTimeoutMs() {
        return 8000;
    }

    public int getHttpReadTimeoutMs() {
        return 10000;
    }
    public  IWXPayDomain getWXPayDomain(){
// 这个方法需要这样实现, 否则无法正常初始化WXPay
        //https://blog.csdn.net/weixin_42161659/article/details/89097665
        IWXPayDomain iwxPayDomain = new IWXPayDomain() {

            public void report(String domain, long elapsedTimeMillis, Exception ex) {

            }

            public DomainInfo getDomain(WXPayConfig config) {
                return new IWXPayDomain.DomainInfo(WXPayConstants.DOMAIN_API, true);
            }
        };
        return iwxPayDomain;
    }
}
