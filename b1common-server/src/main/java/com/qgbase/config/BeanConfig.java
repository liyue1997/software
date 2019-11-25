package com.qgbase.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Author:  cuiwei
 * Date:  2018/5/15
 * Time:  10:55
 */
@Configuration
public class BeanConfig {
    @Bean
    OperLogRecorder operLogRecorder()
    {
        OperLogRecorder operLogRecorder = new OperLogRecorder();
        return operLogRecorder;
    }
}
