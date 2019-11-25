package com.qgbase.biz.operRecord.query;

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
public class OprQuery {

    @Autowired
    private CommonDao commonDao;

    /**
     * 查询入库单
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryOprLogList(Map queryMap) {
        Map parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select oprid,ip,url,os,work_time,return_value,params,class_name,method_name,username,opr_time,extend1,status,client_uid from t_log_opr ";
        String whereSql = " where 1=1   ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("oprid"))) {
                whereSql += " and oprid like :oprid";
                parameter.put("oprid", "%" + queryMap.get("oprid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("ip"))) {
                whereSql += " and ip like :ip";
                parameter.put("ip", "%" + queryMap.get("ip") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("url"))) {
                whereSql += " and url = :url";
                parameter.put("url", queryMap.get("url"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("os"))) {
                whereSql += " and os = :os";
                parameter.put("os", queryMap.get("os"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_work_time"))) {
                whereSql += " and work_time >= :start_work_time";
                parameter.put("start_work_time", queryMap.get("start_work_time"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_work_time"))) {
                whereSql += " and work_time <= :end_work_time";
                parameter.put("end_work_time", queryMap.get("end_work_time"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("params"))) {
                whereSql += " and params like :params";
                parameter.put("params", "%" + queryMap.get("params") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("return_value"))) {
                whereSql += " and return_value like :return_value";
                parameter.put("return_value", "%" + queryMap.get("return_value") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("class_name"))) {
                whereSql += " and class_name like :class_name";
                parameter.put("class_name", "%" + queryMap.get("class_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("method_name"))) {
                whereSql += " and method_name like :method_name";
                parameter.put("method_name", "%" + queryMap.get("method_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("username"))) {
                whereSql += " and username like :username";
                parameter.put("username", "%" + queryMap.get("username") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("startDate"))) {
                whereSql += " and opr_time >=  str_to_date(:startDate,'%Y-%m-%d %H')";
                parameter.put("startDate", queryMap.get("startDate"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("endDate"))) {
                whereSql += " and opr_time <= str_to_date(:endDate,'%Y-%m-%d %H:%i:%s')";
                parameter.put("endDate", queryMap.get("endDate") + " 23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("extend1"))) {
                whereSql += " and extend1 like :extend1";
                parameter.put("extend1", "%" + queryMap.get("extend1") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("status"))) {
                whereSql += " and status = " + queryMap.get("status");
            }


        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by opr_time desc";
        }
        String count = "select count(*) from (" + sql + ") a ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }
}
