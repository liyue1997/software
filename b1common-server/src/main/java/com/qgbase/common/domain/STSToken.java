package com.qgbase.common.domain;

import lombok.Data;

import java.io.Serializable;

/**
 * @author : shl
 * @name :
 * @date : 2019/8/6
 * @desc :
 */
@Data
public class STSToken implements Serializable {

    /**
     * 访问密钥标识
     */
    private String accessKeyId;
    /**
     * 访问密钥
     */
    private String accessKeySecret;
    /**
     * 安全令牌
     */
    private String securityToken;

}
