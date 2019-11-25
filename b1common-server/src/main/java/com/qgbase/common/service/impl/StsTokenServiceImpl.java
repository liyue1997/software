package com.qgbase.common.service.impl;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.aliyuncs.sts.model.v20150401.AssumeRoleRequest;
import com.aliyuncs.sts.model.v20150401.AssumeRoleResponse;
import com.qgbase.common.domain.STSToken;
import com.qgbase.common.service.StsTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Service;

/**
 * @author : shl
 * @name :
 * @date : 2019/8/6
 * @desc :
 */
@Service
public class StsTokenServiceImpl implements StsTokenService {

    private static final Logger LOGGER = LoggerFactory.getLogger(StsTokenServiceImpl.class);
    @Value("${aliyun.oss.accessKeyId}")
    private String accessKeyId;
    @Value("${aliyun.oss.accessKeySecret}")
    private String accessKeySecret;
    @Value("${aliyun.sts.roleArn}")
    private String roleArn;
    @Value("${aliyun.sts.roleSessionName}")
    private String roleSessionName;

//    private final String policy = "{\n" +
////            "  \"Statement\": [\n" +
////            "    {\n" +
////            "      \"Action\": \"sts:AssumeRole\",\n" +
////            "      \"Effect\": \"Allow\",\n" +
////            "      \"Principal\": {\n" +
////            "        \"RAM\": [\n" +
////            "          \"acs:ram::1475612698580620:root\"\n" +
////            "        ]\n" +
////            "      }\n" +
////            "    }\n" +
////            "  ],\n" +
////            "  \"Version\": \"1\"\n" +
////            "}";

    /**
     * token失效时间，单位秒(不设置默认1小时,这里设置5分钟)
     */
//    private static final Long durationSeconds= 300L;
    private static final String ENDPOINT = "sts.aliyuncs.com";

    @Override
    public STSToken getStsToken() {
        STSToken tokenVO = new STSToken();
        try {
            // 添加endpoint（直接使用STS endpoint，前两个参数留空，无需添加region ID）
            DefaultProfile.addEndpoint("", "", "Sts", ENDPOINT);
            // 构造default profile（参数留空，无需添加region ID）
            IClientProfile profile = DefaultProfile.getProfile("", accessKeyId, accessKeySecret);
            // 用profile构造client
            DefaultAcsClient client = new DefaultAcsClient(profile);
            final AssumeRoleRequest request = new AssumeRoleRequest();
            request.setMethod(MethodType.POST);
            request.setRoleArn(roleArn);
            request.setRoleSessionName(roleSessionName);
//             request.setDurationSeconds(durationSeconds);
            // 针对该临时权限可以根据该属性赋予规则，格式为json，没有特殊要求，默认为空// Optional
//             request.setPolicy(policy);
            final AssumeRoleResponse response = client.getAcsResponse(request);
            AssumeRoleResponse.Credentials credentials = response.getCredentials();
            tokenVO.setAccessKeyId(credentials.getAccessKeyId());
            tokenVO.setAccessKeySecret(credentials.getAccessKeySecret());
            tokenVO.setSecurityToken(credentials.getSecurityToken());
            System.out.println(tokenVO.toString());
            return tokenVO;
        } catch (ClientException e) {
            LOGGER.error("获取阿里云STS临时授权权限失败，错误信息：" + e);
            return null;
        }
    }
}
