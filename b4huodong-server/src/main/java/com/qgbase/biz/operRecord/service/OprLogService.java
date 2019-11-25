package com.qgbase.biz.operRecord.service;

import com.qgbase.biz.operRecord.domain.OprLog;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lbb on 2018/5/14.
 * 主要用于：操作日志处理
 */
@Service
public class OprLogService extends TBaseBo<OprLog>{
    @Autowired
    CommonDao commonDao;
    @Override
    public Class getEntityClass() {
        return OprLog.class;
    }

    @Override
    public OprLog createObj() {
        return new OprLog();
    }

    /**
     * 保存日志
     * @param obj  业务对象
     * @param oper 操作者
     * @return 返回
     * @throws Exception 异常
     */
    @Override
    public OprLog addobj(OprLog obj, OperInfo oper) throws Exception {
        obj.setOprId(commonDao.getNewKey("ts_opr","opr",3,4));
        return super.addobj(obj, oper);
    }

}
