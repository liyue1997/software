package com.qgbase.config.resolver;

import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.TTool;
import com.qgbase.util.TToolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

/**
 * 用于拦截参数，返回拦截后修改的参数
 */
@Component
public class UserInfoResolver implements HandlerMethodArgumentResolver {


    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.getParameterType().equals(OperInfo.class);
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
        HttpServletRequest request = nativeWebRequest.getNativeRequest(HttpServletRequest.class);
        OperInfo oper = new OperInfo();
        Object obj = request.getAttribute("tokenData");
        //这里不应该为空的，前面就处理了
        //方法内有 oper 这个参数的才会走这里，游客不应该走这里
        if (obj != null) {
            oper.setCurrentUser((TUser) obj);
            //oper.subwareCode = tUserInfoService.getWareCode(oper.getCurrentUser().getUserId());
        }
        Object clientUid = request.getAttribute("clientUid");
        if (clientUid != null) {
            oper.clientUid = clientUid + "";
        }
        oper.lastIp = TToolRequest.getClientIp(request);
        oper.lastOs = TToolRequest.getOsInfo(nativeWebRequest.getHeader("User-Agent"));
        oper.lastTime = TTool.getSystime();
        return oper;
    }
}