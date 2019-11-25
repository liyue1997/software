package com.qgbase.netty;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author : Winner
 * @name :
 * @date : 2019/6/14 0014
 * @desc :
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class NewCommand {
    private String head;
    private String deviceType;
    private String cmd;
    private String uuid;
    private String deviceId;
    private String[] data;
}
