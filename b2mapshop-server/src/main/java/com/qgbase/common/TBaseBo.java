package com.qgbase.common;


import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.dao.TBaseDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.domain.TBaseEntity;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.Set;

/**
 * Created by lbb on 2018/4/23.
 * 主要用于：业务逻辑处理
 */
@Component
public abstract class TBaseBo<T extends TBaseEntity> {
    @Autowired
    protected TBaseDao<T> tBaseDao;

    protected abstract Class getEntityClass();

    //?
    protected final Logger logger = LoggerFactory.getLogger(getEntityClass());

    protected void LogDebug(String debug)
    {
        System.out.println(debug);
        logger.debug(debug);
    }
    protected void LogInfo(String info)
    {
        logger.info(info);
    }


    protected void LogOpinfo(String method, T obj, OperInfo oper) {
        TUser user = oper.getCurrentUser();
        logger.info(user.getUserId() + "方法：[{}]。" + "执行过程：[{}]", method + obj.getObjName()
                , user.getUsername() + method + "  对" + obj.getObjDebug());
    }


    protected abstract T createObj();
    /**
     * 检查model是否为空
     * @param obj
     */
    public void checkObj(T obj){
        if (obj==null)
            throw new SysRunException("-2",obj.getObjName()+"不存在");
    }
    /**
     * 初始化新对象
     *
     * @return 实体对象
     */
    public T newObj(OperInfo oper) throws Exception {
        T obj = createObj();
        TBaseEntity ent = (TBaseEntity) obj;
        //初始化
        ent.setCreateDate(TTool.getSystime());
        ent.setModifyDate(TTool.getSystime());
        ent.setCreateUser(oper.getCurrentUser().getUserId());
        ent.setModifyUser(oper.getCurrentUser().getUserId());

        return obj;
    }

    /**
     * 初始化创建时间
     *
     * @return 实体对象
     */
    public T createCM(T obj, OperInfo oper) throws Exception {
        TBaseEntity ent = (TBaseEntity) obj;
        ent.setCreateDate(TTool.getSystime());
        ent.setCreateUser(oper.getCurrentUser().getUserId());
        ent.setModifyDate(TTool.getSystime());
        ent.setModifyUser(oper.getCurrentUser().getUserId());
        return obj;
    }

    /**
     * 初始化新对象
     *
     * @return 实体对象
     */
    public T upObjFM(T obj, OperInfo oper) throws Exception {
        TBaseEntity ent = (TBaseEntity) obj;
        //初始化
        ent.setModifyDate(TTool.getSystime());
        ent.setModifyUser(oper.getCurrentUser().getUserId());
        return obj;
    }

    /**
     * 检查是否存在
     *
     * @param obj  实体对象，只需要id
     * @param oper 操作者
     * @return 是否存在
     * @throws Exception 无
     */
    protected boolean checkIdExist(T obj, OperInfo oper) throws Exception {
        T obj1 = tBaseDao.getobj(getEntityClass(), obj.getPKid());
        if (!checkOpRole("checkIdExist", obj, oper))
            throw new SysRunException("-2", "没有查询权限", obj.getObjDebug());
        return obj1 != null;
    }


    /**
     * 检查权限
     * 根据对象类型、方法名、检查权限
     *
     * @param amethod 方法名
     * @param obj     业务对象
     * @param oper    操作者
     * @return 是否
     */
    protected boolean checkOpRole(String amethod, T obj, OperInfo oper) {

        return true;
    }

    /**
     * 检查数据完整性
     * 根据实体定义进行是否为空、长度、类型、邮件手机等格式校验
     *
     * @param obj  业务对象
     * @param oper 操作者
     * @return 是否
     */
    public String checkAddorUpdate(T obj, OperInfo oper, boolean isNew) throws Exception {
        ValidatorFactory vf = Validation.buildDefaultValidatorFactory();
        Validator validator = vf.getValidator();
        Set<ConstraintViolation<T>> set = validator.validate(obj);
        StringBuilder msg = new StringBuilder();
        for (ConstraintViolation<T> constraintViolation : set) {
            msg.append(" "+constraintViolation.getMessage());
        }
        if (StringUtil.isNotBlankIfStr(msg)) {
            return msg.toString();
        }
        if (isNew) {
            if (checkIdExist(obj, oper)) {
                return ((TBaseEntity) obj).getObjDesc() + "已经存在";
            }
        }
        return "";
    }

