package com.qgbase.app.domain;

public class CommonRet
{
    public String ret = "success";
    public String info = "";
    public String errcode = "0";


    public static CommonRet getSuccess(String ainfo)
    {
        CommonRet ret =new CommonRet();
        ret.info=ainfo;
        return ret;
    }
    /*
     * 0: 没有错误
     * zj01:机构未审核
     * zj02:余额不足
     */
    public static CommonRet getFail(String ainfo)
    {
        CommonRet ret =new CommonRet();
        ret.ret="fail";
        ret.info=ainfo;
        ret.errcode="-1";
        return ret;
    }

}

