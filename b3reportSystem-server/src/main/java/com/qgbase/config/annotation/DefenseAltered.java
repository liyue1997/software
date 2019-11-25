package com.qgbase.config.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Author:  cuiwei
 * Date:  2018/5/14
 * Time:  15:24
 */
@Target({ElementType.TYPE})//作用域是类或者接口
@Retention(RetentionPolicy.RUNTIME)//注解类型：运行时注解
public @interface DefenseAltered {
}
