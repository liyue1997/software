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
 * 主要用于：活动用户 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "hd_huodong2user")
public class HdHuodong2user extends TBaseEntity {
     @Id
    	@Column(name = "huodonguser_id",unique = true,columnDefinition = "varchar(64) COMMENT '参与标识'")
    @ExcelColumn(columnName="参与标识",order = 1,exportName = "huodonguser_id")
@NotNull(message = "参与标识不能为空")
    private String huodonguserId;//create by mark 参与标识

	@Column(name = "huodong_id",unique = true,columnDefinition = "varchar(64) COMMENT '活动编号'")
    @ExcelColumn(columnName="活动编号",order = 2,exportName = "huodong_id")
@NotNull(message = "活动编号不能为空")
    private String huodongId;//create by mark 活动编号

	@Column(name = "user_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 3,exportName = "user_id")
@NotNull(message = "用户id不能为空")
    private String userId;//create by mark 用户id

	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(64) COMMENT '门店编码'")
    @ExcelColumn(columnName="门店编码",order = 4,exportName = "shop_id")
@NotNull(message = "门店编码不能为空")
    private String shopId;//create by mark 门店编码

	@Column(name = "user_car",unique = true,columnDefinition = "varchar(32) COMMENT '车牌号'")
    @ExcelColumn(columnName="车牌号",order = 5,exportName = "user_car")
    private String userCar;//create by mark 车牌号

	@Column(name = "user_phone",unique = true,columnDefinition = "varchar(32) COMMENT '用户手机号'")
    @ExcelColumn(columnName="用户手机号",order = 6,exportName = "user_phone")
    private String userPhone;//create by mark 用户手机号

	@Column(name = "user_cartype",unique = true,columnDefinition = "varchar(32) COMMENT '用户车型'")
    @ExcelColumn(columnName="用户车型",order = 7,exportName = "user_cartype")
    private String userCartype;//create by mark 用户车型

    @Column(name = "user_name",unique = true,columnDefinition = "varchar(32) COMMENT '用户姓名'")
    @ExcelColumn(columnName="用户姓名",order = 7,exportName = "user_name")
    private String userName;//create by mark 用户车型

    @Column(name = "user_sfz",unique = true,columnDefinition = "varchar(32) COMMENT '身份证'")
    @ExcelColumn(columnName="身份证",order = 7,exportName = "user_sfz")
    private String userSfz;//create by mark 用户车型

    @Column(name = "from_user",unique = true,columnDefinition = "varchar(32) COMMENT '推荐用户'")
    @ExcelColumn(columnName="推荐用户",order = 7,exportName = "from_user")
    private String fromUser;//create by mark 用户车型

	@Column(name = "info_status",unique = true,columnDefinition = "varchar(32) COMMENT '报名状态'")
    @ExcelColumn(columnName="报名状态",order = 8,exportName = "info_status")
    private String infoStatus;//create by mark 报名状态

	@Column(name = "pay_status",unique = true,columnDefinition = "varchar(32) COMMENT '支付状态'")
    @ExcelColumn(columnName="支付状态",order = 9,exportName = "pay_status")
    private String payStatus;//create by mark 支付状态

	@Column(name = "pay_order",unique = true,columnDefinition = "varchar(64) COMMENT '支付单据号'")
    @ExcelColumn(columnName="支付单据号",order = 10,exportName = "pay_order")
    private String payOrder;//create by mark 支付单据号

	@Column(name = "pay_type",unique = true,columnDefinition = "varchar(64) COMMENT '支付方式'")
    @ExcelColumn(columnName="支付方式",order = 11,exportName = "pay_type")
    private String payType;//create by mark 支付方式

	@Column(name = "pay_time",unique = true,columnDefinition = "datetime(50) COMMENT '支付时间'")
    @ExcelColumn(columnName="支付时间",order = 12,exportName = "pay_time")
    private Date payTime;//create by mark 支付时间

	@Column(name = "user_demo",unique = true,columnDefinition = "varchar(1024) COMMENT '备注'")
    @ExcelColumn(columnName="备注",order = 13,exportName = "user_demo")
    private String userDemo;//create by mark 备注

	@Column(name = "hx_time",unique = true,columnDefinition = "datetime(50) COMMENT '核销时间'")
    @ExcelColumn(columnName="核销时间",order = 14,exportName = "hx_time")
    private Date hxTime;//create by mark 核销时间

	@Column(name = "hx_user",unique = true,columnDefinition = "varchar(64) COMMENT '核销人员'")
    @ExcelColumn(columnName="核销人员",order = 15,exportName = "hx_user")
    private String hxUser;//create by mark 核销人员

	@Column(name = "jz_order",unique = true,columnDefinition = "varchar(64) COMMENT '结账单号'")
    @ExcelColumn(columnName="结账单号",order = 16,exportName = "jz_order")
    private String jzOrder;//create by mark 结账单号
    @Column(name = "pay_money",unique = true,columnDefinition = "decimal COMMENT '支付金额'")
    @ExcelColumn(columnName="支付金额",order = 10,exportName = "pay_money")
    private String payMoney;//create by mark 支付金额

    @Column(name = "pay_fee",unique = true,columnDefinition = "decimal COMMENT '支付费用'")
    @ExcelColumn(columnName="支付费用",order = 11,exportName = "pay_fee")
    private String payFee;//create by mark 支付费用



	 @Override
    public String getPKid()
    {
        return huodonguserId;
    }
    @Override
    public  String getObjName(){
        return "HdHuodong2user";
    }
    @Override
    public  String getObjDesc(){
        return "活动用户";
    }

}