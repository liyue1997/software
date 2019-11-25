package com.qgbase.biz.operRecord.service.coverter;

import com.qgbase.config.Constants;
import com.qgbase.excel.convert.IConverter;
import com.qgbase.excel.domain.ExcelData;
import org.springframework.stereotype.Component;

/**
 * Author:  cuiwei
 * Date:  2018/5/22
 * Time:  19:43
 */
@Component
public class OprStatusCoverter implements IConverter<String> {

    @Override
    public ExcelData transfer(String colName, String value, Object... exts) throws Exception {
        String status = "";
        switch (value) {
            case Constants.BIZ_EXCEPTION:
                status = "业务异常";
                break;
            case Constants.SYS_EXCEPTION:
                status = "系统异常";
                break;
            case Constants.SUCCESS:
                status = "成功";
                break;
            default:
                status = "未知状态";
        }
        return ExcelData.getSimpleExcelData(colName,status);
    }
}

