package com.qgbase.app.domain;

import java.util.Map;

public class CommonObjectRet extends CommonRet {
    public Map data=null;

    public static CommonObjectRet getObject(Map obj)
    {
        CommonObjectRet ret =new CommonObjectRet();
        ret.data=obj;
        return ret;
    }
}
