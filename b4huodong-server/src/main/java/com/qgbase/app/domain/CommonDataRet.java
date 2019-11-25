package com.qgbase.app.domain;

import com.qgbase.common.domain.TBaseEntity;

public class CommonDataRet extends CommonRet {
    public TBaseEntity data=null;

    public static CommonDataRet getObject(TBaseEntity obj)
    {
        CommonDataRet ret =new CommonDataRet();
        ret.data=obj;
        return ret;
    }
}
