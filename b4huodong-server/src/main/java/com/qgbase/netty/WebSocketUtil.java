package com.qgbase.netty;

import com.qgbase.netty.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * @program: xxkjboot
 * @description: webSocket
 * @author: zm
 * @create: 2019-03-26 10:32
 **/
@Component
@ServerEndpoint(value = "/websocket")
public class WebSocketUtil {
    private static Logger logger = LoggerFactory.getLogger(WebSocketUtil.class);
    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
    private static CopyOnWriteArraySet<WebSocketUtil> webSocketSet = new CopyOnWriteArraySet<WebSocketUtil>();
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    /**
     * 连接建立成功调用的方法*/
    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
        logger.info("WebSocket连接建立成功!");
    }
    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        Constant.onOff = 1;
        webSocketSet.remove(this);  //从set中删除
        logger.info("WebSocket连接关闭");
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息*/
    @OnMessage
    public void onMessage(String message, Session session) {
        logger.info("接收到来自客户端["+session.getRequestURI()+"]的消息:" + message);
    }

    /**
     * 发生错误时调用
     @OnError
     */
    public void onError(Session session, Throwable error) {
        logger.info("WebSocket发生错误");
        error.printStackTrace();
    }


    public void sendText(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
        logger.debug("WebSocket消息推送,内容："+message);
    }


    /**
     * 群发自定义消息
     * */
    public static void sendMessage(String message) throws IOException {
        for (WebSocketUtil item : webSocketSet) {
            try {
                item.sendText(message);
            } catch (IOException e) {
                logger.error(e.getMessage());
                continue;
            }
        }
    }
}
