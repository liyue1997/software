package com.qgbase.common.domain;

import lombok.Data;

/**
 * Author:  cuiwei
 * Date:  2018/5/15
 * Time:  10:49
 */
@Data
public class FlowModel {
    public FlowModel(OperInfo operInfo, Object data) {
        this.operInfo = operInfo;
        this.data = data;
    }

    private OperInfo operInfo;
    private Object data;
}
