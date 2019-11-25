package com.qgbase.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

/**
 * Created by lbb on 2018/4/25.
 * 主要用于：基本工具类
 */
public class TTool {
    protected static final Logger logger = LoggerFactory.getLogger("TTool");
    /**
     * 获取按北京时间为准的系统时间
     * 如果部署到其它国家，需要修改此方法
     *
     * @return
     */
    public static Date getSystime() {
        return new Date();
    }

    /**
     * 得到字符串系统时间
     *
     * @return
     */
    public static String getDatetimeString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }
    /**
     * 得到字符串系统时间
     *
     * @return
     */
    public static String getDatetimeStringBYEnd(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }
    public static String getDatetimeStringDay(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }
    public static Date getDatetimeStringBYEndD(Date date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd 23:59:59");
        String date1 = sdf.format(date);
        return sdf.parse(date1);
    }
    public static Date getStringToDatetime(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.parse(date);
    }
    /***
     * 两个日期相差多少秒
     *
     * @param date1
     * @param date2
     * @return
     */
    public static int getTimeDelta(Date date1,Date date2){
        long timeDelta=(date1.getTime()-date2.getTime())/1000;//单位是秒
        int secondsDelta=timeDelta>0?(int)timeDelta:(int)Math.abs(timeDelta);
        return secondsDelta;
    }
    /**
     * 获取随机数，前面补足0
     *
     * @param len 随机数长度
     * @return
     */
    public static String getRandom(int len) {
        Random rm = new Random();
        // 获得随机数
        double pross = (1 + rm.nextDouble()) * Math.pow(10, len);
        // 将获得的获得随机数转化为字符串
        String fixLenthString = String.valueOf(pross);
        // 返回固定的长度的随机数
        return fixLenthString.substring(1, len + 1);
    }

    public static void LogInfo(String msg) {
        System.out.println(msg);
        logger.info(msg);
    }
    public static void LogErr(String msg) {
        System.out.println(msg);
        logger.error(msg);
    }
    public static void LogErr(Exception e) {
        System.out.println(e.getMessage());
        logger.error("异常：",e.getMessage());
        logger.error("异常信息：",e);
    }

    /**
     * 截取字符串前 len 位
     *
     * @param prefix
     * @param len
     * @return
     */
    public static String getLen(String prefix, Integer len) {
        if (prefix.length() > len) {
            return prefix.substring(len);
        } else {
            return prefix;
        }
    }

    /**
     * 不够位数的在前面补0，保留num的长度位数字
     *
     * @param code
     * @return
     */
    public static String autoGenericCode(String code, int num) {
        String result = String.format("%0" + num + "d", Integer.parseInt(code) + 1);
        return result;
    }
//    /**
//     * 字段名和查询条件名相同
//     * @return
//     */
//    public Map getSqlParCommon(Map map){
//        Map parameter = new HashMap();
//        for (Object key:map.keySet()){
//
//        }
//    }
    /**
     * 给时间加上几个小时
     * @param date 当前时间
     * @param minute 需要加的分钟
     * @return
     */
    public static Date addDateMinut(Date date, int minute){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MINUTE, minute);// 24小时制
        return  cal.getTime();
    }
    /**
     * 给时间加上几个小时
     * @param date 当前时间
     * @param day 需要加的分钟
     * @return
     */
    public static Date addDateDay(Date date, int day){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, day);// 24小时制
        return  cal.getTime();
    }
}
