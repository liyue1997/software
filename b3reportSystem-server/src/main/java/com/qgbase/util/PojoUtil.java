package com.qgbase.util;

import java.lang.reflect.Field;

public class PojoUtil {

    public static String getRequestString(Object obj,Class type)
    {
        StringBuilder sb = new StringBuilder();
        for (Field field : type.getDeclaredFields())
        {
            try {
                field.setAccessible(true);
                sb.append(field.getName());
                sb.append("=");
                sb.append(field.get(obj));
                sb.append("&");
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return sb.substring(0,sb.length() - 1);
    }
}
