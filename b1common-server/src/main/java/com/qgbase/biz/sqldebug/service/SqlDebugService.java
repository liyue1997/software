package com.qgbase.biz.sqldebug.service;

import com.qgbase.biz.sqldebug.domain.LogSql;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.domain.QueryPOB;
import com.qgbase.util.JsonUtil;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by lbb on 2018/5/14.
 * 主要用于：操作日志处理
 */
@Service
public class SqlDebugService  {
    @Autowired
    CommonDao commonDao;


    public Object exceuteLog(String id, OperInfo operInfo) throws Exception {
        LogSql logSql = (LogSql)commonDao.get(LogSql.class,id);
        if (StringUtil.startWith(logSql.getFparams(), "[")) {
            Object[] params = (Object[]) JsonUtil.fromJson(logSql.getFparams(), Object[].class);
            return commonDao.getSqlNoLog(logSql.getFsql(), params);

        } else if (StringUtil.startWith(logSql.getFparams(), "{")) {
            Map params = (Map) JsonUtil.fromJson(logSql.getFparams(), Map.class);
            QueryPOB queryPOB = new QueryPOB(params);
            String count = "select count(*) from (" + logSql.getFsql() + ") a ";
            return commonDao.getDataBySqlNoLog(count, logSql.getFsql(), queryPOB.getPage(), queryPOB.getLen(), params);
        }
        return null;

    }
}
