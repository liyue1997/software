package com.qgbase.app.domain;

import com.qgbase.util.PageControl;

import java.util.List;

public class CommonPageRet extends CommonRet {
    public List data=null;

    public static CommonPageRet getObject(PageControl obj)
    {
        CommonPageRet ret =new CommonPageRet();
        ret.data=obj.getList();

        return ret;
    }

    public static CommonPageRet getObject(List obj)
    {
        CommonPageRet ret =new CommonPageRet();
        ret.data=obj;

        return ret;
    }
}