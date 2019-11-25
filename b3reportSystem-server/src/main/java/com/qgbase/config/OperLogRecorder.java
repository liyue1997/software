package com.qgbase.config;

import com.qgbase.biz.operRecord.service.OprLogService;
import com.qgbase.common.domain.FlowModel;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Author:  cuiwei
 * Date:  2018/5/15
 * Time:  10:47
 */
public class OperLogRecorder  {


    @Autowired
    OprLogService oprLogService;

    public boolean flow(FlowModel flowModel) throws Exception {
        //OprLog opr = (OprLog) flowModel.getData();
        //oprLogService.addobj(opr, flowModel.getOperInfo());
//        if (opr.getExtend1() != null) {
//            logger.error("oprLog", opr);
//        }
        return false;
    }

    protected boolean validity(FlowModel flowModel) {
        return flowModel != null;
    }
}
