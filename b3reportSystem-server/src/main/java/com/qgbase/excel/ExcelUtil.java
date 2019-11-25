package com.qgbase.excel;

import com.qgbase.common.TBaseBo;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.excel.annotation.ExcelColumn;
import com.qgbase.excel.domain.ExcelData;
import com.qgbase.util.StringUtil;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.*;

/**
 * Author:  cuiwei
 * Date:  2018/5/15
 * Time:  9:18
 */
public class ExcelUtil {

    /**
     * 将List Model导出到Excel
     * @param data
     * @param os
     * @param type
     * @param <T>
     * @throws Exception
     */
    public static <T> void writeWithObj(List<T> data, OutputStream os, Class<T> type) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet();
        writeHead(sheet, type);
        for (int i = 0; i != data.size(); ++i) {
            T instance = data.get(i);
            HSSFRow row = sheet.createRow(i + 1);
            for (Field field : type.getDeclaredFields()) {
                ExcelColumn excelElement = field.getAnnotation(ExcelColumn.class);
                if (excelElement == null) {
                    continue;
                }
                Integer order = excelElement.order() - 1;
                field.setAccessible(true);
                Type fieldType = field.getGenericType();
                HSSFCell cell = row.createCell(order);
                Object fieldValue = field.get(instance);
                if (fieldValue != null) {
                    if (Date.class == fieldType) {
                        cell.setCellValue((Date) fieldValue);
                    } else if (Double.class == fieldType) {
                        cell.setCellValue((Double) fieldValue);
                    } else if (Boolean.class == fieldType) {
                        cell.setCellValue((Boolean) fieldValue);
                    } else if (Integer.class == fieldType) {
                        cell.setCellValue((Integer) fieldValue);
                    }
                } else {
                    cell.setCellValue("");
                }
            }
        }
        workbook.write(os);
        workbook.close();
    }

    /**
     * 将List<Map>导出到Excel
     *
     * @param data
     * @param os
     * @param type
     * @throws Exception
     */
    public static void writeWithMap(List<Map> data, OutputStream os, Class type) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("sheet1");
        writeHead(sheet, type);
        for (int i = 0; i != data.size(); ++i) {
            Map instance = data.get(i);
            HSSFRow row = workbook.getSheet("sheet1").createRow(i + 1);
            for (Field field : type.getDeclaredFields()) {
                ExcelColumn excelElement = field.getAnnotation(ExcelColumn.class);
                if (excelElement == null) {
                    continue;
                }
                Object fieldValue = instance.get(excelElement.exportName());
                ExcelData.setDataCell(field,fieldValue,excelElement,row);
            }
        }
        workbook.write(os);
        workbook.close();
    }

    /**
     * 写表头
     *
     * @param sheet
     * @param type
     */
    public static void writeHead(HSSFSheet sheet, Class type) {
        HSSFRow header = sheet.createRow(0);
        for (Field field : type.getDeclaredFields()) {
            ExcelColumn excelElement = field.getAnnotation(ExcelColumn.class);
            if (excelElement == null) {
                continue;
            }
            Integer order = excelElement.order() - 1;
            if(excelElement.columnName().indexOf("," ) > 0)
            {
                for(String col : excelElement.columnName().split(","))
                {
                    if(StringUtil.isNotBlankIfStr(col))
                    {
                        header.createCell(order).setCellValue(excelElement.columnName());
                        order++;
                    }
                }
            }
            else {
                header.createCell(order).setCellValue(excelElement.columnName());
            }
        }
    }

    /**
     * 将Excel到入成List Model
     *
     * @param excelPath
     * @param type
     * @param <T>
     * @return
     * @throws Exception
     */
    public static <T> List<T> readFrom(String excelPath, Class<T> type,TBaseBo builder, OperInfo opr) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(new File(excelPath)));
        HSSFSheet sheet = null;
        List<T> result = new ArrayList<>();
        sheet = workbook.getSheetAt(0);
        if (sheet.getLastRowNum() > 0) {
            HSSFRow headerRow = sheet.getRow(0);
            if (headerRow == null || headerRow.getLastCellNum() >= 0) {
                List header = new ArrayList();
                for (int i = 0; i < headerRow.getLastCellNum() + 1; i++) {
                    HSSFCell cell = headerRow.getCell(i);
                    if (cell != null) {
                        header.add(cell.getStringCellValue());
                    }
                }
                for (int j = 1; j < sheet.getLastRowNum() + 1; j++) {
                    HSSFRow row = sheet.getRow(j);
                    if (row != null) {
                        Map rowData = new HashMap();
                        for (int k = 0; k < header.size(); k++) {
                            if (row.getCell(k) != null) {
                                rowData.put(header.get(k), row.getCell(k));
                            }
                        }
                        T t = getObj(rowData, type,builder,opr);
                        if (t != null) {
                            result.add(t);
                        }
                    }
                }
            }
        }
        workbook.close();
        return result;
    }

    private static <T> T getObj(Map map, Class<T> type, TBaseBo builder, OperInfo opr) throws Exception {
        T instance = (T)builder.newObj(opr);
//        try {
//            instance = type.getDeclaredConstructor().newInstance();
//        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | InstantiationException e) {
//            e.printStackTrace();
//        }
        for (Field field : type.getDeclaredFields()) {
            ExcelColumn excelRow = field.getAnnotation(ExcelColumn.class);
            if (excelRow != null) {
                String cellName = excelRow.columnName();
                if (map.get(cellName) != null) {
                    field.setAccessible(true);
                    Type fieldType = field.getGenericType();
                    System.out.println(field.getName()+","+ cellName+":"+fieldType.getTypeName());
                    HSSFCell cell = (HSSFCell) map.get(cellName);
                    if (String.class == fieldType) {
                        cell.setCellType(CellType.STRING);
                        field.set(instance, cell.getStringCellValue());
//                    } else if (Date.class == fieldType) {
//                        cell.setCellType(CellType.);
//                        field.set(instance, cell.getDateCellValue());
                    } else if (Double.class == fieldType) {
                        cell.setCellType(CellType.NUMERIC);
                        field.set(instance, cell.getNumericCellValue());
                    } else if (Boolean.class == fieldType) {
                        cell.setCellType(CellType.BOOLEAN);
                        field.set(instance, cell.getBooleanCellValue());
                    } else if (Integer.class == fieldType) {
                        //cell.setCellType(CellType.NUMERIC);
                        cell.setCellType(CellType.STRING);
                        field.set(instance, Integer.parseInt(cell.getStringCellValue()));
                    }
                }
            }
        }
        return instance;
    }
}
