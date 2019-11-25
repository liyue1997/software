package com.qgbase.netty;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;
import io.netty.handler.timeout.IdleStateHandler;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/* *
 * Netty 服务端过滤器
 * @Author winner
 * @Date 下午 3:35 2019/5/11 0011
 * @Description
 * @return 
 **/
@Component
public class NettyServerFilter extends ChannelInitializer<SocketChannel> {

     @Override
     protected void initChannel(SocketChannel ch) throws Exception {
        ChannelPipeline ph = ch.pipeline();
        //入参说明: 读超时时间、写超时时间、所有类型的超时时间、时间格式
        ph.addLast(new IdleStateHandler(5, 0, 0, TimeUnit.SECONDS));
        /*ph.addLast(new MessageDecoder());
        ph.addLast(new MessageEncoder());*/
        ph.addLast(new StringDecoder());
        ph.addLast(new StringEncoder());
        //业务逻辑实现类
        ph.addLast("nettyServerHandler", new NettyServerHandler());
     }
 }
