package com.qgbase.util;

import cn.hutool.core.util.StrUtil;

import java.io.PrintWriter;
import java.io.StringWriter;

public class StringUtil extends StrUtil {
    public  static boolean isNotBlankIfStr(Object obj)
    {
        return !StrUtil.isBlankIfStr(obj);
    }
    public static String printStackTraceToString(Throwable t) {
        StringWriter sw = new StringWriter();
        t.printStackTrace(new PrintWriter(sw, true));
        return sw.getBuffer().toString();
    }
}
