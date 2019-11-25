package com.qgbase.config.security;

import com.qgbase.biz.user.service.TUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    TUserService tUserService;


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin").password("123456").roles("USER");
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/test/**", "/permission/login", "/auth/**", "swagger-ui**","/druid/**").permitAll()
                .antMatchers("/permission/**").authenticated()
                .and()
                .formLogin()
                .loginPage("/permission/login")
                .failureUrl("/permission/login")
                .defaultSuccessUrl("/permission/main")
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and().addFilterBefore(new TokenAuthFilter(tUserService, "/api/**"),
                UsernamePasswordAuthenticationFilter.class).headers().frameOptions().sameOrigin();

    }

    @Override
    public void configure(WebSecurity web) {
        //解决静态资源被拦截的问题
        web.ignoring().antMatchers("/logo/**", "/res/**", "/thirdparty/**", "/api/storage/f/*");
    }
}
