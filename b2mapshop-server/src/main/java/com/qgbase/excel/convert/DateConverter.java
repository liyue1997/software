package com.qgbase.excel.convert;

import com.qgbase.excel.domain.ExcelData;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 时间转换
 * Author:  cuiwei
 * Date:  2018/5/17
 * Time:  13:56
 */
@Component
public class DateConverter implements IConverter<Date> {


    @Override
    public ExcelData transfer(String colName, Date value,Object...objects) {
        SimpleDateFormat format = new SimpleDateFormat(objects[0].toString());
        return ExcelData.getSimpleExcelData(colName,format.format(value));
    }
}
