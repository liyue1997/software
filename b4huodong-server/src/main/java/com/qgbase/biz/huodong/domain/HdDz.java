package com.qgbase.biz.huodong.domain;

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
 * Created by Mark on 2019-10-29
 * 主要用于：对账单 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "hd_dz")
public class HdDz extends TBaseEntity {
     @Id
    	@Column(name = "jz_order_id",unique = true,columnDefinition = "varchar(64) COMMENT '结账单号'")
    @ExcelColumn(columnName="结账单号",order = 1,exportName = "jz_order_id")
@NotNull(message = "结账单号不能为空")
    private String jzOrderId;//create by mark 结账单号

	@Column(name = "huodong_id",unique = true,columnDefinition = "varchar(64) COMMENT '活动编号'")
    @ExcelColumn(columnName="活动编号",order = 2,exportName = "huodong_id")
@NotNull(message = "活动编号不能为空")
    private String huodongId;//create by mark 活动编号

	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(64) COMMENT '门店编码'")
    @ExcelColumn(columnName="门店编码",order = 3,exportName = "shop_id")
@NotNull(message = "门店编码不能为空")
    private String shopId;//create by mark 门店编码

	@Column(name = "user_count",unique = true,columnDefinition = "int(50) COMMENT '人员数量'")
    @ExcelColumn(columnName="人员数量",order = 4,exportName = "user_count")
    private Integer userCount;//create by mark 人员数量

	@Column(name = "pay_money",unique = true,columnDefinition = "decimal(50) COMMENT '支付金额'")
    @ExcelColumn(columnName="支付金额",order = 5,exportName = "pay_money")
    private String payMoney;//create by mark 支付金额

	@Column(name = "pay_fee",unique = true,columnDefinition = "decimal(50) COMMENT '支付费用'")
    @ExcelColumn(columnName="支付费用",order = 6,exportName = "pay_fee")
    private String payFee;//create by mark 支付费用

	@Column(name = "pay_needmoney",unique = true,columnDefinition = "decimal(50) COMMENT '应付金额'")
    @ExcelColumn(columnName="应付金额",order = 7,exportName = "pay_needmoney")
    private String payNeedmoney;//create by mark 应付金额

	@Column(name = "pay_realmoney",unique = true,columnDefinition = "decimal(50) COMMENT '实付金额'")
    @ExcelColumn(columnName="实付金额",order = 8,exportName = "pay_realmoney")
    private String payRealmoney;//create by mark 实付金额

	@Column(name = "pay_time",unique = true,columnDefinition = "datetime(50) COMMENT '付款时间'")
    @ExcelColumn(columnName="付款时间",order = 9,exportName = "pay_time")
    private Date payTime;//create by mark 付款时间

	@Column(name = "pay_user",unique = true,columnDefinition = "varchar(64) COMMENT '付款人员'")
    @ExcelColumn(columnName="付款人员",order = 10,exportName = "pay_user")
    private String payUser;//create by mark 付款人员

	@Column(name = "pay_order",unique = true,columnDefinition = "varchar(64) COMMENT '付款单据号'")
    @ExcelColumn(columnName="付款单据号",order = 11,exportName = "pay_order")
    private String payOrder;//create by mark 付款单据号

	@Column(name = "pay_type",unique = true,columnDefinition = "varchar(64) COMMENT '付款方式'")
    @ExcelColumn(columnName="付款方式",order = 12,exportName = "pay_type")
    private String payType;//create by mark 付款方式

	@Column(name = "payr_demo",unique = true,columnDefinition = "varchar(1024) COMMENT '备注'")
    @ExcelColumn(columnName="备注",order = 13,exportName = "payr_demo")
    private String payrDemo;//create by mark 备注



	 @Override
    public String getPKid()
    {
        return jzOrderId;
    }
    @Override
    public  String getObjName(){
        return "HdDz";
    }
    @Override
    public  String getObjDesc(){
        return "对账单";
    }

}