    /**
     * 保存业务对象
     *
     * @param obj  业务对象
     * @param oper 操作者
     */
    public T updateobj(T obj, OperInfo oper) throws Exception {
        if (!checkOpRole("updateobj", obj, oper)) {
            throw new SysRunException("-2", "没有修改权限",obj.getObjDebug());
        }
        obj = mergeObj(obj);
        String ret = checkAddorUpdate(obj, oper, false);
        if (!ret.equals("")) {
            throw new SysRunException("-2", ret,obj.getObjDebug());
        }
        obj = upObjFM(obj, oper);
        tBaseDao.updateobj(obj);
        LogOpinfo("updateobj", obj, oper);
        return obj;
    }

    private T mergeObj(T obj) throws IllegalAccessException {
        Class type = obj.getClass();
        T instance = obj;
        instance = tBaseDao.getobjClear(type, obj.getPKid());
        if(instance == null)
        {
            throw new SysRunException("-1","数据已经被删除",obj);
        }
        for (Field field : type.getDeclaredFields()) {
            field.setAccessible(true);
            if (field.get(obj) != null) {
                field.set(instance, field.get(obj));
            }
        }
        return instance;
    }

    /**
     * 新增业务对象
     *
     * @param obj  业务对象
     * @param oper 操作者
     */
    public T addobj(T obj, OperInfo oper) throws Exception {
        if (!checkOpRole("addobj", obj, oper))
            throw new SysRunException("-2", "没有添加权限", obj.getObjDebug());
        String ret = checkAddorUpdate(obj, oper, true);
        if (!ret.equals(""))
            throw new SysRunException("-2", ret, obj.getObjDebug());
        obj = createCM(obj, oper);
        obj = tBaseDao.addobj(obj);
        LogOpinfo("addobj", obj, oper);
        return obj;

    }

    public String checkDelete(T obj, OperInfo oper) throws Exception {

        return "";
    }

    /**
     * 删除
     *
     * @param objId 业务id
     * @param oper  操作者
     */
    public void deleteobj(String objId, OperInfo oper) throws Exception {
        T obj = tBaseDao.getobj(getEntityClass(), objId);
        if (!checkOpRole("deleteobj", obj, oper))
            throw new SysRunException("-2", "没有删除权限", obj.getObjDebug());
        String ret = checkDelete(obj, oper);
        if (!ret.equals(""))
            throw new SysRunException("-2", ret, obj.getObjDebug());
        tBaseDao.deleteobj(getEntityClass(), obj);
        LogOpinfo("deleteobj", obj, oper);
    }

    /**
     * 获得业务对象
     *
     * @param objId 业务对象
     * @param oper  操作者
     * @return 对象实体
     */
    public T getobj(String objId, OperInfo oper) throws Exception {
        T getobj = tBaseDao.getobj(getEntityClass(), objId);
        if (!checkOpRole("getobj", getobj, oper))
            throw new SysRunException("-2", "没有权限", objId);
        return getobj;
    }

    /**
     * 对照方法操作对照关系
     *
     * @param method
     * @return
     */
    protected String coventMethodToOpr(String method) {
        switch (method) {
            case "addobj":
                return "NEW";
            case "deleteobj":
                return "DELETE";
            case "newObj":
                return "NEW";
            case "updateobj":
                return "UPDATE";
            case "getobj":
                return "QUERY";
            case "checkIdExist":
                return "QUERY";
            default:
                throw new SysRunException("-2", "暂无此操作:" + method, method);
        }
    }


    public void saveOrUpdatelist(Collection<T> objs) {
      //  Session session = entityManager.unwrap(Session.class);
        for(T obj :objs) {
            tBaseDao.saveOrUpdateobj(obj);
        }
        // session.clear();
    }
}
