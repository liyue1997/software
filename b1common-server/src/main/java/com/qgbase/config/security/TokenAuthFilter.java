package com.qgbase.config.security;

import com.qgbase.biz.user.service.TUserService;
import com.qgbase.config.Constants;
import com.qgbase.config.exception.TokenAuthException;
import com.qgbase.util.TToolRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.catalina.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by IntelliJ IDEA 2017.
 * User:lbb
 * Date:2017/8/29
 * Time:16:56
 * attemptAuthentication - 登录时需要验证时候调用
 * successfulAuthentication - 验证成功后调用
 * unsuccessfulAuthentication - 验证失败后调用，这里直接灌入500错误返回，由于同一JSON返回，HTTP就都返回200了
 */
public class TokenAuthFilter extends GenericFilterBean {

    private TUserService tUserService;
    private List<RequestMatcher> matcheres;

    protected TokenAuthFilter(TUserService tUserService, String... urls) {
        this.tUserService = tUserService;
        matcheres = new ArrayList<RequestMatcher>();
        for (String url : urls) {
            matcheres.add(new AntPathRequestMatcher(url));
        }
    }

    private  boolean isMatch(HttpServletRequest req) {
        for (int i = 0; i != matcheres.size(); ++i) {
            if (matcheres.get(i).matches(req)) {
                return true;
            }
        }
        return false;
    }


    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse)res;
        if (!isMatch(request)) {
            filterChain.doFilter(request, res);
        } else {
            String token = request.getHeader(Constants.HEADER_STRING);
            try {
                if (token != null) {
                    // 解析 Token
                    Claims claims = Jwts.parser()
                            // 验签
                            .setSigningKey(Constants.SECRET)
                            // 去掉 Bearer
                            .parseClaimsJws(token.replace(Constants.TOKEN_PREFIX, ""))
                            .getBody();

                    Object obj = tUserService.getObjectByClaims(claims);
                    request.setAttribute("tokenData", obj);
                    request.setAttribute("clientUid",claims.get("uid"));
                    filterChain.doFilter(request, res);
                } else {
                    throw new TokenAuthException();
                }
            }catch(TokenAuthException e)
            {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write(TToolRequest.ResultException("403", e.getMessage()));
                response.getWriter().close();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
