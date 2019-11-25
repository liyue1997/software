package com.qgbase.config.exception;

import org.springframework.security.core.AuthenticationException;

public class TokenAuthException extends AuthenticationException {

    public TokenAuthException() {
        super("令牌校验失败");
    }

    public TokenAuthException(String msg) {
        super(msg);
    }
}
