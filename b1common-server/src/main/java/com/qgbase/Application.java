package com.qgbase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.filter.CharacterEncodingFilter;

import javax.servlet.Filter;

@EntityScan
@SpringBootApplication
@EnableAspectJAutoProxy
public class Application extends SpringBootServletInitializer {

//
//    @Value("${sentry.enable}")
//    private boolean sentrySwitch;

    @Override
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    @Bean
    Filter characterEncodingFilter() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);
        return filter;
    }

    public static void main(String[] args) {
//        if(sentrySwitch) {
//        Sentry.init("http://41e5cd978fcc4bba823d30af9e59e8fc:3e1468053b2c4f0f9e01176a50fb35d0@192.168.117.147:9000/8");
//        }
        SpringApplication.run(Application.class, args);
    }

}
