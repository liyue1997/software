package com.qgbase.excel.annotation;



import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 *
 * Author:  cuiwei
 * Date:  2018/5/15
 * Time:  16:37
 */
@Target({ElementType.FIELD})//作用域是类或者接口
@Retention(RetentionPolicy.RUNTIME)//注解类型：运行时注解
public @interface ExcelColumn {
    String columnName();
    String exportName();
    int order();
    Class convert() default Object.class;
    String convertBean() default "";
    String extend1() default "";
}
