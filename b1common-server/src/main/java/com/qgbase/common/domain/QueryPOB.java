package com.qgbase.common.domain;

import com.qgbase.util.StringUtil;
import lombok.Data;

import java.util.Map;

/**
 * Created by lbb on 2018/5/3.
 * 主要用于：查询排序和页码处理
 */
@Data
public class QueryPOB {
    String  columnProp;
    String  columnOrder;
    Integer len=0;
    Integer page=0;

    public QueryPOB(Map queryMap){
        if (null != queryMap && queryMap.size() > 0) {
            if (StringUtil.isNotBlankIfStr(queryMap.get("columnProp"))&&StringUtil.isNotBlankIfStr(queryMap.get("columnOrder"))){
                columnProp = queryMap.get("columnProp")+"";
                columnOrder = queryMap.get("columnOrder")+"";
                columnOrder = columnOrder.substring(0,columnOrder.length()-3);
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("len"))) {
                len = Integer.valueOf(queryMap.get("len")+"");
            }
            if (StringUtil.isNotBlankIfStr(queryMap.get("page"))) {
                page = Integer.valueOf(queryMap.get("page")+"");
            }
        }
    }
}
