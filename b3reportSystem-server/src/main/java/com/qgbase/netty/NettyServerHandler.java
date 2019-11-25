package com.qgbase.netty;


import com.qgbase.netty.WebSocketUtil;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;
import io.netty.util.ReferenceCountUtil;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

/**
 * 
 * @Title: NettyServerHandler
 * @Description: 服务端业务逻辑
 * @Version:1.0.0
 * @author pancm
 * @date 2017年10月8日
 */
@Slf4j
public class NettyServerHandler extends ChannelInboundHandlerAdapter {

	/** 空闲次数 */
	private int idle_count = 1;
	/** 发送次数 */
	private int count = 1;

	/**
	 * 建立连接时，发送一条消息
	 */
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		log.info("连接的客户端地址:" + ctx.channel().remoteAddress());
		WebSocketUtil.sendMessage(new Date() + "连接的客户端地址:" + ctx.channel().remoteAddress());
		super.channelActive(ctx);
	}
	/**
	 * 客户端 失去连接
	 */
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception
	{
		log.info("连接的客户端" + ctx.channel().remoteAddress()+",已经断开连接");
		WebSocketUtil.sendMessage(new Date() + "连接的客户端" + ctx.channel().remoteAddress()+",已经断开连接");
		super.channelInactive(ctx);
	}

	/**
	 * 超时处理 如果5秒没有接受客户端的心跳，就触发; 如果超过两次，则直接关闭;
	 */
	@Override
	public void userEventTriggered(ChannelHandlerContext ctx, Object obj) throws Exception {
		if (obj instanceof IdleStateEvent) {
			IdleStateEvent event = (IdleStateEvent) obj;
			if (IdleState.READER_IDLE.equals(event.state())) { // 如果读通道处于空闲状态，说明没有接收到心跳命令
				if (idle_count > 1) {
					//log.debug("关闭这个不活跃的channel");
					//ctx.channel().close();
				}
				idle_count++;
			}
		} else {
			super.userEventTriggered(ctx, obj);
		}
	}

	/**
	 * 业务逻辑处理
	 */
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
		log.info("第" + count + "次" + ",服务端接受的消息:" + msg);
		try {
			String resultmsg="";
			try {
				resultmsg= new MessageHandle().decode(msg.toString());
			}catch (Exception e){
				System.out.println(e);
				e.printStackTrace();
				resultmsg = new MessageHandle().getError("system error",e.getMessage());
			}
			if(Constant.onOff == 0){
				try {
					ctx.writeAndFlush(resultmsg).sync();
				}catch (Exception e){
					System.out.println(e);
					e.printStackTrace();
					ctx.writeAndFlush("CMD Error 000000000000000000000000000").sync();
				}
			}
			WebSocketUtil.sendMessage(new Date() + "来自"+ctx.channel().remoteAddress()+","+msg+",处理结果"+resultmsg);
		} catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
		} finally {
			ReferenceCountUtil.release(msg);
		}
		count++;
	}

	/**
	 * 异常处理
	 */
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		cause.printStackTrace();
		ctx.close();
	}
}
