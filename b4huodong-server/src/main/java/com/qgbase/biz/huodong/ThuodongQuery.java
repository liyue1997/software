package com.qgbase.biz.huodong;


import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.domain.QueryPOB;
import com.qgbase.config.Constants;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.util.PageControl;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ThuodongQuery {
    @Autowired
    private CommonDao commonDao;


    public Map handleRole(Map queryMap, OperInfo operInfo,String opname) throws Exception {
        switch (operInfo.getCurrentUser().getRoleId()) {
            case Constants.role_admin://管理员
                break;
            case Constants.role_manage://管理员
                break;
            case Constants.role_shop://管理员
                String shop_id=  commonDao.getSqlone("select shop_id from hd_shopuser u where  u.user_id=?" , operInfo.getCurrentUser().getUserId());
                queryMap.put("shop_id",shop_id);
                break;

            default:
                break;

        }
        return queryMap;
    }

    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 代理商 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdDlsList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdDlsList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.dls_id"
                + ",a.dls_name,a.dls_fullname,a.dls_lon,a.dls_lat,a.zone_code"
                + ",a.dls_address,a.dls_hetong,a.dls_tel,a.dls_status,a.create_user"
                + ",a.create_date,a.modify_user,a.modify_date from hd_dls a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_id"))) {
                whereSql += " and a.dls_id = :dls_id";
                parameter.put("dls_id", queryMap.get("dls_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_name"))) {
                whereSql += " and a.dls_name like :dls_name";
                parameter.put("dls_name", "%" + queryMap.get("dls_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_fullname"))) {
                whereSql += " and a.dls_fullname like :dls_fullname";
                parameter.put("dls_fullname", "%" + queryMap.get("dls_fullname") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_lon"))) {
                whereSql += " and a.dls_lon like :dls_lon";
                parameter.put("dls_lon", "%" + queryMap.get("dls_lon") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_lat"))) {
                whereSql += " and a.dls_lat like :dls_lat";
                parameter.put("dls_lat", "%" + queryMap.get("dls_lat") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_code"))) {
                whereSql += " and a.zone_code like :zone_code";
                parameter.put("zone_code", "%" + queryMap.get("zone_code") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_address"))) {
                whereSql += " and a.dls_address like :dls_address";
                parameter.put("dls_address", "%" + queryMap.get("dls_address") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_hetong"))) {
                whereSql += " and a.dls_hetong like :dls_hetong";
                parameter.put("dls_hetong", "%" + queryMap.get("dls_hetong") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_tel"))) {
                whereSql += " and a.dls_tel like :dls_tel";
                parameter.put("dls_tel", "%" + queryMap.get("dls_tel") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_status"))) {
                whereSql += " and a.dls_status = :dls_status";
                parameter.put("dls_status", queryMap.get("dls_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 对账单 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdDzList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdDzList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.jz_order_id"
                + ",a.huodong_id,a.shop_id,a.user_count,a.pay_money,a.pay_fee"
                + ",a.pay_needmoney,a.pay_realmoney,a.pay_time,a.pay_user,a.pay_order"
                + ",a.pay_type,a.payr_demo,a.create_user,a.create_date,a.modify_user"
                + ",a.modify_date from hd_dz a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("jz_order_id"))) {
                whereSql += " and a.jz_order_id = :jz_order_id";
                parameter.put("jz_order_id", queryMap.get("jz_order_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_id"))) {
                whereSql += " and a.huodong_id = :huodong_id";
                parameter.put("huodong_id", queryMap.get("huodong_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_user_count"))) {
                whereSql += " and a.user_count >= :start_user_count ";
                parameter.put("start_user_count", queryMap.get("start_user_count"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_user_count"))) {
                whereSql += " and a.user_count <= :end_user_count ";
                parameter.put("end_user_count", queryMap.get("end_user_count"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_pay_money"))) {
                whereSql += " and a.pay_money >= :start_pay_money ";
                parameter.put("start_pay_money", queryMap.get("start_pay_money"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_pay_money"))) {
                whereSql += " and a.pay_money <= :end_pay_money ";
                parameter.put("end_pay_money", queryMap.get("end_pay_money"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_pay_fee"))) {
                whereSql += " and a.pay_fee >= :start_pay_fee ";
                parameter.put("start_pay_fee", queryMap.get("start_pay_fee"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_pay_fee"))) {
                whereSql += " and a.pay_fee <= :end_pay_fee ";
                parameter.put("end_pay_fee", queryMap.get("end_pay_fee"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_pay_needmoney"))) {
                whereSql += " and a.pay_needmoney >= :start_pay_needmoney ";
                parameter.put("start_pay_needmoney", queryMap.get("start_pay_needmoney"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_pay_needmoney"))) {
                whereSql += " and a.pay_needmoney <= :end_pay_needmoney ";
                parameter.put("end_pay_needmoney", queryMap.get("end_pay_needmoney"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_pay_realmoney"))) {
                whereSql += " and a.pay_realmoney >= :start_pay_realmoney ";
                parameter.put("start_pay_realmoney", queryMap.get("start_pay_realmoney"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_pay_realmoney"))) {
                whereSql += " and a.pay_realmoney <= :end_pay_realmoney ";
                parameter.put("end_pay_realmoney", queryMap.get("end_pay_realmoney"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_pay_time"))) {
                whereSql += " and a.pay_time >= str_to_date(:start_pay_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_pay_time", queryMap.get("start_pay_time") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_pay_time"))) {
                whereSql += " and a.pay_time <= str_to_date(:end_pay_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_pay_time", queryMap.get("end_pay_time") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("pay_user"))) {
                whereSql += " and a.pay_user like :pay_user";
                parameter.put("pay_user", "%" + queryMap.get("pay_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("pay_order"))) {
                whereSql += " and a.pay_order like :pay_order";
                parameter.put("pay_order", "%" + queryMap.get("pay_order") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("pay_type"))) {
                whereSql += " and a.pay_type = :pay_type";
                parameter.put("pay_type", queryMap.get("pay_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("payr_demo"))) {
                whereSql += " and a.payr_demo like :payr_demo";
                parameter.put("payr_demo", "%" + queryMap.get("payr_demo") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 活动 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdHuodongList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdHuodongList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.huodong_id"
                + ",a.huodong_name,a.huodong_pre,a.huodong_module,a.huodong_title,a.huodong_subtitle"
                + ",a.start_time,a.end_time,a.is_needpay,a.pay_money,a.pay_fee"
                + ",a.user_limit,a.huodong_status,a.huodong_demo,a.create_user,a.create_date"
                + ",a.modify_user,a.modify_date from hd_huodong a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_id"))) {
                whereSql += " and a.huodong_id = :huodong_id";
                parameter.put("huodong_id", queryMap.get("huodong_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_name"))) {
                whereSql += " and a.huodong_name like :huodong_name";
                parameter.put("huodong_name", "%" + queryMap.get("huodong_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_pre"))) {
                whereSql += " and a.huodong_pre like :huodong_pre";
                parameter.put("huodong_pre", "%" + queryMap.get("huodong_pre") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_module"))) {
                whereSql += " and a.huodong_module like :huodong_module";
                parameter.put("huodong_module", "%" + queryMap.get("huodong_module") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_title"))) {
                whereSql += " and a.huodong_title like :huodong_title";
                parameter.put("huodong_title", "%" + queryMap.get("huodong_title") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_subtitle"))) {
                whereSql += " and a.huodong_subtitle like :huodong_subtitle";
                parameter.put("huodong_subtitle", "%" + queryMap.get("huodong_subtitle") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_start_time"))) {
                whereSql += " and a.start_time >= str_to_date(:start_start_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_start_time", queryMap.get("start_start_time") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_start_time"))) {
                whereSql += " and a.start_time <= str_to_date(:end_start_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_start_time", queryMap.get("end_start_time") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_end_time"))) {
                whereSql += " and a.end_time >= str_to_date(:start_end_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_end_time", queryMap.get("start_end_time") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_end_time"))) {
                whereSql += " and a.end_time <= str_to_date(:end_end_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_end_time", queryMap.get("end_end_time") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("is_needpay"))) {
                whereSql += " and a.is_needpay = :is_needpay";
                parameter.put("is_needpay", queryMap.get("is_needpay"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_pay_money"))) {
                whereSql += " and a.pay_money >= :start_pay_money ";
                parameter.put("start_pay_money", queryMap.get("start_pay_money"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_pay_money"))) {
                whereSql += " and a.pay_money <= :end_pay_money ";
                parameter.put("end_pay_money", queryMap.get("end_pay_money"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_pay_fee"))) {
                whereSql += " and a.pay_fee >= :start_pay_fee ";
                parameter.put("start_pay_fee", queryMap.get("start_pay_fee"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_pay_fee"))) {
                whereSql += " and a.pay_fee <= :end_pay_fee ";
                parameter.put("end_pay_fee", queryMap.get("end_pay_fee"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_user_limit"))) {
                whereSql += " and a.user_limit >= :start_user_limit ";
                parameter.put("start_user_limit", queryMap.get("start_user_limit"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_user_limit"))) {
                whereSql += " and a.user_limit <= :end_user_limit ";
                parameter.put("end_user_limit", queryMap.get("end_user_limit"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_status"))) {
                whereSql += " and a.huodong_status = :huodong_status";
                parameter.put("huodong_status", queryMap.get("huodong_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_demo"))) {
                whereSql += " and a.huodong_demo like :huodong_demo";
                parameter.put("huodong_demo", "%" + queryMap.get("huodong_demo") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 活动门店 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdHuodong2shopList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdHuodong2shopList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.huodong_id"
                + ",a.shop_id,a.huodong_title,a.huodong_subtitle,a.user_limit,a.huodong_status"
                + ",a.huodong_demo,a.huodong_url,a.create_user,a.create_date,a.modify_user"
                + ",a.modify_date from hd_huodong2shop a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_id"))) {
                whereSql += " and a.huodong_id = :huodong_id";
                parameter.put("huodong_id", queryMap.get("huodong_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_title"))) {
                whereSql += " and a.huodong_title like :huodong_title";
                parameter.put("huodong_title", "%" + queryMap.get("huodong_title") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_subtitle"))) {
                whereSql += " and a.huodong_subtitle like :huodong_subtitle";
                parameter.put("huodong_subtitle", "%" + queryMap.get("huodong_subtitle") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_user_limit"))) {
                whereSql += " and a.user_limit >= :start_user_limit ";
                parameter.put("start_user_limit", queryMap.get("start_user_limit"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_user_limit"))) {
                whereSql += " and a.user_limit <= :end_user_limit ";
                parameter.put("end_user_limit", queryMap.get("end_user_limit"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_status"))) {
                whereSql += " and a.huodong_status = :huodong_status";
                parameter.put("huodong_status", queryMap.get("huodong_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_demo"))) {
                whereSql += " and a.huodong_demo like :huodong_demo";
                parameter.put("huodong_demo", "%" + queryMap.get("huodong_demo") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_url"))) {
                whereSql += " and a.huodong_url like :huodong_url";
                parameter.put("huodong_url", "%" + queryMap.get("huodong_url") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 活动用户 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdHuodong2userList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdHuodong2userList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.huodonguser_id"
                + ",a.huodong_id,a.user_id,a.shop_id,a.user_car,a.user_phone"
                + ",a.user_cartype,a.info_status,a.pay_status,a.pay_order,a.pay_type,a.user_name"
                + ",a.pay_time,a.user_demo,a.hx_time,a.hx_user,a.jz_order,a.pay_money,a.pay_fee"
                + ",a.create_user,a.create_date,a.modify_user,a.modify_date from hd_huodong2user a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodonguser_id"))) {
                whereSql += " and a.huodonguser_id = :huodonguser_id";
                parameter.put("huodonguser_id", queryMap.get("huodonguser_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("huodong_id"))) {
                whereSql += " and a.huodong_id = :huodong_id";
                parameter.put("huodong_id", queryMap.get("huodong_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_car"))) {
                whereSql += " and a.user_car like :user_car";
                parameter.put("user_car", "%" + queryMap.get("user_car") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_phone"))) {
                whereSql += " and a.user_phone like :user_phone";
                parameter.put("user_phone", "%" + queryMap.get("user_phone") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_cartype"))) {
                whereSql += " and a.user_cartype like :user_cartype";
                parameter.put("user_cartype", "%" + queryMap.get("user_cartype") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("info_status"))) {
                whereSql += " and a.info_status = :info_status";
                parameter.put("info_status", queryMap.get("info_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("pay_status"))) {
                whereSql += " and a.pay_status = :pay_status";
                parameter.put("pay_status", queryMap.get("pay_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("pay_order"))) {
                whereSql += " and a.pay_order like :pay_order";
                parameter.put("pay_order", "%" + queryMap.get("pay_order") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("pay_type"))) {
                whereSql += " and a.pay_type = :pay_type";
                parameter.put("pay_type", queryMap.get("pay_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_pay_time"))) {
                whereSql += " and a.pay_time >= str_to_date(:start_pay_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_pay_time", queryMap.get("start_pay_time") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_pay_time"))) {
                whereSql += " and a.pay_time <= str_to_date(:end_pay_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_pay_time", queryMap.get("end_pay_time") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_demo"))) {
                whereSql += " and a.user_demo like :user_demo";
                parameter.put("user_demo", "%" + queryMap.get("user_demo") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_hx_time"))) {
                whereSql += " and a.hx_time >= str_to_date(:start_hx_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_hx_time", queryMap.get("start_hx_time") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_hx_time"))) {
                whereSql += " and a.hx_time <= str_to_date(:end_hx_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_hx_time", queryMap.get("end_hx_time") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("hx_user"))) {
                whereSql += " and a.hx_user like :hx_user";
                parameter.put("hx_user", "%" + queryMap.get("hx_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("jz_order"))) {
                whereSql += " and a.jz_order like :jz_order";
                parameter.put("jz_order", "%" + queryMap.get("jz_order") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 门店 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdShopList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdShopList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.shop_id"
                + ",a.shop_pre,a.shop_name,a.shop_fullname,a.shop_lon,a.shop_lat"
                + ",a.zone_code,a.shop_address,a.shop_hetong,a.shop_tel,a.shop_status"
                + ",a.dls_id,a.yw_user_id,a.hk_speed,a.shop_level,a.create_user"
                + ",a.create_date,a.modify_user,a.modify_date from hd_shop a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_pre"))) {
                whereSql += " and a.shop_pre like :shop_pre";
                parameter.put("shop_pre", "%" + queryMap.get("shop_pre") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_name"))) {
                whereSql += " and a.shop_name like :shop_name";
                parameter.put("shop_name", "%" + queryMap.get("shop_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_fullname"))) {
                whereSql += " and a.shop_fullname like :shop_fullname";
                parameter.put("shop_fullname", "%" + queryMap.get("shop_fullname") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_lon"))) {
                whereSql += " and a.shop_lon like :shop_lon";
                parameter.put("shop_lon", "%" + queryMap.get("shop_lon") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_lat"))) {
                whereSql += " and a.shop_lat like :shop_lat";
                parameter.put("shop_lat", "%" + queryMap.get("shop_lat") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_code"))) {
                whereSql += " and a.zone_code like :zone_code";
                parameter.put("zone_code", "%" + queryMap.get("zone_code") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_address"))) {
                whereSql += " and a.shop_address like :shop_address";
                parameter.put("shop_address", "%" + queryMap.get("shop_address") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_hetong"))) {
                whereSql += " and a.shop_hetong like :shop_hetong";
                parameter.put("shop_hetong", "%" + queryMap.get("shop_hetong") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_tel"))) {
                whereSql += " and a.shop_tel like :shop_tel";
                parameter.put("shop_tel", "%" + queryMap.get("shop_tel") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_status"))) {
                whereSql += " and a.shop_status = :shop_status";
                parameter.put("shop_status", queryMap.get("shop_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_id"))) {
                whereSql += " and a.dls_id = :dls_id";
                parameter.put("dls_id", queryMap.get("dls_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("yw_user_id"))) {
                whereSql += " and a.yw_user_id = :yw_user_id";
                parameter.put("yw_user_id", queryMap.get("yw_user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("hk_speed"))) {
                whereSql += " and a.hk_speed like :hk_speed";
                parameter.put("hk_speed", "%" + queryMap.get("hk_speed") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_level"))) {
                whereSql += " and a.shop_level like :shop_level";
                parameter.put("shop_level", "%" + queryMap.get("shop_level") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 门店用户 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdShopuserList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdShopuserList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.user_id"
                + ",a.user_name,a.user_number,a.user_phone,a.shop_id,a.shop_user_type"
                + ",a.zone_code,a.user_tel,a.user_qq,a.is_active,a.create_date"
                + ",a.create_user,a.modify_date,a.modify_user from hd_shopuser a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_name"))) {
                whereSql += " and a.user_name like :user_name";
                parameter.put("user_name", "%" + queryMap.get("user_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_number"))) {
                whereSql += " and a.user_number like :user_number";
                parameter.put("user_number", "%" + queryMap.get("user_number") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_phone"))) {
                whereSql += " and a.user_phone like :user_phone";
                parameter.put("user_phone", "%" + queryMap.get("user_phone") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_user_type"))) {
                whereSql += " and a.shop_user_type = :shop_user_type";
                parameter.put("shop_user_type", queryMap.get("shop_user_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_code"))) {
                whereSql += " and a.zone_code like :zone_code";
                parameter.put("zone_code", "%" + queryMap.get("zone_code") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_tel"))) {
                whereSql += " and a.user_tel like :user_tel";
                parameter.put("user_tel", "%" + queryMap.get("user_tel") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_qq"))) {
                whereSql += " and a.user_qq like :user_qq";
                parameter.put("user_qq", "%" + queryMap.get("user_qq") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("is_active"))) {
                whereSql += " and a.is_active = :is_active";
                parameter.put("is_active", queryMap.get("is_active"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 门店用户 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdUserList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdUserList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.user_id"
                + ",a.user_name,a.user_car,a.user_phone,a.user_level,a.zone_code"
                + ",a.user_tel,a.user_weixinid,a.user_nick,a.user_cartype,a.is_active"
                + ",a.create_date,a.create_user,a.modify_date,a.modify_user from hd_user a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_name"))) {
                whereSql += " and a.user_name like :user_name";
                parameter.put("user_name", "%" + queryMap.get("user_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_car"))) {
                whereSql += " and a.user_car like :user_car";
                parameter.put("user_car", "%" + queryMap.get("user_car") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_phone"))) {
                whereSql += " and a.user_phone like :user_phone";
                parameter.put("user_phone", "%" + queryMap.get("user_phone") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_level"))) {
                whereSql += " and a.user_level like :user_level";
                parameter.put("user_level", "%" + queryMap.get("user_level") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_code"))) {
                whereSql += " and a.zone_code like :zone_code";
                parameter.put("zone_code", "%" + queryMap.get("zone_code") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_tel"))) {
                whereSql += " and a.user_tel like :user_tel";
                parameter.put("user_tel", "%" + queryMap.get("user_tel") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_weixinid"))) {
                whereSql += " and a.user_weixinid like :user_weixinid";
                parameter.put("user_weixinid", "%" + queryMap.get("user_weixinid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_nick"))) {
                whereSql += " and a.user_nick like :user_nick";
                parameter.put("user_nick", "%" + queryMap.get("user_nick") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_cartype"))) {
                whereSql += " and a.user_cartype like :user_cartype";
                parameter.put("user_cartype", "%" + queryMap.get("user_cartype") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("is_active"))) {
                whereSql += " and a.is_active = :is_active";
                parameter.put("is_active", queryMap.get("is_active"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-29
     * 主要用于：查询 区域 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdZoneList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdZoneList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.zone_code"
                + ",a.zone_name,a.zone_fullname,a.zone_lon,a.zone_lat,a.zone_level"
                + ",a.create_user,a.create_date,a.modify_user,a.modify_date from hd_zone a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_code"))) {
                whereSql += " and a.zone_code like :zone_code";
                parameter.put("zone_code", "%" + queryMap.get("zone_code") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_name"))) {
                whereSql += " and a.zone_name like :zone_name";
                parameter.put("zone_name", "%" + queryMap.get("zone_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_fullname"))) {
                whereSql += " and a.zone_fullname like :zone_fullname";
                parameter.put("zone_fullname", "%" + queryMap.get("zone_fullname") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_lon"))) {
                whereSql += " and a.zone_lon like :zone_lon";
                parameter.put("zone_lon", "%" + queryMap.get("zone_lon") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_lat"))) {
                whereSql += " and a.zone_lat like :zone_lat";
                parameter.put("zone_lat", "%" + queryMap.get("zone_lat") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_zone_level"))) {
                whereSql += " and a.zone_level >= :start_zone_level ";
                parameter.put("start_zone_level", queryMap.get("start_zone_level"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_zone_level"))) {
                whereSql += " and a.zone_level <= :end_zone_level ";
                parameter.put("end_zone_level", queryMap.get("end_zone_level"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql += " and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date", queryMap.get("start_modify_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date", queryMap.get("end_modify_date") + "23:59:59");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-11-06
     * 主要用于：查询 报名申请 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryHdBaomingList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere=""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryHdBaomingList");

        Map<String,Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.baoming_id"
                +",a.shop_name,a.shop_fullname,a.shop_address,a.shop_contact,a.shop_tel"
                +",a.handle_status,a.handle_demo,a.handle_user_id,a.create_user,a.create_date"
                +",a.modify_user,a.modify_date from hd_baoming a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("baoming_id"))) {
                whereSql += " and a.baoming_id = :baoming_id";
                parameter.put("baoming_id", queryMap.get("baoming_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_name"))) {
                whereSql += " and a.shop_name like :shop_name";
                parameter.put("shop_name", "%" + queryMap.get("shop_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_fullname"))) {
                whereSql += " and a.shop_fullname like :shop_fullname";
                parameter.put("shop_fullname", "%" + queryMap.get("shop_fullname") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_address"))) {
                whereSql += " and a.shop_address like :shop_address";
                parameter.put("shop_address", "%" + queryMap.get("shop_address") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_contact"))) {
                whereSql += " and a.shop_contact like :shop_contact";
                parameter.put("shop_contact", "%" + queryMap.get("shop_contact") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_tel"))) {
                whereSql += " and a.shop_tel like :shop_tel";
                parameter.put("shop_tel", "%" + queryMap.get("shop_tel") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("handle_status"))) {
                whereSql += " and a.handle_status = :handle_status";
                parameter.put("handle_status", queryMap.get("handle_status") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("handle_demo"))) {
                whereSql += " and a.handle_demo like :handle_demo";
                parameter.put("handle_demo", "%" + queryMap.get("handle_demo") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("handle_user_id"))) {
                whereSql += " and a.handle_user_id = :handle_user_id";
                parameter.put("handle_user_id", queryMap.get("handle_user_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql +=" and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date",queryMap.get("start_create_date")+"00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date",queryMap.get("end_create_date")+"23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("modify_user"))) {
                whereSql += " and a.modify_user like :modify_user";
                parameter.put("modify_user", "%" + queryMap.get("modify_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql +=" and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date",queryMap.get("start_modify_date")+"00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date",queryMap.get("end_modify_date")+"23:59:59");
            }

        }
        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
        } else {
            sql += whereSql + " order by a.create_date desc";
        }
        String count = "select count(*) from (" + sql + ") b ";
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


}
  