package com.qgbase.biz.reportSystem;


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
import java.util.List;
import java.util.Map;

@Repository
public class TreportSystemQuery {
    @Autowired
    private CommonDao commonDao;

    public Map handleRole(Map queryMap, OperInfo operInfo,String opname) throws Exception {
        switch (operInfo.getCurrentUser().getRoleId()) {
            case Constants.role_admin://管理员
                break;
            case Constants.role_dlsadmin://管理员
            case Constants.role_dlsoper://管理员
            case Constants.role_dlsywer://管理员
                String dls_id=  commonDao.getSqlone("select dls_id from rs_user u where  u.user_id=?" , operInfo.getCurrentUser().getUserId());
                queryMap.put("dls_id",dls_id);
                break;

            default:
                throw new SysRunException("-2", "未分配数据权限", operInfo.getCurrentUser().getRoleId());

        }
        return queryMap;
    }

    /**
     * Created by Mark on 2019-10-09
     * 主要用于：查询 客户 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsClientList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryRsClientList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.client_id"
                + ",a.client_name,a.client_fullname,a.client_lon,a.client_lat,a.zone_code"
                + ",a.client_address,a.client_hetong,a.client_tel,a.client_status,a.dls_id"
                + ",a.yw_user_id,a.hk_speed,a.client_level,a.create_user,a.create_date"
                + ",a.modify_user,a.modify_date from rs_client a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_id"))) {
                whereSql += " and a.client_id = :client_id";
                parameter.put("client_id", queryMap.get("client_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_name"))) {
                whereSql += " and a.client_name like :client_name";
                parameter.put("client_name", "%" + queryMap.get("client_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_fullname"))) {
                whereSql += " and a.client_fullname like :client_fullname";
                parameter.put("client_fullname", "%" + queryMap.get("client_fullname") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_lon"))) {
                whereSql += " and a.client_lon like :client_lon";
                parameter.put("client_lon", "%" + queryMap.get("client_lon") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_lat"))) {
                whereSql += " and a.client_lat like :client_lat";
                parameter.put("client_lat", "%" + queryMap.get("client_lat") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_code"))) {
                whereSql += " and a.zone_code like :zone_code";
                parameter.put("zone_code", "%" + queryMap.get("zone_code") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_address"))) {
                whereSql += " and a.client_address like :client_address";
                parameter.put("client_address", "%" + queryMap.get("client_address") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_hetong"))) {
                whereSql += " and a.client_hetong like :client_hetong";
                parameter.put("client_hetong", "%" + queryMap.get("client_hetong") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_tel"))) {
                whereSql += " and a.client_tel like :client_tel";
                parameter.put("client_tel", "%" + queryMap.get("client_tel") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_status"))) {
                whereSql += " and a.client_status = :client_status";
                parameter.put("client_status", queryMap.get("client_status"));
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
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_level"))) {
                whereSql += " and a.client_level like :client_level";
                parameter.put("client_level", "%" + queryMap.get("client_level") + "%");
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
     * Created by Mark on 2019-10-09
     * 主要用于：查询 设备 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsDeviceList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryRsDeviceList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.device_id"
                + ",a.device_uuid,a.device_type,a.device_lon,a.device_lat,a.zone_code"
                + ",a.sell_date,a.client_id,a.device_errorinfo,a.device_status,a.dls_id"
                + ",a.yw_user_id,a.soft_version,a.device_bak,a.create_user,a.create_date"
                +",r.last_logid,r.error_log"
                + ",a.modify_user,a.modify_date from rs_device a left join rs_device_lastlog r on a.device_id=r.device_id";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_id"))) {
                whereSql += " and a.device_id = :device_id";
                parameter.put("device_id", queryMap.get("device_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_uuid"))) {
                whereSql += " and a.device_uuid like :device_uuid";
                parameter.put("device_uuid", "%" + queryMap.get("device_uuid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_type"))) {
                whereSql += " and a.device_type = :device_type";
                parameter.put("device_type", queryMap.get("device_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_lon"))) {
                whereSql += " and a.device_lon like :device_lon";
                parameter.put("device_lon", "%" + queryMap.get("device_lon") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_lat"))) {
                whereSql += " and a.device_lat like :device_lat";
                parameter.put("device_lat", "%" + queryMap.get("device_lat") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zone_code"))) {
                whereSql += " and a.zone_code like :zone_code";
                parameter.put("zone_code", "%" + queryMap.get("zone_code") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_sell_date"))) {
                whereSql += " and a.sell_date >= str_to_date(:start_sell_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_sell_date", queryMap.get("start_sell_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_sell_date"))) {
                whereSql += " and a.sell_date <= str_to_date(:end_sell_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_sell_date", queryMap.get("end_sell_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_id"))) {
                whereSql += " and a.client_id = :client_id";
                parameter.put("client_id", queryMap.get("client_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_errorinfo"))) {
                whereSql += " and a.device_errorinfo like :device_errorinfo";
                parameter.put("device_errorinfo", "%" + queryMap.get("device_errorinfo") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_status"))) {
                whereSql += " and a.device_status = :device_status";
                parameter.put("device_status", queryMap.get("device_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_id"))) {
                whereSql += " and a.dls_id = :dls_id";
                parameter.put("dls_id", queryMap.get("dls_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("yw_user_id"))) {
                whereSql += " and a.yw_user_id = :yw_user_id";
                parameter.put("yw_user_id", queryMap.get("yw_user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("soft_version"))) {
                whereSql += " and a.soft_version like :soft_version";
                parameter.put("soft_version", "%" + queryMap.get("soft_version") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_bak"))) {
                whereSql += " and a.device_bak like :device_bak";
                parameter.put("device_bak", "%" + queryMap.get("device_bak") + "%");
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
     * Created by Mark on 2019-10-09
     * 主要用于：查询 设备异常记录 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsDeviceerrorlogList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryRsDeviceerrorlogList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.log_id"
                + ",a.error_type,a.start_date,a.end_date,a.client_id,a.device_id"
                + ",a.device_uuid,a.device_type,a.dls_id,a.yw_user_id,a.use_time"
                + ",a.handle_bak,a.create_user,a.create_date,a.modify_user,a.modify_date"
                + " from rs_deviceerrorlog a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_id"))) {
                whereSql += " and a.log_id = :log_id";
                parameter.put("log_id", queryMap.get("log_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("error_type"))) {
                whereSql += " and a.error_type = :error_type";
                parameter.put("error_type", queryMap.get("error_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_start_date"))) {
                whereSql += " and a.start_date >= str_to_date(:start_start_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_start_date", queryMap.get("start_start_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_start_date"))) {
                whereSql += " and a.start_date <= str_to_date(:end_start_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_start_date", queryMap.get("end_start_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_end_date"))) {
                whereSql += " and a.end_date >= str_to_date(:start_end_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_end_date", queryMap.get("start_end_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_end_date"))) {
                whereSql += " and a.end_date <= str_to_date(:end_end_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_end_date", queryMap.get("end_end_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_id"))) {
                whereSql += " and a.client_id = :client_id";
                parameter.put("client_id", queryMap.get("client_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_id"))) {
                whereSql += " and a.device_id = :device_id";
                parameter.put("device_id", queryMap.get("device_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_uuid"))) {
                whereSql += " and a.device_uuid like :device_uuid";
                parameter.put("device_uuid", "%" + queryMap.get("device_uuid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_type"))) {
                whereSql += " and a.device_type = :device_type";
                parameter.put("device_type", queryMap.get("device_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_id"))) {
                whereSql += " and a.dls_id = :dls_id";
                parameter.put("dls_id", queryMap.get("dls_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("yw_user_id"))) {
                whereSql += " and a.yw_user_id = :yw_user_id";
                parameter.put("yw_user_id", queryMap.get("yw_user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("use_time"))) {
                whereSql += " and a.use_time like :use_time";
                parameter.put("use_time", "%" + queryMap.get("use_time") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("handle_bak"))) {
                whereSql += " and a.handle_bak like :handle_bak";
                parameter.put("handle_bak", "%" + queryMap.get("handle_bak") + "%");
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
     * Created by Mark on 2019-10-09
     * 主要用于：查询 设备使用记录 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsDevicelogList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryRsDevicelogList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.log_id"
                + ",a.opname,a.start_date,a.end_date,a.client_id,a.device_id"
                + ",a.device_uuid,a.device_type,a.dls_id,a.yw_user_id,a.use_time"
                + ",a.create_user,a.create_date,a.modify_user,a.modify_date from rs_devicelog a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_id"))) {
                whereSql += " and a.log_id = :log_id";
                parameter.put("log_id", queryMap.get("log_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("opname"))) {
                whereSql += " and a.opname like :opname";
                parameter.put("opname", "%" + queryMap.get("opname") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_start_date"))) {
                whereSql += " and a.start_date >= str_to_date(:start_start_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_start_date", queryMap.get("start_start_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_start_date"))) {
                whereSql += " and a.start_date <= str_to_date(:end_start_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_start_date", queryMap.get("end_start_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_end_date"))) {
                whereSql += " and a.end_date >= str_to_date(:start_end_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_end_date", queryMap.get("start_end_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_end_date"))) {
                whereSql += " and a.end_date <= str_to_date(:end_end_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_end_date", queryMap.get("end_end_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_id"))) {
                whereSql += " and a.client_id = :client_id";
                parameter.put("client_id", queryMap.get("client_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_id"))) {
                whereSql += " and a.device_id = :device_id";
                parameter.put("device_id", queryMap.get("device_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_uuid"))) {
                whereSql += " and a.device_uuid like :device_uuid";
                parameter.put("device_uuid", "%" + queryMap.get("device_uuid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_type"))) {
                whereSql += " and a.device_type = :device_type";
                parameter.put("device_type", queryMap.get("device_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_id"))) {
                whereSql += " and a.dls_id = :dls_id";
                parameter.put("dls_id", queryMap.get("dls_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("yw_user_id"))) {
                whereSql += " and a.yw_user_id = :yw_user_id";
                parameter.put("yw_user_id", queryMap.get("yw_user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("use_time"))) {
                whereSql += " and a.use_time like :use_time";
                parameter.put("use_time", "%" + queryMap.get("use_time") + "%");
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
     * Created by Mark on 2019-10-09
     * 主要用于：查询 设备使用统计 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsDeviceReportList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryRsDeviceReportList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.log_id"
                + ",a.log_day,a.log_month,a.log_year,a.log_week,a.device_id"
                + ",a.device_uuid,a.device_type,a.dls_id,a.yw_user_id,a.client_id"
                + ",a.use_times,a.use_time,a.error_times,a.create_user,a.create_date"
                + ",a.modify_user,a.modify_date from rs_device_report a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_id"))) {
                whereSql += " and a.log_id = :log_id";
                parameter.put("log_id", queryMap.get("log_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_day"))) {
                whereSql += " and a.log_day like :log_day";
                parameter.put("log_day", "%" + queryMap.get("log_day") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_month"))) {
                whereSql += " and a.log_month like :log_month";
                parameter.put("log_month", "%" + queryMap.get("log_month") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_year"))) {
                whereSql += " and a.log_year like :log_year";
                parameter.put("log_year", "%" + queryMap.get("log_year") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_week"))) {
                whereSql += " and a.log_week like :log_week";
                parameter.put("log_week", "%" + queryMap.get("log_week") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_id"))) {
                whereSql += " and a.device_id = :device_id";
                parameter.put("device_id", queryMap.get("device_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_uuid"))) {
                whereSql += " and a.device_uuid like :device_uuid";
                parameter.put("device_uuid", "%" + queryMap.get("device_uuid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_type"))) {
                whereSql += " and a.device_type = :device_type";
                parameter.put("device_type", queryMap.get("device_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_id"))) {
                whereSql += " and a.dls_id = :dls_id";
                parameter.put("dls_id", queryMap.get("dls_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("yw_user_id"))) {
                whereSql += " and a.yw_user_id = :yw_user_id";
                parameter.put("yw_user_id", queryMap.get("yw_user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_id"))) {
                whereSql += " and a.client_id = :client_id";
                parameter.put("client_id", queryMap.get("client_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_use_times"))) {
                whereSql += " and a.use_times >= :start_use_times ";
                parameter.put("start_use_times", queryMap.get("start_use_times"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_use_times"))) {
                whereSql += " and a.use_times <= :end_use_times ";
                parameter.put("end_use_times", queryMap.get("end_use_times"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("use_time"))) {
                whereSql += " and a.use_time like :use_time";
                parameter.put("use_time", "%" + queryMap.get("use_time") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_error_times"))) {
                whereSql += " and a.error_times >= :start_error_times ";
                parameter.put("start_error_times", queryMap.get("start_error_times"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_error_times"))) {
                whereSql += " and a.error_times <= :end_error_times ";
                parameter.put("end_error_times", queryMap.get("end_error_times"));
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
     * Created by Mark on 2019-10-09
     * 主要用于：查询 设备使用统计 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public List reportRsDeviceReportList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"reportRsDeviceReportList");
        String orderby1="";
        if (StringUtil.isNotBlankIfStr(queryMap.get("orderby1")))
            orderby1=queryMap.get("orderby1").toString();
        else
            throw new Exception("缺少条件orderby1");
        String orderby2="";
        if (StringUtil.isNotBlankIfStr(queryMap.get("orderby2")))
            orderby2=queryMap.get("orderby2").toString();

        String selectgroupby=orderby1+" as groupby1";
        if (StringUtil.isNotBlankIfStr(orderby2))
            selectgroupby+=","+orderby2 +" as groupby2";
        else
            selectgroupby+=",'汇总数据' as groupby2";

        String groupby=orderby1;
        if (StringUtil.isNotBlankIfStr(orderby2))
            groupby+=","+orderby2 ;


        Map<String, Object> parameter = new HashMap();
        String sql = "select "+selectgroupby
                + ", sum(use_times) as use_times,sum(error_times) as error_times,sum(use_time)/60 as use_time"
                + " from rs_device_report a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_id"))) {
                whereSql += " and a.log_id = :log_id";
                parameter.put("log_id", queryMap.get("log_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_day"))) {
                whereSql += " and a.log_day like :log_day";
                parameter.put("log_day", "%" + queryMap.get("log_day") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_month"))) {
                whereSql += " and a.log_month like :log_month";
                parameter.put("log_month", "%" + queryMap.get("log_month") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_year"))) {
                whereSql += " and a.log_year like :log_year";
                parameter.put("log_year", "%" + queryMap.get("log_year") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("log_week"))) {
                whereSql += " and a.log_week like :log_week";
                parameter.put("log_week", "%" + queryMap.get("log_week") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_id"))) {
                whereSql += " and a.device_id = :device_id";
                parameter.put("device_id", queryMap.get("device_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_uuid"))) {
                whereSql += " and a.device_uuid like :device_uuid";
                parameter.put("device_uuid", "%" + queryMap.get("device_uuid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_type"))) {
                whereSql += " and a.device_type = :device_type";
                parameter.put("device_type", queryMap.get("device_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_id"))) {
                whereSql += " and a.dls_id = :dls_id";
                parameter.put("dls_id", queryMap.get("dls_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("yw_user_id"))) {
                whereSql += " and a.yw_user_id = :yw_user_id";
                parameter.put("yw_user_id", queryMap.get("yw_user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("client_id"))) {
                whereSql += " and a.client_id = :client_id";
                parameter.put("client_id", queryMap.get("client_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_use_times"))) {
                whereSql += " and a.use_times >= :start_use_times ";
                parameter.put("start_use_times", queryMap.get("start_use_times"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_use_times"))) {
                whereSql += " and a.use_times <= :end_use_times ";
                parameter.put("end_use_times", queryMap.get("end_use_times"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("use_time"))) {
                whereSql += " and a.use_time like :use_time";
                parameter.put("use_time", "%" + queryMap.get("use_time") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_error_times"))) {
                whereSql += " and a.error_times >= :start_error_times ";
                parameter.put("start_error_times", queryMap.get("start_error_times"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_error_times"))) {
                whereSql += " and a.error_times <= :end_error_times ";
                parameter.put("end_error_times", queryMap.get("end_error_times"));
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
        sql+=whereSql;
        sql+=" group by " + groupby;
        sql+=" order by "+ groupby;
//        if (StringUtil.isNotBlankIfStr(queryPOB.getColumnProp()) && StringUtil.isNotBlankIfStr(queryPOB.getColumnOrder())) {
//            sql += whereSql + " order by " + queryPOB.getColumnProp() + " " + queryPOB.getColumnOrder();
//        } else {
//            sql += whereSql + " order by a.create_date desc";
//        }
        //String count = "select count(*) from (" + sql + ") b ";
        List pc = commonDao.getDataBySql( sql,  parameter);
        return pc;
    }



    /**
     * Created by Mark on 2019-10-09
     * 主要用于：查询 代理商 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsDlsList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap=handleRole(queryMap,operInfo,"queryRsDlsList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.dls_id"
                + ",a.dls_name,a.dls_fullname,a.dls_lon,a.dls_lat,a.zone_code"
                + ",a.dls_address,a.dls_hetong,a.dls_tel,a.dls_status,a.create_user"
                + ",a.create_date,a.modify_user,a.modify_date from rs_dls a ";
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
     * Created by Mark on 2019-10-09
     * 主要用于：查询 区域 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsZoneList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryRsZoneList");

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.zone_code"
                + ",a.zone_name,a.zone_fullname,a.zone_lon,a.zone_lat,a.zone_level"
                + ",a.create_user,a.create_date,a.modify_user,a.modify_date from rs_zone a ";
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
        System.out.println(sql);
        PageControl pc = commonDao.getDataBySql(count, sql, queryPOB.getPage(), queryPOB.getLen(), parameter);
        return pc;
    }


    /**
     * Created by Mark on 2019-10-11
     * 主要用于：查询 代理商用户 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsUserList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere=""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryRsUserList");

        Map<String,Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.user_id"
                +",a.user_name,a.user_number,a.user_phone,a.dls_id,a.dls_user_type"
                +",a.zone_code,a.user_tel,a.user_qq,a.is_active,a.create_date"
                +",a.create_user,a.modify_date,a.modify_user from rs_user a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id") );
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
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_id"))) {
                whereSql += " and a.dls_id = :dls_id";
                parameter.put("dls_id", queryMap.get("dls_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("dls_user_type"))) {
                whereSql += " and a.dls_user_type = :dls_user_type";
                parameter.put("dls_user_type", queryMap.get("dls_user_type") );
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
                parameter.put("is_active", queryMap.get("is_active") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql +=" and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date",queryMap.get("start_create_date")+"00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date",queryMap.get("end_create_date")+"23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("create_user"))) {
                whereSql += " and a.create_user like :create_user";
                parameter.put("create_user", "%" + queryMap.get("create_user") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_modify_date"))) {
                whereSql +=" and a.modify_date >= str_to_date(:start_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_modify_date",queryMap.get("start_modify_date")+"00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_modify_date"))) {
                whereSql += " and a.modify_date <= str_to_date(:end_modify_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_modify_date",queryMap.get("end_modify_date")+"23:59:59");
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
     * Created by Mark on 2019-10-12
     * 主要用于：查询 设备消息 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryRsDeviceLastlogList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere=""; //角色数据条件
        queryMap =handleRole(queryMap,operInfo,"queryRsDeviceLastlogList");

        Map<String,Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.device_id"
                +",a.last_logid,a.create_user,a.create_date,a.modify_user,a.modify_date"
                +" from rs_device_lastlog a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("device_id"))) {
                whereSql += " and a.device_id = :device_id";
                parameter.put("device_id", queryMap.get("device_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("last_logid"))) {
                whereSql += " and a.last_logid like :last_logid";
                parameter.put("last_logid", "%" + queryMap.get("last_logid") + "%");
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

  