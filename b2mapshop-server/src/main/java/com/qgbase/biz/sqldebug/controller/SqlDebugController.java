package com.qgbase.biz.sqldebug.controller;

import com.qgbase.biz.sqldebug.query.SqlDebugQuery;
import com.qgbase.biz.sqldebug.service.SqlDebugService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.annotation.Permission;
import com.qgbase.util.JsonUtil;
import com.qgbase.util.PageControl;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TToolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Created by quangao on 2018/5/16
 * .@author;  zwd
 * Time:  16:44
 * description:主要用于：查询日志数据
 */


@Controller
@RequestMapping("/sql/api")
public class SqlDebugController {
    @Autowired
    SqlDebugQuery sqlDebugQuery;
    @Autowired
    SqlDebugService sqlDebugService;
    @Value("${excel.import.page-max-value}")
    private int pageMax;

    @PostMapping(value = "/query/querySqlDebugList")
    @ResponseBody
    @Permission(moduleCode = "SQLDEBUG", operationCode = "QUERY")
    public PageControl querySqlLog(@RequestParam("queryMap") String queryMap,@RequestParam("page") int page,@RequestParam("len")int len, OperInfo operInfo) {
        return sqlDebugQuery.queryOprLogList((Map)JsonUtil.fromJson(queryMap, Map.class),page,len);
    }

    @PostMapping(value = "/sqldebug/excute")
    @ResponseBody
    @Permission(moduleCode = "SQLDEBUG", operationCode = "QUERY")
    public String exceuteBinLog(@RequestParam("id") String id, OperInfo operInfo) {
        try {
            Object obj = sqlDebugService.exceuteLog(id, operInfo);
            return TToolRequest.ResultSuccess(obj);
        } catch (Exception e) {
            return TToolRequest.Result("-1", "日志执行异常", StringUtil.printStackTraceToString(e));
        }
    }
}
