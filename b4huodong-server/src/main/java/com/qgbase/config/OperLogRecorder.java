package com.qgbase.config;

import com.google.gson.Gson;
import com.qgbase.biz.operRecord.domain.OprLog;
import com.qgbase.biz.operRecord.service.OprLogService;
import com.qgbase.common.domain.FlowModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Author:  cuiwei
 * Date:  2018/5/15
 * Time:  10:47
 */
public class OperLogRecorder  {


    @Autowired
    OprLogService oprLogService;


    protected final Logger logger = LoggerFactory.getLogger(OperLogRecorder.class);

    public boolean flow(FlowModel flowModel) throws Exception {
        OprLog opr = (OprLog) flowModel.getData();
//        oprLogService.addobj(opr, flowModel.getOperInfo());
//        if (opr.getExtend1() != null) {
//            logger.error("oprLog", opr);
//        }
        Gson gson = new Gson();
        String jsonStr = gson.toJson(opr);
        logger.info("操作信息："+jsonStr);
        return false;
    }

    protected boolean validity(FlowModel flowModel) {
        return flowModel != null;
    }
}
