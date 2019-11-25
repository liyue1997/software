package com.qgbase.netty;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * @program: xxkjboot
 * @description: Webscoket配置类
 * @author: zm
 * @create: 2019-03-26 10:53
 **/
@Configuration
public class WebSocketConfig {
    /* *
     * 打包部署的时候需要注释
     * @Author Administrator
     * @Date 下午 3:02 2019/4/22 0022 
     * @Description
     * @return 
     **/
    @Bean
    public ServerEndpointExporter serverEndpointExporter(){
        return new ServerEndpointExporter();
    }

}
