package com.qgbase.biz.user.service;

import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.Constants;
import com.qgbase.config.annotation.Permission;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.config.exception.TokenAuthException;
import com.qgbase.util.MD5;
import com.qgbase.util.TTool;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by lbb on 2018/4/24.
 * 主要用于：
 */
@Component
public class TUserService extends TBaseBo<TUser> {
    @Autowired
    CommonDao commonDao;

    @Override
    public TUser createObj() {
        return new TUser();
    }

    @Override
    public TUser newObj(OperInfo oper) throws Exception {
        TUser user = super.newObj(oper);
        user.setUserId(commonDao.getNewKey("USER", "USER", 4, 5));
        user.setUserStatus(Constants.yesorno_Yes);
        //user.setUserAccount(user.getUserId());
        return user;
    }

    @Override
    protected Class getEntityClass() {
        return TUser.class;
    }

    @Override
    public String checkAddorUpdate(TUser obj, OperInfo oper, boolean isNew) throws Exception {
        if (!isNew) {
            if (Constants.user_admin.equals(obj.getUserId())) {
                obj.setRoleId(Constants.user_admin);
                obj.setUserStatus(Constants.yesorno_Yes);
            }
        } else {
            TUser user = getUserByUserAccount(obj.getUserAccount());
            if (user != null) {
                return "帐户名已经存在";
            }
        }
        return super.checkAddorUpdate(obj, oper, isNew);
    }

    /**
     * 新增用户
     *
     * @param user 业务对象
     * @param oper 操作者
     */
    @Override
    public TUser addobj(TUser user, OperInfo oper) throws Exception {
        user = super.addobj(user, oper);
        //restPassword(user.getUserId(), oper);
        return user;
    }

    /**
     * 检查用户是否可以删除
     *
     * @param obj
     * @param oper
     */
    @Override
    public String checkDelete(TUser obj, OperInfo oper) throws Exception {
        if (Constants.user_admin.equals(obj.getUserId())) {
            return "不允许删除admin用户！";
        } else {
            return super.checkDelete(obj, oper);
        }
    }

    @Override
    public void deleteobj(String objId, OperInfo oper) throws Exception {
        super.deleteobj(objId, oper);
    }

    /**
     * 取消用户登陆权限
     *
     * @param objId
     * @param oper
     * @return
     * @throws Exception
     */
    public TUser cancelobj(String objId, OperInfo oper) throws Exception {
        TUser tUser = getobj(objId, oper);
        checkObj(tUser);
        tUser.setUserStatus(0);
        TUser tUser1 = updateobj(tUser, oper);
        return tUser1;
    }

    /**
     * 恢复用户状态
     *
     * @param objId 用户id
     * @param oper  操作人
     * @return 返回用户
     * @throws Exception
     */
    public TUser recoveryobj(String objId, OperInfo oper) throws Exception {
        TUser tUser = getobj(objId, oper);
        checkObj(tUser);
        tUser.setUserStatus(1);
        TUser tUser1 = updateobj(tUser, oper);
        return tUser1;
    }

    /**
     * 更新密码
     *
     * @param userId  业务对象id
     * @param oldpass 旧密码
     * @param newPass 新密码
     * @param oper    操作者
     * @return
     */
    @Permission(moduleCode = "XGMM", operationCode = "UPDATE")
    public void updatePassword(String userId, String oldpass, String newPass, OperInfo oper) throws Exception {
        TUser user = getobj(userId, oper);
        if (!checkOpRole("updatePassword", user, oper)) {
            throw new SysRunException("-2", "没有权限", userId);
        }
        String sql1 = "select password from ts_user where user_id=?"; //+tuser.getFUSERID()+"'";
        String oldp = commonDao.getSqlone(sql1, user.getUserId());

        if (oldp.equals(oldpass)) {
            String sql = "update ts_user set password=? where user_id=? ";
            if (commonDao.executeSql(sql, newPass, user.getUserId()) != 1) {
                TTool.LogErr("返回与预期不同");
            } else {

                LogOpinfo("updatePassword", user, oper);
            }
        } else {
            throw new SysRunException("-2", "用户名或密码错误", userId);
        }
    }

