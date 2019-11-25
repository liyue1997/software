package com.qgbase.netty;

import com.qgbase.netty.WebSocketUtil;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.util.Date;
import java.util.List;

/**
 * @author : Winner
 * @name :
 * @date : 2019/5/13 0013
 * @desc :
 */
public class MessageDecoder extends ByteToMessageDecoder {
    // 消息头。
    private final static int CMD_MIN_LENGTH = 5;

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> list) throws Exception {

        if (in.readableBytes() < CMD_MIN_LENGTH) {
            return;
        }
        // 标记一下当前的readIndex的位置
        in.markReaderIndex();
        // 读取头数据长度
        short cmdHead = in.readShort();
        Byte cmd = in.readByte();
        Byte cmdParam = in.readByte();
        Byte dataLen = in.readByte();
        // 将缓冲区的数据读到字节数组
        byte[] dataByte = new byte[dataLen];
        try {
            in.readBytes(dataByte);
        }catch (Exception e){
            WebSocketUtil.sendMessage(new Date() + "命令异常:cmdHead = "+cmdHead+",cmd = "+cmd+", cmdParam = "+cmdParam+", dataLen = "+dataLen);
            return;
        }
        String data = new String(dataByte);
        Command command = new Command();
        command.setHead(cmdHead);
        command.setCmd(cmd);
        command.setCmdParam(cmdParam);
        command.setDataLen(dataLen);
        command.setData(data);
        list.add(command);
        }
//    }
}
