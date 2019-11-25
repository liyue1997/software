package com.qgbase.biz.info.domain;

import com.qgbase.common.domain.TBaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.qgbase.excel.annotation.ExcelColumn;

import java.util.Date;

/**
 * Created by Mark on 2019-08-03
 * 主要用于：手机端版本 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "app_ver")
public class AppVer extends TBaseEntity {
    @Id
    @Column(name = "ver_id", unique = true, columnDefinition = "varchar(50) COMMENT '主键'")
    @ExcelColumn(columnName = "主键", order = 1, exportName = "ver_id")
    @NotNull(message = "主键不能为空")
    private String verId;//create by mark 主键

    @Column(name = "t_usertype", unique = true, columnDefinition = "varchar(50) COMMENT '用户类型'")
    @ExcelColumn(columnName = "用户类型", order = 2, exportName = "t_usertype")
    private String tUsertype;//create by mark 用户类型

    @Column(name = "t_ver", unique = true, columnDefinition = "varchar(50) COMMENT '版本号'")
    @ExcelColumn(columnName = "版本号", order = 3, exportName = "t_ver")
    private String tVer;//create by mark 版本号

    @Column(name = "infoBeforePaid", unique = true, columnDefinition = "varchar(50) COMMENT '购买前提示信息'")
    @ExcelColumn(columnName = "购买前提示信息", order = 4, exportName = "infoBeforePaid")
    private String infoBeforePaid;//create by mark 购买前提示信息

    @Column(name = "infoBeforeUse", unique = true, columnDefinition = "varchar(50) COMMENT '使用前提示信息'")
    @ExcelColumn(columnName = "使用前提示信息", order = 5, exportName = "infoBeforeUse")
    private String infoBeforeUse;//create by mark 使用前提示信息

    @Column(name = "isWeixinpay", unique = true, columnDefinition = "int(50) COMMENT '是否显示微信支付'")
    @ExcelColumn(columnName = "是否显示微信支付", order = 6, exportName = "isWeixinpay")
    private Integer isWeixinpay;//create by mark 是否显示微信支付

    @Column(name = "isweixinwappay", unique = true, columnDefinition = "int(50) COMMENT '是否显示微信网页支付'")
    @ExcelColumn(columnName = "是否显示微信网页支付", order = 7, exportName = "isweixinwappay")
    private Integer isweixinwappay;//create by mark 是否显示微信网页支付

    @Column(name = "iszfbpay", unique = true, columnDefinition = "int(50) COMMENT '是否显示支付宝支付'")
    @ExcelColumn(columnName = "是否显示支付宝支付", order = 8, exportName = "iszfbpay")
    private Integer iszfbpay;//create by mark 是否显示支付宝支付

    @Column(name = "iszfbpaywap", unique = true, columnDefinition = "int(50) COMMENT '是否显示支付宝网页支付'")
    @ExcelColumn(columnName = "是否显示支付宝网页支付", order = 9, exportName = "iszfbpaywap")
    private Integer iszfbpaywap;//create by mark 是否显示支付宝网页支付

    @Column(name = "strPrice", unique = true, columnDefinition = "varchar(50) COMMENT '最低充值金额'")
    @ExcelColumn(columnName = "最低充值金额", order = 10, exportName = "strPrice")
    private String strPrice;//create by mark 最低充值金额

    @Column(name = "demolink", unique = true, columnDefinition = "varchar(50) COMMENT '演示链接'")
    @ExcelColumn(columnName = "演示链接", order = 11, exportName = "demolink")
    private String demolink;//create by mark 演示链接

    @Column(name = "lawlink", unique = true, columnDefinition = "varchar(50) COMMENT '免责链接'")
    @ExcelColumn(columnName = "免责链接", order = 12, exportName = "lawlink")
    private String lawlink;//create by mark 免责链接

    @Column(name = "downloadlink", unique = true, columnDefinition = "varchar(50) COMMENT '下载链接'")
    @ExcelColumn(columnName = "下载链接", order = 13, exportName = "downloadlink")
    private String downloadlink;//create by mark 下载链接

    @Column(name = "paid", unique = true, columnDefinition = "varchar(50) COMMENT '购买'")
    @ExcelColumn(columnName = "购买", order = 14, exportName = "paid")
    private String paid;//create by mark 购买


    @Override
    public String getPKid() {
        return String.valueOf(verId);
    }

    @Override
    public String getObjName() {
        return "AppVer";
    }

    @Override
    public String getObjDesc() {
        return "手机端版本";
    }

}