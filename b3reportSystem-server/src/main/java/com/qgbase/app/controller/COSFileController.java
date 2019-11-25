package com.qgbase.app.controller;


import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

//import com.alibaba.fastjson.JSONObject;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.auth.COSSigner;
import com.qcloud.cos.http.HttpMethodName;
import com.qcloud.cos.region.Region;
import com.qgbase.app.domain.CommonRet;
import com.qgbase.app.domain.SignRet;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Date;
import java.util.TreeMap;
import com.tencent.cloud.CosStsClient;

@RestController
public class COSFileController {

    public String getParmams(String key, HttpServletRequest request) {
        return request.getParameter(key);
    }

//    public OperInfo getOper(HttpServletRequest request) throws Exception {
//        OperInfo oper=OperInfo.createVirtualUser();
//        if (StringUtil.isNotBlank(request.getParameter("userid")) )
//        {
//            oper.setCurrentUser(tUserService.getobj(request.getParameter("userid"),oper));
//            if (oper.getCurrentUser()==null)
//                return null;
//
//        }
//        oper.lastTime= DateTime.now();
//        oper.lastIp= TToolRequest.getClientIp(request);
//        oper.lastOs="App"+TToolRequest.getOsInfo(request.getHeader("user-agent"));
//        return oper;
//
//    }
//
//    @RequestMapping(value = "/getCosSigner")
//    public JSONObject geneImgKey(@RequestBody JSONObject jo) {
//        JSONObject resJo = new JSONObject();
//        switch (jo.getString("signType")) {
//            case "img":
//                String bucketName = "b1common-1259797882";
//                COSCredentials cred = new BasicCOSCredentials("AKIDdAyXqtR2NSHuHPswOjpfhW6QWPAgk86q", "e385nFYgaEcosgEakhT2PQCjcFdldFl1");
//                COSSigner signer = new COSSigner();
//                Date expiredTime = new Date(System.currentTimeMillis() + 3600L * 1000L);
//                String sign = signer.buildAuthorizationStr(HttpMethodName.PUT, jo.getString("key"), cred, expiredTime);
//                resJo.put("sign", sign);
//                break;
//            case "video":
//                break;
//        }
//        return resJo;
//    }

    @RequestMapping(value = "/cosfile/file")

    public String index() throws Exception {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        HttpServletRequest request = servletRequestAttributes.getRequest();
        System.out.println(request.getQueryString());
        return getCredential().toString();
        /*
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        HttpServletResponse response = servletRequestAttributes.getResponse();
        System.out.println(request.getQueryString());
        String command = request.getParameter("command");
        System.out.println(command);
        SignRet sr = new SignRet();
        try {
            //OperInfo oper=getOper(request);// OperInfo.createVirtualUser();
            //if (oper==null && command !="CommonJust")
            //   return CommonRet.getFail("请重新登录");
            if (StringUtil.isNotBlank(command)) {
                switch (command) {
                    //http://127.0.0.1:10001/cosfile/file?command=getsign
//                    case "getsign":
//                        // 1 初始化用户身份信息(secretId, secretKey)
//                        COSCredentials cred = new BasicCOSCredentials("AKIDdAyXqtR2NSHuHPswOjpfhW6QWPAgk86q", "e385nFYgaEcosgEakhT2PQCjcFdldFl1");
//                        // 2 设置bucket的区域, COS地域的简称请参照 https://cloud.tencent.com/document/product/436/6224
//                        ClientConfig clientConfig = new ClientConfig(new Region("ap-shanghai"));
//                        // 3 生成 cos 客户端
//                        COSClient cosclient = new COSClient(cred, clientConfig);
//                        // bucket名需包含appid
//                        String bucketName = "b1common-1259797882";
//                        String key = request.getParameter("key");
//                        Date expirationTime = new Date(System.currentTimeMillis() + 30 * 60 * 1000);
//                        // 生成预签名上传 URL
//                        URL url = cosclient.generatePresignedUrl(bucketName, key, expirationTime, HttpMethodName.PUT);
//                        cosclient.shutdown();
//                        String url1 = URLDecoder.decode(url.toString(), "utf-8");
//                        System.out.println(url1);
//                        url1 = url1.substring(url1.indexOf('=') + 1);
//                        sr.sign = url1;
//                        return sr;
                    case "getcredential":
                        return getCredential();
                    default:
                        return sr;
                }
            } else {
                CommonRet commonRet = CommonRet.getFail("请求参数错误");
                //JSONObject object =new JSONObject(ret);
                // String jsonstr = object.toString();
                return sr;
            }
        } catch (Exception e) {
            System.out.println(e);
            e.printStackTrace();
            return sr;

        }
        */
    }

    public JSONObject getCredential()throws Exception {
        TreeMap<String, Object> config = new TreeMap<String, Object>();

        try {
            // 替换为您的 SecretId
            config.put("SecretId", "AKIDdAyXqtR2NSHuHPswOjpfhW6QWPAgk86q");
            // 替换为您的 SecretKey
            config.put("SecretKey", "e385nFYgaEcosgEakhT2PQCjcFdldFl1");

            // 临时密钥有效时长，单位是秒
            config.put("durationSeconds", 1800);

            // 换成您的 bucket
            config.put("bucket", "b1common-1259797882");
            // 换成 bucket 所在地区
            config.put("region", "ap-shanghai");

            // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的目录，例子：* 或者 doc/* 或者 picture.jpg
            config.put("allowPrefix", "*");

            // 密钥的权限列表。简单上传、表单上传和分片上传需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
            String[] allowActions = new String[]{
                    // 简单上传
                    "name/cos:PutObject",
                    // 表单上传、小程序上传
                    "name/cos:PostObject",
                    // 分片上传
                    "name/cos:InitiateMultipartUpload",
                    "name/cos:ListMultipartUploads",
                    "name/cos:ListParts",
                    "name/cos:UploadPart",
                    "name/cos:CompleteMultipartUpload"
            };
            config.put("allowActions", allowActions);

            JSONObject credential = CosStsClient.getCredential(config);
            //成功返回临时密钥信息，如下打印密钥信息
            System.out.println(credential);
            return credential;
        }
        catch (Exception e) {
            System.out.println(e);
            e.printStackTrace();
            return new JSONObject();

        }
    }

}
