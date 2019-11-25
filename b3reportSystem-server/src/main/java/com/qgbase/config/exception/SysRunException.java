package com.qgbase.config.exception;

import com.qgbase.common.enumeration.EnumResultType;
import com.qgbase.util.JsonUtil;

/**
 * Created by lbb on 2018/4/27.
 * 主要用于：自定义系统程序异常
 */
public class SysRunException extends RuntimeException {
    private String code;
    private StringBuilder debug;

    public SysRunException(String code, String msg, Object... debugs) {
        super(msg);
        this.code = code;
        this.debug = new StringBuilder();
        if (debugs != null && debugs.length > 0) {
            for (int i = 0; i != debugs.length; ++i) {
                debug.append(JsonUtil.toJson(debugs[0]));
                if (i != debugs.length - 1) {
                    debug.append("\n\r");
                }
            }
        }
    }

    public SysRunException(EnumResultType type, Object... debugs) {
        super(type.getMsg());
        this.code = type.getCode();
        this.debug = new StringBuilder();
        if (debugs != null && debugs.length > 0) {
            for (int i = 0; i != debugs.length; ++i) {
                debug.append(JsonUtil.toJson(debugs[0]));
                if (i != debugs.length - 1) {
                    debug.append("\n\r");
                }
            }
        }
    }

    public String getCode() {
        return code;
    }

    public String getDebug() {
        return debug.toString();
    }
}
