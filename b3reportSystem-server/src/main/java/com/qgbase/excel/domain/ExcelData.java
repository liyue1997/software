package com.qgbase.excel.domain;

import com.qgbase.excel.annotation.ExcelColumn;
import com.qgbase.excel.convert.IConverter;
import com.qgbase.util.SpringUtil;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * Author:  cuiwei
 * Date:  2018/5/17
 * Time:  13:58
 */
public class ExcelData {
    private Map<String, Object> data;
    private Map<String, Integer> orderMap;

    private ExcelData() {
        this.data = new HashMap<String, Object>();
        this.orderMap = new HashMap<String, Integer>();
    }

    public static ExcelData getInstance() {
        return new ExcelData();
    }

    public static ExcelData getSimpleExcelData(String key, Object value) {
        ExcelData excelData = new ExcelData();
        excelData.add(key, value);
        return excelData;
    }

    public ExcelData add(String colName, Object obj) {
        data.put(colName, obj);
        orderMap.put(colName, data.size() - 1);
        return this;
    }

    public void setData(HSSFRow row, ExcelColumn excelElement) {
        for (String key : data.keySet()) {
            int orderIndex = orderMap.get(key);
            HSSFCell cell = row.createCell(excelElement.order() -1 + orderMap.get(key));
            cell.setCellValue(data.get(key).toString());
        }
    }

    public static void setDataCell(Field field,Object fieldValue,ExcelColumn excelElement, HSSFRow row) throws Exception {
        Integer order = excelElement.order() - 1;
        field.setAccessible(true);
        HSSFCell cell = row.createCell(order);
        if(fieldValue != null) {
            if (excelElement.convert() != Object.class) {
                IConverter converter = (IConverter) SpringUtil.getBean(excelElement.convert());
                ExcelData ed = converter.transfer(excelElement.columnName(), fieldValue, excelElement.extend1());
                ed.setData(row, excelElement);
            } else {
                cell.setCellValue(fieldValue.toString());
            }
        }else
        {
            cell.setCellValue("");
        }
    }
}
