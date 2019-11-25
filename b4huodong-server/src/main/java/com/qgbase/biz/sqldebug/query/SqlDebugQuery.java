package com.qgbase.biz.sqldebug.query;

import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.QueryPOB;
import com.qgbase.util.PageControl;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by quangao on 2018/5/16
 * .@author;  zwd
 * Time:  16:21
 * description:
 */
@Repository
public class SqlDebugQuery {

    @Autowired
    private CommonDao commonDao;

    /**
     * 查询入库单
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryOprLogList(Map queryMap,int page ,int len) {
        Map parameter = new HashMap();
        queryMap.put("page",page);
        queryMap.put("len",len);
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "SELECT log_id,fsql,fparams,work_time,create_date,returns FROM t_log_sql ";
        String whereSql = " where 1=1   ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("option"))) {
                whereSql += " and (fsql like :option";
                parameter.put("option", "%" + queryMap.get("option") + "%");
                whereSql += " or fparams like :option)";
                parameter.put("option", "%" + queryMap.get("option") + "%");
            }
        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by create_date desc";
        }
        String count = "select count(*) from (" + sql + ") a ";
        PageControl pc = commonDao.getDataBySqlNoLog(count, sql, page,len, parameter);
        return pc;
    }
}
