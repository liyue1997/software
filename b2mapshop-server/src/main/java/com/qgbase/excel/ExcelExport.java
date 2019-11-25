package com.qgbase.excel;

import com.qgbase.excel.annotation.ExcelColumn;
import com.qgbase.excel.domain.ExcelData;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Author:  cuiwei
 * Date:  2018/5/17
 * Time:  15:16
 */
public class ExcelExport {
    HSSFWorkbook workbook;
    Map<String, Integer> sheetPorcess;
    Class type;
    Integer maxSheetSize;
    HSSFSheet curSheet;

    public ExcelExport(Class type, Integer maxSheetSize) throws IOException {
        this.workbook = new HSSFWorkbook();
        this.sheetPorcess = new HashMap();
        this.type = type;
        this.maxSheetSize = maxSheetSize;
        this.curSheet = createSheet();
    }


    public HSSFSheet createSheet() {
        HSSFSheet sheet = workbook.createSheet("sheet" + (sheetPorcess.size() + 1));
        sheetPorcess.put(sheet.getSheetName(), 1);
        ExcelUtil.writeHead(sheet,type);
        return sheet;
    }

    public void writeRows(List<Map> list) throws Exception {

        if (list != null && list.size() > 0) {
            for (Map map : list) {
                writeRow(map);
            }
        }
    }

    public void writeRow(Map map) throws Exception {
        int order = sheetPorcess.get(curSheet.getSheetName());
        if (order >= maxSheetSize) {
            curSheet = createSheet();
            order = 1;
        }
        HSSFRow row = curSheet.createRow(order);
        for (Field field : type.getDeclaredFields()) {
            ExcelColumn excelElement = field.getAnnotation(ExcelColumn.class);
            if (excelElement == null) {
                continue;
            }
            Object fieldValue = map.get(excelElement.exportName());
            ExcelData.setDataCell(field, fieldValue, excelElement, row);
        }
        sheetPorcess.put(curSheet.getSheetName(), ++order);
    }

    public void write2Stream(OutputStream os) throws IOException {
        workbook.write(os);
    }


}
