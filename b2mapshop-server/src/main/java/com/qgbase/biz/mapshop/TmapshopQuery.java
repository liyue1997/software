package com.qgbase.biz.mapshop;


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
public class TmapshopQuery {
    @Autowired
    private CommonDao commonDao;

    /**
     * Created by Mark on 2019-08-22
     * 主要用于：查询 商铺优惠 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl querySpDiscountList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere=""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId())
        {
            case Constants.role_admin://管理员
                break;

            default:
                //throw new SysRunException("-2","未分配数据权限",operInfo.getCurrentUser().getRoleId());
                break;

        }

        Map<String,Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.discount_id"
                +",a.shop_id,a.discount_name,a.discount_desc,a.min_users,a.iseffective,a.last_team_id"
                +",t.teamusercount,t.valid_date"
                +",p.shop_fullname"
                +",(select  GROUP_CONCAT(pic.picture_surl  )  from t_picture pic,sp_teamuser tu where pic.picture_type='user_head' and pic.object_id= tu.user_id and tu.team_id=t.team_id) headpics"
                //+",(select team_id from sp_team t where t.discount_id= a.discount_id and t.isvalided=1 and t.iscancle=0 and t.valid_date >SYSDATE()) as lastteamid"
                +",a.create_user,a.create_date,a.modify_user,a.modify_date from sp_discount a join sp_shop p on a.shop_id=p.shop_id" +
                " left join  sp_team t on a.last_team_id=t.team_id";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("discount_id"))) {
                whereSql += " and a.discount_id = :discount_id";
                parameter.put("discount_id", queryMap.get("discount_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("discount_name"))) {
                whereSql += " and a.discount_name like :discount_name";
                parameter.put("discount_name", "%" + queryMap.get("discount_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("discount_desc"))) {
                whereSql += " and a.discount_desc like :discount_desc";
                parameter.put("discount_desc", "%" + queryMap.get("discount_desc") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_min_users"))) {
                whereSql += " and a.min_users >= :start_min_users ";
                parameter.put("start_min_users",queryMap.get("start_min_users"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_min_users"))) {
                whereSql += " and a.min_users <= :end_min_users ";
                parameter.put("end_min_users",queryMap.get("end_min_users"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("iseffective"))) {
                whereSql += " and a.iseffective = :iseffective";
                parameter.put("iseffective", queryMap.get("iseffective") );
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


    /**
     * Created by Mark on 2019-08-22
     * 主要用于：查询 商铺 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl querySpShopList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere=""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId())
        {
            case Constants.role_admin://管理员
                break;

            default:
                //throw new SysRunException("-2","未分配数据权限",operInfo.getCurrentUser().getRoleId());
                break;

        }

        Map<String,Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.shop_id"
                +",a.shop_name,a.shop_fullname,a.shop_tel,a.shop_phone,a.shop_lon"
                +",a.shop_lat,a.city_name,a.area_name,a.shop_address,a.shop_status"
                +",a.shop_score,a.shop_average,a.shop_tags,a.create_user,a.create_date"
                +",(select picture_surl from t_picture p where p.picture_type='shop_img' and p.object_id= a.shop_id) shop_img";
        if (StringUtil.isNotBlankIfStr(queryMap.get("loveuser"))) {
            sql += ",(select islove from sp_user2shop us where user_id= :loveuser and us.shop_id= a.shop_id) heart";
            parameter.put("loveuser", queryMap.get("loveuser") );
        }
        sql        +=",a.modify_user,a.modify_date from sp_shop a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("loveuser"))) {
                whereSql += " and a.shop_id in (select shop_id from sp_user2shop where user_id= :loveuser)";
                parameter.put("loveuser", queryMap.get("loveuser") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_name"))) {
                whereSql += " and a.shop_name like :shop_name";
                parameter.put("shop_name", "%" + queryMap.get("shop_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_fullname"))) {
                whereSql += " and a.shop_fullname like :shop_fullname";
                parameter.put("shop_fullname", "%" + queryMap.get("shop_fullname") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_tel"))) {
                whereSql += " and a.shop_tel like :shop_tel";
                parameter.put("shop_tel", "%" + queryMap.get("shop_tel") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_phone"))) {
                whereSql += " and a.shop_phone like :shop_phone";
                parameter.put("shop_phone", "%" + queryMap.get("shop_phone") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_lon"))) {
                whereSql += " and a.shop_lon like :shop_lon";
                parameter.put("shop_lon", "%" + queryMap.get("shop_lon") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_lat"))) {
                whereSql += " and a.shop_lat like :shop_lat";
                parameter.put("shop_lat", "%" + queryMap.get("shop_lat") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zlon"))) {
                whereSql += " and a.shop_lon > :zlon";
                parameter.put("zlon",  queryMap.get("zlon") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("zlan"))) {
                whereSql += " and a.shop_lat < :zlan";
                parameter.put("zlan",  queryMap.get("zlan") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("ylon"))) {
                whereSql += " and a.shop_lon < :ylon";
                parameter.put("ylon",  queryMap.get("ylon") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("ylan"))) {
                whereSql += " and a.shop_lat > :ylan";
                parameter.put("ylan",  queryMap.get("ylan") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("city_name"))) {
                whereSql += " and a.city_name like :city_name";
                parameter.put("city_name", "%" + queryMap.get("city_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("area_name"))) {
                whereSql += " and a.area_name like :area_name";
                parameter.put("area_name", "%" + queryMap.get("area_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_address"))) {
                whereSql += " and a.shop_address like :shop_address";
                parameter.put("shop_address", "%" + queryMap.get("shop_address") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_shop_status"))) {
                whereSql += " and a.shop_status >= :start_shop_status ";
                parameter.put("start_shop_status",queryMap.get("start_shop_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_shop_status"))) {
                whereSql += " and a.shop_status <= :end_shop_status ";
                parameter.put("end_shop_status",queryMap.get("end_shop_status"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_score"))) {
                whereSql += " and a.shop_score like :shop_score";
                parameter.put("shop_score", "%" + queryMap.get("shop_score") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_shop_average"))) {
                whereSql += " and a.shop_average >= :start_shop_average ";
                parameter.put("start_shop_average",queryMap.get("start_shop_average"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_shop_average"))) {
                whereSql += " and a.shop_average <= :end_shop_average ";
                parameter.put("end_shop_average",queryMap.get("end_shop_average"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_tags"))) {
                whereSql += " and a.shop_tags like :shop_tags";
                parameter.put("shop_tags", "%" + queryMap.get("shop_tags") + "%");
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


    /**
     * Created by Mark on 2019-08-22
     * 主要用于：查询 商户用户 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl querySpShopuserList(Map queryMap, OperInfo operInfo) throws Exception {
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
        String sql = "select a.user_id"
                +",a.shop_id,a.user_name,a.user_phone,a.user_admin,a.create_date"
                +",a.create_user,a.modify_date,a.modify_user from sp_shopuser a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_name"))) {
                whereSql += " and a.user_name like :user_name";
                parameter.put("user_name", "%" + queryMap.get("user_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_phone"))) {
                whereSql += " and a.user_phone like :user_phone";
                parameter.put("user_phone", "%" + queryMap.get("user_phone") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_user_admin"))) {
                whereSql += " and a.user_admin >= :start_user_admin ";
                parameter.put("start_user_admin",queryMap.get("start_user_admin"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_user_admin"))) {
                whereSql += " and a.user_admin <= :end_user_admin ";
                parameter.put("end_user_admin",queryMap.get("end_user_admin"));
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
     * Created by Mark on 2019-08-22
     * 主要用于：查询 组团 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl querySpTeamList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere=""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId())
        {
            case Constants.role_admin://管理员
                break;

            default:
                //throw new SysRunException("-2","未分配数据权限",operInfo.getCurrentUser().getRoleId());
                break;

        }

        Map<String,Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.team_id"
                +",a.discount_id,a.shop_id,a.team_name,a.discount_desc,a.min_users"
                +",a.start_userid,a.start_date,a.end_date,a.valid_date,a.isvalided,a.group_id"
                +",a.iscancle,a.create_user,a.create_date,a.modify_user,a.modify_date"
                +",(select picture_surl from t_picture p where p.picture_type='shop_img' and p.object_id= a.shop_id) teampicurl"
                +",s.shop_address,s.shop_lon,s.shop_lat,s.shop_fullname"
                +",a.team_name as discount_name,d.last_team_id,a.teamusercount"
                +",(select  GROUP_CONCAT(pic.picture_surl  )  from t_picture pic,sp_teamuser tu where pic.picture_type='user_head' and pic.object_id= tu.user_id and tu.team_id=a.team_id) headpics"
                +" from sp_team a,sp_shop s,sp_discount d";
        String whereSql = " where a.shop_id=s.shop_id and a.discount_id=d.discount_id "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            //teamuserid
            if (StringUtil.isNotBlankIfStr(queryMap.get("teamuserid"))) {
                if (StringUtil.isNotBlankIfStr(queryMap.get("shop_credits"))) {
                    //待评价
                    whereSql += " and a.team_id in (select team_id from sp_teamuser where user_id= :teamuserid and shop_credits=0)";
                    parameter.put("teamuserid", queryMap.get("teamuserid"));
                }
                else{
                    whereSql += " and a.team_id in (select team_id from sp_teamuser where user_id= :teamuserid)";
                    parameter.put("teamuserid", queryMap.get("teamuserid"));
                }
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("team_id"))) {
                whereSql += " and a.team_id = :team_id";
                parameter.put("team_id", queryMap.get("team_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("discount_id"))) {
                whereSql += " and a.discount_id = :discount_id";
                parameter.put("discount_id", queryMap.get("discount_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("team_name"))) {
                whereSql += " and a.team_name like :team_name";
                parameter.put("team_name", "%" + queryMap.get("team_name") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("discount_desc"))) {
                whereSql += " and a.discount_desc like :discount_desc";
                parameter.put("discount_desc", "%" + queryMap.get("discount_desc") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_min_users"))) {
                whereSql += " and a.min_users >= :start_min_users ";
                parameter.put("start_min_users",queryMap.get("start_min_users"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_min_users"))) {
                whereSql += " and a.min_users <= :end_min_users ";
                parameter.put("end_min_users",queryMap.get("end_min_users"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_userid"))) {
                whereSql += " and a.start_userid like :start_userid";
                parameter.put("start_userid", "%" + queryMap.get("start_userid") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_start_date"))) {
                whereSql +=" and a.start_date >= str_to_date(:start_start_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_start_date",queryMap.get("start_start_date")+"00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_start_date"))) {
                whereSql += " and a.start_date <= str_to_date(:end_start_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_start_date",queryMap.get("end_start_date")+"23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_end_date"))) {
                whereSql +=" and a.end_date >= str_to_date(:start_end_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_end_date",queryMap.get("start_end_date")+"00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_end_date"))) {
                whereSql += " and a.end_date <= str_to_date(:end_end_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_end_date",queryMap.get("end_end_date")+"23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_valid_date"))) {
                whereSql +=" and a.valid_date >= str_to_date(:start_valid_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_valid_date",queryMap.get("start_valid_date")+"00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_valid_date"))) {
                whereSql += " and a.valid_date <= str_to_date(:end_valid_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_valid_date",queryMap.get("end_valid_date")+"23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("isvalided"))) {
                whereSql += " and a.isvalided = :isvalided";
                parameter.put("isvalided", queryMap.get("isvalided") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("iscancle"))) {
                whereSql += " and a.iscancle = :iscancle";
                parameter.put("iscancle", queryMap.get("iscancle") );
            }

            if (StringUtil.isNotBlankIfStr(queryMap.get("groupid"))) {
                whereSql += " and a.group_id = :groupid";
                parameter.put("groupid", queryMap.get("groupid") );
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


    /**
     * Created by Mark on 2019-08-22
     * 主要用于：查询 组团成员 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl querySpTeamuserList(Map queryMap, OperInfo operInfo) throws Exception {
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
        String sql = "select a.team_id"
                +",a.user_id,a.start_date,a.iscare,a.isteamer,a.user_credits"
                +",a.user_credits_desc,a.shop_credits,a.shop_credits_desc,a.ispayed,a.create_user"
                +",a.create_date,a.modify_user,a.modify_date from sp_teamuser a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("team_id"))) {
                whereSql += " and a.team_id = :team_id";
                parameter.put("team_id", queryMap.get("team_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_start_date"))) {
                whereSql +=" and a.start_date >= str_to_date(:start_start_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("start_start_date",queryMap.get("start_start_date")+"00:00:00");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_start_date"))) {
                whereSql += " and a.start_date <= str_to_date(:end_start_date,'%Y-%m-%d %H:%i:%s')";
                parameter.put("end_start_date",queryMap.get("end_start_date")+"23:59:59");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("iscare"))) {
                whereSql += " and a.iscare = :iscare";
                parameter.put("iscare", queryMap.get("iscare") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("isteamer"))) {
                whereSql += " and a.isteamer = :isteamer";
                parameter.put("isteamer", queryMap.get("isteamer") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_user_credits"))) {
                whereSql += " and a.user_credits >= :start_user_credits ";
                parameter.put("start_user_credits",queryMap.get("start_user_credits"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_user_credits"))) {
                whereSql += " and a.user_credits <= :end_user_credits ";
                parameter.put("end_user_credits",queryMap.get("end_user_credits"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_credits_desc"))) {
                whereSql += " and a.user_credits_desc like :user_credits_desc";
                parameter.put("user_credits_desc", "%" + queryMap.get("user_credits_desc") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_shop_credits"))) {
                whereSql += " and a.shop_credits >= :start_shop_credits ";
                parameter.put("start_shop_credits",queryMap.get("start_shop_credits"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_shop_credits"))) {
                whereSql += " and a.shop_credits <= :end_shop_credits ";
                parameter.put("end_shop_credits",queryMap.get("end_shop_credits"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_credits_desc"))) {
                whereSql += " and a.shop_credits_desc like :shop_credits_desc";
                parameter.put("shop_credits_desc", "%" + queryMap.get("shop_credits_desc") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("ispayed"))) {
                whereSql += " and a.ispayed = :ispayed";
                parameter.put("ispayed", queryMap.get("ispayed") );
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


    /**
     * Created by Mark on 2019-08-22
     * 主要用于：查询 买家 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl querySpUserList(Map queryMap, OperInfo operInfo) throws Exception {
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
        String sql = "select a.user_id"
                +",a.user_lon,a.user_lat,a.user_credits,a.create_user,a.create_date"
                +",a.modify_user,a.modify_date from sp_user a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_lon"))) {
                whereSql += " and a.user_lon like :user_lon";
                parameter.put("user_lon", "%" + queryMap.get("user_lon") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_lat"))) {
                whereSql += " and a.user_lat like :user_lat";
                parameter.put("user_lat", "%" + queryMap.get("user_lat") + "%");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("start_user_credits"))) {
                whereSql += " and a.user_credits >= :start_user_credits ";
                parameter.put("start_user_credits",queryMap.get("start_user_credits"));
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("end_user_credits"))) {
                whereSql += " and a.user_credits <= :end_user_credits ";
                parameter.put("end_user_credits",queryMap.get("end_user_credits"));
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

    /**
     * Created by Mark on 2019-08-30
     * 主要用于：查询 用户浏览收藏得店铺 ，此代码为自动生成
     * @param queryMap 查询条件
     * @return 查询结果
     */
    public PageControl querySpUser2shopList(Map queryMap, OperInfo operInfo) throws Exception {
        //在这里处理各种角色的数据权限，比如 只能看自己的仓库的数据等
        String dataWhere=""; //角色数据条件
        switch (operInfo.getCurrentUser().getRoleId())
        {
            case Constants.role_admin://管理员
                break;

            default:
                //throw new SysRunException("-2","未分配数据权限",operInfo.getCurrentUser().getRoleId());
                break;

        }

        Map<String,Object> parameter = new HashMap();
        QueryPOB queryPOB = new QueryPOB(queryMap);
        String sql = "select a.user_id"
                +",a.shop_id,a.islove,a.create_date,a.create_user,a.modify_date"
                +",a.modify_user from sp_user2shop a ";
        String whereSql = " where 1=1 "+dataWhere+" ";
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("user_id"))) {
                whereSql += " and a.user_id = :user_id";
                parameter.put("user_id", queryMap.get("user_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("shop_id"))) {
                whereSql += " and a.shop_id = :shop_id";
                parameter.put("shop_id", queryMap.get("shop_id") );
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("islove"))) {
                whereSql += " and a.islove = :islove";
                parameter.put("islove", queryMap.get("islove") );
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

  