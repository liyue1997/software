package com.qgbase.excel.convert;

import com.qgbase.excel.domain.ExcelData;
import org.springframework.stereotype.Component;

/**
 * Author:  cuiwei
 * Date:  2018/5/21
 * Time:  19:16
 */
@Component
public class IsNoCoverter implements  IConverter<Integer>{


    @Override
    public ExcelData transfer(String colName, Integer value, Object... exts) throws Exception {
        String res = "否";
        if(new Integer(1).equals(value))
        {
            res = "是";
        }
        return ExcelData.getSimpleExcelData(colName,res);
    }
}
