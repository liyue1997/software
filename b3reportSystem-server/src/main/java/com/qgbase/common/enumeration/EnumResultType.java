package com.qgbase.common.enumeration;

/**
 * Created by lbb on 2018/4/27.
 * 主要用于：返回结果枚举信息
 */
public enum EnumResultType {
    SUCCESS("200","操作成功"),
    SAVE_SUCCESS("201","保存成功"),
    DEL_SUCCESS("202","删除成功"),
    UPDATE_SUCCESS("203","修改成功"),
    LOGIN_SUCCESS("204","登录成功"),
    LOGIN_FAILED("205","登录失败，用户名密码错误"),
    ADDMONEY_SUCCESS("300","支付成功"),
    ADDMONEY_FAILED("301","支付失败"),
    SUBTRACTMONEY_SUCCESS("400","扣除成功"),
    SUBTRACTMONEY_FAILED("401","扣除失败"),
    LOGIN_FAILED_VERIFY_EXPIRED("205","登录失败，验证码失效"),
    LOGIN_FAILED_VERIFY_ERROR("205","登录失败，验证码错误"),
    EXCEPTION("-1","系统繁忙");
    private String code;
    private String msg;
    EnumResultType(String code, String msg){
        this.code=code;
        this.msg=msg;
    }

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
