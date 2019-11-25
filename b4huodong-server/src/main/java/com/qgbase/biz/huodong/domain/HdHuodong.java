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
 * 主要用于：活动 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "hd_huodong")
public class HdHuodong extends TBaseEntity {
     @Id
    	@Column(name = "huodong_id",unique = true,columnDefinition = "varchar(64) COMMENT '活动编号'")
    @ExcelColumn(columnName="活动编号",order = 1,exportName = "huodong_id")
@NotNull(message = "活动编号不能为空")
    private String huodongId;//create by mark 活动编号

	@Column(name = "huodong_name",unique = true,columnDefinition = "varchar(32) COMMENT '活动名称'")
    @ExcelColumn(columnName="活动名称",order = 2,exportName = "huodong_name")
    private String huodongName;//create by mark 活动名称

	@Column(name = "huodong_pre",unique = true,columnDefinition = "varchar(32) COMMENT '活动前缀'")
    @ExcelColumn(columnName="活动前缀",order = 3,exportName = "huodong_pre")
    private String huodongPre;//create by mark 活动前缀

	@Column(name = "huodong_module",unique = true,columnDefinition = "varchar(32) COMMENT '活动模板'")
    @ExcelColumn(columnName="活动模板",order = 4,exportName = "huodong_module")
    private String huodongModule;//create by mark 活动模板

	@Column(name = "huodong_title",unique = true,columnDefinition = "varchar(32) COMMENT '主标题'")
    @ExcelColumn(columnName="主标题",order = 5,exportName = "huodong_title")
    private String huodongTitle;//create by mark 主标题

	@Column(name = "huodong_subtitle",unique = true,columnDefinition = "varchar(32) COMMENT '副标题'")
    @ExcelColumn(columnName="副标题",order = 6,exportName = "huodong_subtitle")
    private String huodongSubtitle;//create by mark 副标题

	@Column(name = "start_time",unique = true,columnDefinition = "datetime COMMENT '开始时间'")
    @ExcelColumn(columnName="开始时间",order = 7,exportName = "start_time")
    private Date startTime;//create by mark 开始时间

	@Column(name = "end_time",unique = true,columnDefinition = "datetime COMMENT '结束时间'")
    @ExcelColumn(columnName="结束时间",order = 8,exportName = "end_time")
    private Date endTime;//create by mark 结束时间

	@Column(name = "is_needpay",unique = true,columnDefinition = "int COMMENT '是否需要支付'")
    @ExcelColumn(columnName="是否需要支付",order = 9,exportName = "is_needpay")
    private Integer isNeedpay;//create by mark 是否需要支付

	@Column(name = "pay_money",unique = true,columnDefinition = "decimal COMMENT '支付金额'")
    @ExcelColumn(columnName="支付金额",order = 10,exportName = "pay_money")
    private String payMoney;//create by mark 支付金额

	@Column(name = "pay_fee",unique = true,columnDefinition = "decimal COMMENT '支付费用'")
    @ExcelColumn(columnName="支付费用",order = 11,exportName = "pay_fee")
    private String payFee;//create by mark 支付费用

	@Column(name = "user_limit",unique = true,columnDefinition = "int COMMENT '人员上限'")
    @ExcelColumn(columnName="人员上限",order = 12,exportName = "user_limit")
    private Integer userLimit;//create by mark 人员上限

	@Column(name = "huodong_status",unique = true,columnDefinition = "varchar(32) COMMENT '活动状态'")
    @ExcelColumn(columnName="活动状态",order = 13,exportName = "huodong_status")
    private String huodongStatus;//create by mark 活动状态

	@Column(name = "huodong_demo",unique = true,columnDefinition = "varchar(512) COMMENT '活动备注'")
    @ExcelColumn(columnName="活动备注",order = 14,exportName = "huodong_demo")
    private String huodongDemo;//create by mark 活动备注



	 @Override
    public String getPKid()
    {
        return huodongId;
    }
    @Override
    public  String getObjName(){
        return "HdHuodong";
    }
    @Override
    public  String getObjDesc(){
        return "活动";
    }

}