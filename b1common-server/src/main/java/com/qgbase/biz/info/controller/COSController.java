package com.qgbase.biz.info.controller;

import com.alibaba.fastjson.JSONObject;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.auth.COSSigner;
import com.qcloud.cos.http.HttpMethodName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * @author : shl
 * @name :
 * @date : 2019/8/8
 * @desc :
 */
@Controller
@RequestMapping(value = "/cos")
public class COSController {

    private static final Logger LOGGER = LoggerFactory.getLogger(COSController.class);

    @PostMapping(value = "/getCosSigner")
    @ResponseBody
    public String getCosSigner(@RequestBody JSONObject jo) {
        LOGGER.info("signType: " + jo.getString("signType"));
        JSONObject result = new JSONObject();
        switch (jo.getString("signType")){
            case "img":
                String bucketName = "b1common-1259797882";
                COSCredentials cred = new BasicCOSCredentials("AKIDdAyXqtR2NSHuHPswOjpfhW6QWPAgk86q", "e385nFYgaEcosgEakhT2PQCjcFdldFl1");
                COSSigner signer = new COSSigner();
                Date expiredTime = new Date(System.currentTimeMillis() + 3600L * 1000L);
                String sign = signer.buildAuthorizationStr(HttpMethodName.PUT, jo.getString("key"), cred, expiredTime);
                result.put("sign", sign);
                break;
            case "video":
                break;
            default:
                break;
        }
        return result.toJSONString();
    }
}
