package com.qgbase.netty;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

/**
 * @author : Winner
 * @name :
 * @date : 2019/5/15 0015
 * @desc :
 */
public class MessageEncoder extends MessageToByteEncoder<Command> {
    @Override
    protected void encode(ChannelHandlerContext channelHandlerContext, Command command, ByteBuf out) throws Exception {
        byte[] result = new byte[5+command.getDataLen()];
        int index = 0;
        System.arraycopy(ByteConvertUtil.short2ByteNew(command.getHead()),0,result,index,2);
        index+=2;
        byte[] cmd = new byte[1];
        cmd[0] = command.getCmd();
        System.arraycopy(cmd,0,result,index,1);
        index += 1;
        byte[] cmdParam = new byte[1];
        cmdParam[0] = command.getCmdParam();
        System.arraycopy(cmdParam,0,result,index,1);
        index += 1;
        byte[] dataLen = new byte[1];
        dataLen[0] = command.getDataLen();
        System.arraycopy(dataLen,0,result,index,1);
        index += 1;
        System.arraycopy(command.getData().getBytes(),0,result,index,command.getData().getBytes().length);
        out.writeBytes(result);
    }
}
