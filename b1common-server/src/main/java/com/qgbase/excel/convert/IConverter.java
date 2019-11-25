package com.qgbase.excel.convert;

import com.qgbase.excel.annotation.ExcelColumn;
import com.qgbase.excel.domain.ExcelData;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

/**
 * Author:  cuiwei
 * Date:  2018/5/17
 * Time:  13:55
 */
public interface IConverter<T> {
    ExcelData transfer(String colName, T value,Object...exts) throws Exception;
     static IConverter buildConverter(ExcelColumn column) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        Class type = column.convert();
        String args = column.extend1();
        IConverter converter = null;
        if (!"".equals(args)) {
            Constructor<?> cons = type.getConstructor(String.class);
            converter = (IConverter) cons.newInstance(args);
        } else {
            converter = (IConverter) type.newInstance();
        }
        return converter;

    }
}
