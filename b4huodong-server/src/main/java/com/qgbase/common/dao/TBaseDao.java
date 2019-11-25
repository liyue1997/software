package com.qgbase.common.dao;

import com.qgbase.common.domain.TBaseEntity;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by lbb on 2018/4/24.
 * 主要用于：
 * todo Transactional 这个标志要不要加？？？？？
 */
@Repository
@Transactional
public class TBaseDao<T extends TBaseEntity> {
    @PersistenceContext
    EntityManager entityManager;
    //增加
    public T addobj(T obj)
    {
        Session session = entityManager.unwrap(Session.class);
        session.save(obj);
        return obj;
    }
    //修改
    public T updateobj(T obj)
    {
        Session session = entityManager.unwrap(Session.class);
        session.update(obj);
        return obj;
    }
    //修改
    public T saveOrUpdateobj(T obj)
    {
        Session session = entityManager.unwrap(Session.class);
        session.saveOrUpdate(obj);
        return obj;
    }
    //获取 根据业务id
    public T getobj(Class aClass,String objId)
    {
        Session session = entityManager.unwrap(Session.class);
        T obj = (T)session.get(aClass, objId);
        return obj;
    }

    //获取 根据业务id
    public T getobjClear(Class aClass,String objId)
    {
        Session session = entityManager.unwrap(Session.class);
        T obj = (T)session.get(aClass, objId);
        session.clear();
        return obj;
    }
    //删除 根据业务
    public void deleteobj(Class aClass,T obj)
    {
        Session session = entityManager.unwrap(Session.class);
        session.delete(entityManager.merge(obj));
    }


    //获取 根据业务id 多主键
    public T getobj(String[] objId)
    {
        return null;
    }
    //删除 根据业务id 多主键
    public void deleteobj(String[] objId)
    {

    }

}
