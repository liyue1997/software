package com.qgbase.excel.convert;

import com.qgbase.excel.domain.ExcelData;

/**
 * Author:  cuiwei
 * Date:  2018/5/17
 * Time:  15:22
 */
public class StringConverter implements IConverter<String> {
    @Override
    public ExcelData transfer(String colName, String value,Object...objects) {
        return ExcelData.getSimpleExcelData(colName,value);
    }
}
