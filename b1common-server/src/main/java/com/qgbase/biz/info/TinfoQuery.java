package com.qgbase.biz.info;

import com.qgbase.biz.user.service.TUserService;
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
public class TinfoQuery {
    @Autowired
    private CommonDao commonDao;

    /**
     * Created by Mark on 2019-08-03
     * 主要用于：查询 用户设备 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryAppDeviceList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId()) {
            case Constants.role_admin://管理员
                break;

            default:
                throw new SysRunException("-2", "未分配数据权限", operInfo.getCurrentUser().getRoleId());

        }

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.t_userid"
                + ",a.t_deviceseq,a.t_ver,a.create_date,a.create_user,a.modify_date"
                + ",a.modify_user from app_device a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_t_userid"))) {
                whereSql += " and a.t_userid >= :start_t_userid ";
                parameter.put("start_t_userid", queryMap.get("start_t_userid"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_t_userid"))) {
                whereSql += " and a.t_userid <= :end_t_userid ";
                parameter.put("end_t_userid", queryMap.get("end_t_userid"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("t_deviceseq"))) {
                whereSql += " and a.t_deviceseq like :t_deviceseq";
                parameter.put("t_deviceseq", "%" + queryMap.get("t_deviceseq") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("t_ver"))) {
                whereSql += " and a.t_ver like :t_ver";
                parameter.put("t_ver", "%" + queryMap.get("t_ver") + "%");
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
     * Created by Mark on 2019-08-03
     * 主要用于：查询 手机端版本 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryAppVerList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId()) {
            case Constants.role_admin://管理员
                break;

            default:
                throw new SysRunException("-2", "未分配数据权限", operInfo.getCurrentUser().getRoleId());

        }

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.ver_id"
                + ",a.t_usertype,a.t_ver,a.infoBeforePaid,a.infoBeforeUse,a.isWeixinpay"
                + ",a.isweixinwappay,a.iszfbpay,a.iszfbpaywap,a.strPrice,a.demolink"
                + ",a.lawlink,a.downloadlink,a.paid,a.create_date,a.create_user"
                + ",a.modify_date,a.modify_user from app_ver a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_ver_id"))) {
                whereSql += " and a.ver_id >= :start_ver_id ";
                parameter.put("start_ver_id", queryMap.get("start_ver_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_ver_id"))) {
                whereSql += " and a.ver_id <= :end_ver_id ";
                parameter.put("end_ver_id", queryMap.get("end_ver_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_t_usertype"))) {
                whereSql += " and a.t_usertype >= :start_t_usertype ";
                parameter.put("start_t_usertype", queryMap.get("start_t_usertype"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_t_usertype"))) {
                whereSql += " and a.t_usertype <= :end_t_usertype ";
                parameter.put("end_t_usertype", queryMap.get("end_t_usertype"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("t_ver"))) {
                whereSql += " and a.t_ver like :t_ver";
                parameter.put("t_ver", "%" + queryMap.get("t_ver") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("infoBeforePaid"))) {
                whereSql += " and a.infoBeforePaid like :infoBeforePaid";
                parameter.put("infoBeforePaid", "%" + queryMap.get("infoBeforePaid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("infoBeforeUse"))) {
                whereSql += " and a.infoBeforeUse like :infoBeforeUse";
                parameter.put("infoBeforeUse", "%" + queryMap.get("infoBeforeUse") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("isWeixinpay"))) {
                whereSql += " and a.isWeixinpay = :isWeixinpay";
                parameter.put("isWeixinpay", queryMap.get("isWeixinpay"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("isweixinwappay"))) {
                whereSql += " and a.isweixinwappay = :isweixinwappay";
                parameter.put("isweixinwappay", queryMap.get("isweixinwappay"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("iszfbpay"))) {
                whereSql += " and a.iszfbpay = :iszfbpay";
                parameter.put("iszfbpay", queryMap.get("iszfbpay"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("iszfbpaywap"))) {
                whereSql += " and a.iszfbpaywap = :iszfbpaywap";
                parameter.put("iszfbpaywap", queryMap.get("iszfbpaywap"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("strPrice"))) {
                whereSql += " and a.strPrice like :strPrice";
                parameter.put("strPrice", "%" + queryMap.get("strPrice") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("demolink"))) {
                whereSql += " and a.demolink like :demolink";
                parameter.put("demolink", "%" + queryMap.get("demolink") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("lawlink"))) {
                whereSql += " and a.lawlink like :lawlink";
                parameter.put("lawlink", "%" + queryMap.get("lawlink") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("downloadlink"))) {
                whereSql += " and a.downloadlink like :downloadlink";
                parameter.put("downloadlink", "%" + queryMap.get("downloadlink") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("paid"))) {
                whereSql += " and a.paid like :paid";
                parameter.put("paid", "%" + queryMap.get("paid") + "%");
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
     * Created by Mark on 2019-08-03
     * 主要用于：查询 登录用户 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryTsUserList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId()) {
            case Constants.role_admin://管理员
                break;

            default:
                throw new SysRunException("-2", "未分配数据权限", operInfo.getCurrentUser().getRoleId());

        }

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.user_id"
                + ",a.user_account,a.password,a.username,a.user_type,a.user_status"
                + ",a.role_id,a.last_ip,a.last_os,a.last_time,a.create_date"
                + ",a.create_user,a.modify_date,a.modify_user from ts_user a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_account"))) {
                whereSql += " and a.user_account like :user_account";
                parameter.put("user_account", "%" + queryMap.get("user_account") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("password"))) {
                whereSql += " and a.password like :password";
                parameter.put("password", "%" + queryMap.get("password") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("username"))) {
                whereSql += " and a.username like :username";
                parameter.put("username", "%" + queryMap.get("username") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_type"))) {
                whereSql += " and a.user_type = :user_type";
                parameter.put("user_type", queryMap.get("user_type"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_user_status"))) {
                whereSql += " and a.user_status >= :start_user_status ";
                parameter.put("start_user_status", queryMap.get("start_user_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_user_status"))) {
                whereSql += " and a.user_status <= :end_user_status ";
                parameter.put("end_user_status", queryMap.get("end_user_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("role_id"))) {
                whereSql += " and a.role_id = :role_id";
                parameter.put("role_id", queryMap.get("role_id"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("last_ip"))) {
                whereSql += " and a.last_ip like :last_ip";
                parameter.put("last_ip", "%" + queryMap.get("last_ip") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("last_os"))) {
                whereSql += " and a.last_os like :last_os";
                parameter.put("last_os", "%" + queryMap.get("last_os") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_last_time"))) {
                whereSql += " and a.last_time >= str_to_date(:start_last_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_last_time", queryMap.get("start_last_time") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_last_time"))) {
                whereSql += " and a.last_time <= str_to_date(:end_last_time,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_last_time", queryMap.get("end_last_time") + "23:59:59");
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
     * Created by Mark on 2019-08-03
     * 主要用于：查询 业务键值 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryTComkeyList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId()) {
            case Constants.role_admin://管理员
                break;

            default:
                throw new SysRunException("-2", "未分配数据权限", operInfo.getCurrentUser().getRoleId());

        }

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.tkey"
                + ",a.tvalue from t_comkey a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("tkey"))) {
                whereSql += " and a.tkey like :tkey";
                parameter.put("tkey", "%" + queryMap.get("tkey") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_tvalue"))) {
                whereSql += " and a.tvalue >= :start_tvalue ";
                parameter.put("start_tvalue", queryMap.get("start_tvalue"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_tvalue"))) {
                whereSql += " and a.tvalue <= :end_tvalue ";
                parameter.put("end_tvalue", queryMap.get("end_tvalue"));
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
     * Created by Mark on 2019-08-03
     * 主要用于：查询 验证码 ，此代码为自动生成
     *
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryTYzmList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere = ""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId()) {
            case Constants.role_admin://管理员
                break;

            default:
                throw new SysRunException("-2", "未分配数据权限", operInfo.getCurrentUser().getRoleId());

        }

        Map<String, Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.useraccount"
                + ",a.yzm,a.active_date,a.create_date from t_yzm a ";
        String whereSql = " where 1=1 " + dataWhere + " ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("useraccount"))) {
                whereSql += " and a.useraccount like :useraccount";
                parameter.put("useraccount", "%" + queryMap.get("useraccount") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("yzm"))) {
                whereSql += " and a.yzm like :yzm";
                parameter.put("yzm", "%" + queryMap.get("yzm") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_active_date"))) {
                whereSql += " and a.active_date >= str_to_date(:start_active_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_active_date", queryMap.get("start_active_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_active_date"))) {
                whereSql += " and a.active_date <= str_to_date(:end_active_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_active_date", queryMap.get("end_active_date") + "23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_create_date"))) {
                whereSql += " and a.create_date >= str_to_date(:start_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_create_date", queryMap.get("start_create_date") + "00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_create_date"))) {
                whereSql += " and a.create_date <= str_to_date(:end_create_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_create_date", queryMap.get("end_create_date") + "23:59:59");
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
     * Created by Mark on 2019-08-06
     * 主要用于：查询 图片 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl queryTPictureList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere=""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId())
        {
            case Constants.role_admin://管理员
                break;

            default:
                throw new SysRunException("-2","未分配数据权限",operInfo.getCurrentUser().getRoleId());

        }

        Map<String,Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.picture_id"
                +",a.picture_type,a.object_id,a.picture_url,a.picture_surl,a.file_type"
                +",a.create_date,a.create_user,a.modify_date,a.modify_user from t_picture a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("picture_id"))) {
                whereSql += " and a.picture_id = :picture_id";
                parameter.put("picture_id", queryMap.get("picture_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("picture_type"))) {
                whereSql += " and a.picture_type = :picture_type";
                parameter.put("picture_type", queryMap.get("picture_type") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("object_id"))) {
                whereSql += " and a.object_id = :object_id";
                parameter.put("object_id", queryMap.get("object_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("picture_url"))) {
                whereSql += " and a.picture_url like :picture_url";
                parameter.put("picture_url", "%" + queryMap.get("picture_url") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("picture_surl"))) {
                whereSql += " and a.picture_surl like :picture_surl";
                parameter.put("picture_surl", "%" + queryMap.get("picture_surl") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("file_type"))) {
                whereSql += " and a.file_type = :file_type";
                parameter.put("file_type", queryMap.get("file_type") );
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


}

  