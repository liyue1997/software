package com.qgbase.config.resolver;

import com.qgbase.common.domain.BindVerifyResult;
import com.qgbase.common.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * 验证结果参数注入
 *
 * @author cuiwei
 * @date 2018-5-5
 */
@Component
public class VerifycodeResolver  implements HandlerMethodArgumentResolver {

    @Autowired
    private RedisService redisService;

    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.getParameterType().equals(BindVerifyResult.class);
    }
    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) {
        String verifyCode = nativeWebRequest.getHeader("verifyCode");
        String guestUid = nativeWebRequest.getHeader("guestUid");
        String realVerifyCode = redisService.getValue(guestUid);
        //验证码过期
//        if (StringUtil.isBlankIfStr(realVerifyCode))
//        {
//            return BindVerifyResult.init().withMsgAndCode(EnumResultType.LOGIN_FAILED_VERIFY_EXPIRED).verifyFiled().build();
//        //验证码错误或者验证码为空
//        } else if (StringUtil.isBlankIfStr(verifyCode) || !StrUtil.equals(verifyCode.toUpperCase(), realVerifyCode.toUpperCase()))
//        {
//            return BindVerifyResult.init().withMsgAndCode(EnumResultType.LOGIN_FAILED_VERIFY_ERROR).verifyFiled().build();
//        }
//        else
        {
            return BindVerifyResult.init().verifySuccess().build();
        }
    }
}
