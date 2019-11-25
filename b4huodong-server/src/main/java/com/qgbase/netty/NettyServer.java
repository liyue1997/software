package com.qgbase.netty;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

/* *
 * Netty服务端
 * @Author winner
 * @Date 下午 3:35 2019/5/11 0011 
 * @Description
 * @return 
 **/
public class NettyServer {
    private static final int port = 13009; // 设置服务端端口
    private static EventLoopGroup boss = new NioEventLoopGroup(); // 通过nio方式来接收连接和处理连接
    private static EventLoopGroup work = new NioEventLoopGroup(); // 通过nio方式来接收连接和处理连接
    private static ServerBootstrap serverBootstrap = new ServerBootstrap();
    public static ChannelFuture f;
    public void run() {
        try {
            serverBootstrap.group(boss, work);
            serverBootstrap.channel(NioServerSocketChannel.class);
            serverBootstrap.childHandler(new NettyServerFilter()); // 设置过滤器
            // 服务器绑定端口监听
            f = serverBootstrap.bind(port).sync();
            System.out.println("NettyServer服务端启动成功,端口是:" + port);
            // 监听服务器关闭监听
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
