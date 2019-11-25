package com.qgbase.netty;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author : Winner
 * @name : 帧结构体
 * @date : 2019/5/13 0013
 * @desc :
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Command {
    private short head;//头标识
    private byte cmd;//命令
    private byte cmdParam;//命令参数
    private byte dataLen;//数据长度
    private String data;//数据
    /*private short checkCode;//校验码*/
}
