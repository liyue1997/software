package com.qgbase.biz.operRecord.controller;

import com.qgbase.biz.operRecord.domain.OprLog;
import com.qgbase.biz.operRecord.query.OprQuery;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.annotation.Permission;
import com.qgbase.excel.ExcelExport;
import com.qgbase.util.PageControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.Map;

/**
 * Created by quangao on 2018/5/16
 * .@author;  zwd
 * Time:  16:44
 * description:主要用于：查询日志数据
 */


@Controller
@RequestMapping("/api")
@Transactional(rollbackFor = { Exception.class })
public class OprQueryController {
    @Autowired
    OprQuery oprQuery;
    @Value("${excel.import.page-max-value}")
    private int pageMax;

    @PostMapping(value = "/query/queryOprLogList")
    @ResponseBody
    @Permission(moduleCode = "OPRLOG",operationCode = "QUERY")
    public PageControl queryOprLogList(@RequestBody Map queryMap, OperInfo operInfo) {
        return oprQuery.queryOprLogList(queryMap);
    }
    @PostMapping(value = "/oprlog/exportExcel")
    @Permission(moduleCode = "TMDY",operationCode = "QUERY")
    public void exportExcel(@RequestBody Map queryMap, HttpServletResponse response, OperInfo operInfo) throws Exception {
        int page = 1;
        queryMap.put("page",1);
        queryMap.put("len",pageMax);
        ExcelExport excelExport = new ExcelExport(OprLog.class,pageMax * 10);
        PageControl pc = oprQuery.queryOprLogList(queryMap);
        int total = pc.getTotalitem();
        while (true){
            excelExport.writeRows(pc.getList());
            page++;
            if((page-1) * pageMax + pc.getList().size() >= total)
            {
                break;
            }
        }
        response.reset();
        response.setContentType("application/octet-stream;charset=UTF-8");
        response.setHeader("Pragma", "No-cache");
        OutputStream os = response.getOutputStream();
        excelExport.write2Stream(os);
        os.close();
    }
}