    /**
     * 重置用户密码
     *
     * @param id
     * @param oper
     * @throws Exception
     */
    public void restPassword(String id, OperInfo oper) throws Exception {
        TUser tuser = super.getobj(id, oper);
        if (!checkOpRole("restPassword", tuser, oper)) {
            throw new SysRunException("-2", "没有权限", id);
        }
        String password = MD5.MD5Encode("123456");
        String sql = "update ts_user set password='" + password + "' where user_id=?";
        if (commonDao.executeSql(sql, id) != 1) {
            TTool.LogErr("返回与预期不同");
        } else {
            LogOpinfo("restPassword", tuser, oper);
        }
    }

    /**
     * 登录
     *
     * @param pwd
     * @return
     * @throws Exception
     */
    public TUser login(String userName, String pwd, OperInfo oper) throws Exception {
        TUser userO = new TUser();
        userO.setUserId("admin");
        oper.setCurrentUser(userO);
        TUser u1 = getUserByUserAccount(userName);
        if (u1 == null) {
            return null;
        }
        String sql1 = "select password from ts_user where user_account=? and user_status=1"; //+tuser.getFUSERID()+"'";
        String oldp = commonDao.getSqlone(sql1, userName);
        if (oldp.equals(pwd)) {
            TUser user = getobj(u1.getUserId(), oper);
            user.setLastOs(oper.lastOs);
            user.setLastIp(oper.lastIp);
            user.setLastTime(oper.lastTime);
            updateobj(user, oper);
            LogOpinfo("login", user, oper);
            // String subware=  commonDao.getSqlone("select IFNULL(ui.subware_code,'') from ts_user u " +
            //         "LEFT JOIN ts_userinfo ui on u.user_id=ui.user_id where  u.user_id=?", user.getUserId());
            Map extend = new HashMap();
            //extend.put("subwareCode", tUserInfoService.getWareCode(user.getUserId()));
            user.setExtendInfo(extend);
            return user;
        } else {
            return null;
        }
    }

    public TUser getUserByUserAccount(String username) {
        TUser user = commonDao.getHqlOne("from TUser where userAccount=?", TUser.class, username);
        return user;
    }

    public List checkUnData(String id, OperInfo oper) throws Exception {
        String sql = "select userId,'用户信息表数据缺少' from ts_user where userId not in "
                + "(select userId from ts_userinfo ) limit  1000";
        List data = commonDao.getSql(sql);
        String sql1 = "select userId,'用户系统表数据缺少' from ts_userinfo where userId not in "
                + "(select userId from ts_user where user_type='" + Constants.usertype_user + "') limit 1000";
        data.addAll(commonDao.getSql(sql1));


        return data;
    }

    public void deleteUnData(String id, OperInfo oper) throws Exception {

        String sql = "delete from ts_userinfo where userId =?";
        commonDao.executeSql(sql, id);
        String sql1 = "delete from ts_user where userId =?";
        commonDao.executeSql(sql1, id);
    }

    public Object getObjectByClaims(Claims claims) {
        String userName = claims.getSubject();
        if (userName == null) {
            throw new TokenAuthException();
        }
        TUser user = getUserByUserAccount(userName);
        if (user == null) {
            throw new TokenAuthException();
        }
        return user;

    }

    public TUser zhuce(String useraccount,String psw,String username,String usertype,String role,OperInfo oper)throws Exception {
        TUser user =newObj(oper);
        user.setUserAccount(useraccount);
        user.setUsername(username);
        user.setRoleId(role);
        user.setPassword(psw);
        user.setUserType(usertype);

        return addobj(user,oper);
    }


}
