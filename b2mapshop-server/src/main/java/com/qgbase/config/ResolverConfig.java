package com.qgbase.config;

import com.qgbase.config.resolver.UserInfoResolver;
import com.qgbase.config.resolver.VerifycodeResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

/**
 * 在aop之前拦截请求的参数配置
 * create by lbb
 */
@Configuration
public class ResolverConfig extends WebMvcConfigurerAdapter {
    @Autowired
    UserInfoResolver userInfoResolver;
    @Autowired
    VerifycodeResolver verifycodeResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(userInfoResolver);
        argumentResolvers.add(verifycodeResolver);
    }
}
