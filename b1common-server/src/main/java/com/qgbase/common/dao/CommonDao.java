package com.qgbase.common.dao;

import cn.hutool.core.date.DateUtil;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.util.JsonUtil;
import com.qgbase.util.PageControl;
import com.qgbase.util.TTool;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by qm on 2017/3/23.
 * 这个地方要不要事务标记 ？？？
 */
@Transactional
@Repository
public class CommonDao {

    @PersistenceContext
    EntityManager entityManager;

    public OperInfo getCurrentUser() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("currentUser") != null) {
            return (OperInfo) request.getAttribute("currentUser");
        } else {
            return OperInfo.createVirtualUser();
        }
    }


    /**
     * 根据主键获取对象
     *
     * @param clazz
     * @param id
     * @return
     */
    public Object getWithClear(Class clazz, Serializable id) {
        Session session = entityManager.unwrap(Session.class);
        Object obj = session.get(clazz, id);
        session.clear();
        return obj;
    }

    public PageControl getDataBySql(String countSql, String dataSql, Integer cpage, int len, Map parameter) {
        int i = 0;
        long times = System.currentTimeMillis();
        try {
            PageControl pc = getDataBySqlNoLog(countSql, dataSql, cpage, len, parameter);
            times = System.currentTimeMillis() - times;
            i = pc.getList().size();
            return pc;
        } finally {
            logtosql(dataSql, JsonUtil.toJson(parameter), times, i);
        }
    }

    public PageControl getDataBySqlNoLog(String countSql, String dataSql, Integer cpage, int len, Map parameter) {

        PageControl pc = new PageControl();
        Session session = entityManager.unwrap(Session.class);
        SQLQuery sqlQuery = session.createSQLQuery(countSql);
        SQLQuery query = session.createSQLQuery(dataSql);
        for (Object key : parameter.keySet()) {
            sqlQuery.setParameter(key + "", parameter.get(key));
            query.setParameter(key + "", parameter.get(key));
            System.out.println(key + "" + parameter.get(key));
        }
        query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        Date date = new Date();
        Integer total = Integer.parseInt(sqlQuery.uniqueResult().toString());
        Date date1 = new Date();
        System.out.println("countSql:" + (date1.getTime() - date.getTime()));
        if (null == cpage || cpage == 0) {
            cpage = 1;
        }
        int start = (cpage - 1) * len;
        pc.setPagesize(len);
        pc.setCpage(cpage);
        query.setFirstResult(start);
        query.setMaxResults(len);
        pc.setTotalitem(total);
        pc.setList(query.list());
        Date date2 = new Date();
        System.out.println("dataSql:" + (date2.getTime() - date1.getTime()));
        return pc;

    }


    public PageControl getDataSumBySql(String countSql,String sumSql, String dataSql, Integer cpage, int len, Map parameter) {
        int i = 0;
        long times = System.currentTimeMillis();
        try {
            PageControl pc = getDataSumBySqlNoLog(countSql,sumSql, dataSql, cpage, len, parameter);
            times = System.currentTimeMillis() - times;
            i = pc.getList().size();
            return pc;
        } finally {
            logtosql(dataSql, JsonUtil.toJson(parameter), times, i);
        }
    }

    public PageControl getDataSumBySqlNoLog(String countSql,String sumSql, String dataSql, Integer cpage, int len, Map parameter) {

        PageControl pc = new PageControl();
        Session session = entityManager.unwrap(Session.class);
        SQLQuery sqlQuery = session.createSQLQuery(countSql);
        SQLQuery sumQuery = session.createSQLQuery(sumSql);
        SQLQuery query = session.createSQLQuery(dataSql);
        for (Object key : parameter.keySet()) {
            sqlQuery.setParameter(key + "", parameter.get(key));
            sumQuery.setParameter(key + "", parameter.get(key));
            query.setParameter(key + "", parameter.get(key));
            System.out.println(key + "" + parameter.get(key));
        }
        query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        Date date = new Date();
        Integer total = Integer.parseInt(sqlQuery.uniqueResult().toString());
        Object o=sumQuery.uniqueResult();

        String sumtotal = "0";
        if (o !=null){
            sumtotal=o.toString();
        }
        Date date1 = new Date();
        System.out.println("countSql:" + (date1.getTime() - date.getTime()));
        if (null == cpage || cpage == 0) {
            cpage = 1;
        }
        int start = (cpage - 1) * len;
        pc.setPagesize(len);
        pc.setCpage(cpage);
        query.setFirstResult(start);
        query.setMaxResults(len);
        pc.setTotalitem(total);
        pc.setSumtotal(sumtotal);
        pc.setList(query.list());
        Date date2 = new Date();
        System.out.println("dataSql:" + (date2.getTime() - date1.getTime()));
        return pc;

    }



    /**
     * 获取记录条数
     *
     * @param sql
     * @param params
     * @return
     */
    public Integer getCountBy(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        if (params != null) {
            for (String key : params.keySet()) {
                query.setParameter(key, params.get(key));
            }
        }
        BigInteger bigInteger = (BigInteger) query.getSingleResult();
        return bigInteger.intValue();
    }

    public List getDataBySql(String dataSql, Map parameter) {
        int i = 0;
        Date now = DateUtil.date();
        long times = 0;

        try {
            Session session = entityManager.unwrap(Session.class);
            SQLQuery query = session.createSQLQuery(dataSql);
            for (Object key : parameter.keySet()) {
                query.setParameter(key + "", parameter.get(key));
                System.out.println(key + "" + parameter.get(key));
            }
            query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
            List data = query.list();
            times = DateUtil.date().getTime() - now.getTime();
            i = data.size();
            return data;
        } finally {
            logtosql(dataSql, JsonUtil.toJson(parameter), times, i);
        }
    }

    public List getListSql(String sql) throws Exception {
        int i = 0;
        Date now = DateUtil.date();
        long times = 0;

        try {
            Session session = entityManager.unwrap(Session.class);
            SQLQuery query = session.createSQLQuery(sql);
            query.setResultTransformer(Transformers.TO_LIST);
            List data = query.list();
            times = DateUtil.date().getTime() - now.getTime();
            i = data.size();
            return data;
        } finally {
            logtosql(sql, null, times, i);
        }
    }

    public List getSqlNoLog(final String sql, Object[] params) {
        Session session = entityManager.unwrap(Session.class);
        SQLQuery query = session.createSQLQuery(sql);
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i, params[i]);
        }
        query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List list = query.list();
        return list;
    }

    public List getSql(final String sql, Object... params) {
        int i = 0;
        long times = System.currentTimeMillis();
        try {
            List list = getSqlNoLog(sql, params);
            times = System.currentTimeMillis() - times;
            i = list.size();
            return list;
        } finally {
            logtosql(sql, JsonUtil.toJson(params), times, i);
        }
    }

    public String getSqlone(final String sql, Object... params) throws Exception {
        Session session = entityManager.unwrap(Session.class);
        SQLQuery query = session.createSQLQuery(sql);
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i, params[i]);
        }
        //query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List list = query.list();
        if (list != null && list.size() > 0) {
            return list.get(0).toString();
        } else {
            throw new SysRunException("-2", "查询错误", sql, params);
        }

    }

    public Map getSqlMap(final String sql, Object... params) throws Exception {
        Session session = entityManager.unwrap(Session.class);
        SQLQuery query = session.createSQLQuery(sql);
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i, params[i]);
        }
        query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List list = query.list();
        if (list != null && list.size() > 0) {
            return (Map) list.get(0);
        } else {
            throw new SysRunException("-2", "查询错误", sql, params);
        }

    }

    /**
     * 返回结果集，结果集不包含key，只有value
     *
     * @param sql
     * @return
     */
    @SuppressWarnings("unchecked")
    public List getSqlNoMap(final String sql) {
        Session session = entityManager.unwrap(Session.class);
        SQLQuery query = session.createSQLQuery(sql);
        return query.list();
    }


    public void updateBySql(String sql) {
        Session session = entityManager.unwrap(Session.class);
        SQLQuery query = session.createSQLQuery(sql);
        query.executeUpdate();
    }

    /**
     * 新增或者删除
     *
     * @param sql
     * @param params
     * @return
     */
    public Integer deleteOrUpDate(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        if (params != null) {
            for (String key : params.keySet()) {
                query.setParameter(key, params.get(key));
            }
        }
        return query.executeUpdate();
    }


    /**
     * 处理sql
     *
     * @param sql
     */
    public int executeSqlnolog(final String sql, Object... params) {
        Session session = entityManager.unwrap(Session.class);
        SQLQuery query = session.createSQLQuery(sql);
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i, params[i]);
        }
        int i = query.executeUpdate();

        return i;
    }

    public int executeSql(final String sql, Object... params) {
        int i = 0;
        Date now = DateUtil.date();
        long times = 0;
        try {
            i = executeSqlnolog(sql, params);
            times = DateUtil.date().getTime() - now.getTime();
            return i;
        } finally {
            logtosql(sql, JsonUtil.toJson(params), times, i);
        }
    }

    /**
     * 处理sqlclear
     *
     * @param sql
     */
    public int executeSqlMap(final String sql, Map<String, Object> params) throws Exception {
        Session session = entityManager.unwrap(Session.class);
        SQLQuery query = session.createSQLQuery(sql);
        if (params != null) {
            for (String key : params.keySet()) {
                query.setParameter(key, params.get(key));
            }
        }
        int i = query.executeUpdate();
        return i;
    }

    private String removeUnderLine(String attrName) {
        //去掉数据库字段的下划线
        if (attrName.contains("_")) {
            String[] names = attrName.split("_");
            String firstPart = names[0];
            String otherPart = "";
            for (int i = 1; i < names.length; i++) {
                //String word = names[i].replaceFirst(names[i].substring(0, 1), names[i].substring(0, 1).toUpperCase());
                String word = names[i];
                otherPart += word;
            }
            attrName = firstPart + otherPart;
        }
        return attrName;
    }


    /**
     * 根据主键获取对象
     *
     * @param clazz
     * @param id
     * @return
     */
    public Object get(Class clazz, Serializable id) {
        Session session = entityManager.unwrap(Session.class);
        Object obj = session.get(clazz, id);
        return obj;
    }

    /**
     * 获取清除缓存后的对象
     *
     * @param clazz
     * @param id
     * @return
     */
    public Object getWithEvict(Class clazz, Serializable id) {
        Session session = entityManager.unwrap(Session.class);
        Object obj = session.get(clazz, id);
        session.evict(obj);
        return obj;
    }

    /**
     * 根据hql获取对象，并从缓存中移除该对象
     *
     * @param hql
     * @return
     */
    public Object getHqlWithEvict(final String hql) {
        Session session = entityManager.unwrap(Session.class);
        SQLQuery query = session.createSQLQuery(hql);
        query.setFirstResult(0);
        query.setMaxResults(1);
        List list = query.list();
        Object obj = null;
        if (list.size() == 1) {
            obj = list.get(0);
            session.evict(obj);
        }
        return obj;
    }

    public List getHqlList(String hql) {
        Query query = entityManager.createNativeQuery(hql);
        List list = query.getResultList();
        return list;

    }

    public <T> T getHqlOne(String hql, Class<T> t, Object... o) {
        Query query = entityManager.createQuery(hql);
        for (int i = 1; i <= o.length; i++) {
            query.setParameter(i, o[i - 1]);
        }
        List list = query.getResultList();
        if (list != null && list.size() > 0) {
            return (T) list.get(0);
        }
        return null;
    }

    public List getHqlListP(String hql, Object... o) {
        Query query = entityManager.createQuery(hql);
        for (int i = 1; i <= o.length; i++) {
            query.setParameter(i, o[i - 1]);
        }
        return query.getResultList();
    }

    public void saveOrUpdateList(Collection objects) {
        for (Object obj : objects) {
            saveOrUpdate(obj);
        }
    }

    //批量保存并立即入库
    public void saveOrUpdateListClear(Collection objects, Class aClass) {
        Session session = entityManager.unwrap(Session.class);
        for (Object obj : objects) {
            session.saveOrUpdate(obj);
        }
        session.flush();
        session.clear();
    }

    public void saveOrUpdate(Object obj) {
        Session session = entityManager.unwrap(Session.class);
        session.saveOrUpdate(obj);

    }

    //不缓存
    public void saveOrUpdateClear(Object obj) {
        Session session = entityManager.unwrap(Session.class);
        session.saveOrUpdate(obj);

    }

    public void clear() {
        Session session = entityManager.unwrap(Session.class);
        session.flush();
        session.clear();

    }

    //查询hql语句
    public List queryByHql(String hql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(hql);
        if (params != null) {
            for (String key : params.keySet()) {
                query.setParameter(key, params.get(key));
            }
        }
        List list = query.getResultList();
        if (list != null && list.size() > 0) {
            return list;
        }
        return null;
    }

    /**
     * 暂不明确
     *
     * @param key    标志
     * @param prefix 前缀
     * @param len    长度
     * @return 返回主键
     * @throws Exception 异常
     */
    public String getNewKey(String key, String prefix, int len, int preLen) throws Exception {
        String sql = "select getKeys(?);";//执行自定义函数，同时执行两个sql
        String comKey = getSqlone(sql, key);
        return TTool.getLen(prefix, preLen) + DateUtil.format(new Date(), "yyyyMMdd") + TTool.autoGenericCode(comKey, len);
    }


    public void logtosql(String sql, String params, long times, int returns) {
        executeSqlnolog("insert into t_log_sql values(UUID(),?,?,?,sysdate(),?)",
                sql, params, times, returns);

    }
}