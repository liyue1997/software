package com.qgbase.util;

import cn.jiguang.common.utils.StringUtils;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class SecurityUtil {
    public static String filterBadCharsForAntiSqlInject(Object filedValue1) {

        if (filedValue1 == null) {
            return "";
        }
        String filedValue = filedValue1.toString();
        // filedValueStr = filedValue.toLowerCase();//统一转为小写
       // String badStr = "and|exec|execute|insert|select|delete|update|count|drop|*|%|chr|mid|master|truncate|"
       //         + "char|declare|sitename|net user|xp_cmdshell|;|or|+|,|like'|and|exec|execute|insert|create|drop|"
        //        + "table|from|grant|group_concat|column_name|"
        //        + "information_schema.columns|table_schema|union|where|select|delete|update|order|by|count|*|"
        //        + "chr|mid|master|truncate|char|declare|or|;|--|+|,|like|//|/|%|#";// 过滤掉的sql关键字，可以手动添加
        String badStr = "'";
        String[] badStrs = badStr.split("\\|");
        for (int i = 0; i < badStrs.length; i++) {
            filedValue = filedValue.replace(badStrs[i], "");
        }
        filedValue = filedValue.replace("'", "''");
        return filedValue;
    }
    public static Map filterBadCharsForAntiSqlInject(Map map){
        Map map1 = new HashMap();
        for (Object key:map.keySet()){
            String value = filterBadCharsForAntiSqlInject(map.get(key));
            map1.put(key,value);
        }
        return map1;
    }

    public static  String generateUidWithTimestamp()
    {
        return String.format("%sT%d",UUID.randomUUID().toString().replace("-",""),System.currentTimeMillis());
    }


    /**
     * @Comment SHA1加密密码
     * @Author Ron
     * @Date 2017年9月12日 下午2:46:31
     * @return
     */
    public static String generateSHA(String key) {
        if (StringUtils.isEmpty(key)) {
            return null;
        } else {
            return DigestUtils.sha1Hex(key);
        }
    }


    public static void main(String[] args)
    {
        System.out.println(generateUidWithTimestamp());
    }
}
