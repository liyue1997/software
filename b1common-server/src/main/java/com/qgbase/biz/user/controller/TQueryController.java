package com.qgbase.biz.user.controller;

import com.qgbase.biz.user.query.TQuery;
import com.qgbase.biz.user.query.TuserQuery;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.annotation.Permission;
import com.qgbase.util.PageControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created by lbb on 2018/4/27.
 * 主要用于：查询列表数据或复杂查询处理
 */
@Controller
@RequestMapping(value = "/api/query")
public class TQueryController {
    @Autowired
    TQuery tQuery;
    @Value("${excel.import.page-max-value}")
    private int pageMax;
    @Autowired
    TuserQuery userQuery;

    @PostMapping(value = "/getUserList")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL",operationCode = "QUERY")
    public PageControl getUserList(@RequestBody Map queryMap,OperInfo operInfo){
        return tQuery.queryTUserList(queryMap);
    }

}
