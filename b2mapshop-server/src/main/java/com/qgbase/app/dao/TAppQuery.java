package com.qgbase.app.dao;

import com.qgbase.common.dao.CommonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class TAppQuery {

    @Autowired
    private CommonDao commonDao;

    public Map getSqlMap(final String sql, Object... params) throws Exception{
        return commonDao.getSqlMap(sql,params);
    }
    public List getSqlList(final String sql, Object... params) throws Exception{
        return commonDao.getSql(sql,params);
    }
}
