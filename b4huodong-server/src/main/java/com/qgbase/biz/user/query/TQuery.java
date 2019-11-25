package com.qgbase.biz.user.query;

import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.QueryPOB;
import com.qgbase.util.PageControl;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class TQuery {
    @Autowired
    private CommonDao commonDao;
    /**
     * 查询用户列表
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryTUserList(Map queryMap)
    {
        Map parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "SELECT" +
                "  a.user_id," +
                "  a.username," +
                "  a.user_account," +
                "  a.role_id," +
                "  a.last_time," +
                "  a.last_os," +
                "  a.create_user," +
                "  a.modify_user," +
                "  a.create_date," +
                "  a.modify_date," +
                "  a.last_ip," +
                "  a.user_status" +
                "  FROM ts_user a";
        String whereSql = " where 1=1 ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("username"))) {
                whereSql += " and a.username like :username";
                parameter.put("username","%" + queryMap.get("username") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("userAccount"))) {
                whereSql += " and a.user_account like :userAccount";
                parameter.put("userAccount","%" + queryMap.get("userAccount") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("startDate"))) {
                whereSql += " and a.create_date >= str_to_date(:startDate,'yyyy-MM-dd')";
                parameter.put("startDate",queryMap.get("startDate"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("endDate"))) {
                whereSql += " and a.create_date <= str_to_date(:endDate,'yyyy-MM-dd %H:%i:%s')";
                parameter.put("endDate",queryMap.get("endDate")+"23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("userStatus"))) {
                whereSql += " and a.user_status = :userStatus";
                parameter.put("userStatus",queryMap.get("userStatus"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("roleId"))) {
                whereSql += " and a.role_id = :roleId";
                parameter.put("roleId",queryMap.get("roleId"));
            }
        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp())&&StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())){
            sql += whereSql + " order by "+queryPOB.getColumnProp()+" "+queryPOB.getColumnOrder();
        }else{
            sql += whereSql + " order by a.user_id desc";
        }
        String count = "select count(*) from (" + sql + ") a ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(),queryPOB.getLen(),parameter);
        return pc;
    }
    public PageControl getCheckTUserData(Map queryMap){
        Map parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select user_id,realname,create_date,create_user,dept_id,email,identity,modify_date,phone,mobile,resign,modify_user from ts_userinfo " +
                "where user_id not IN (select user_id from ts_user) limit 0 1000";
        if (null != queryMap && queryMap.size() > 0) {

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp())&&StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())){
            sql += " order by "+queryPOB.getColumnProp()+" "+queryPOB.getColumnOrder();
        }else{
            sql += " order by a.user_id desc";
        }
        String count = "select count(*) from (" + sql + ") a ";

        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(),parameter);
        return pc;
    }

}
