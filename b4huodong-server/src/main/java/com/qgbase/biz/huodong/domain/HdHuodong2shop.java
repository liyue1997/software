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
 * 主要用于：活动门店 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "hd_huodong2shop")
public class HdHuodong2shop extends TBaseEntity {
     @Id
    	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(64) COMMENT '门店编码'")
    @ExcelColumn(columnName="门店编码",order = 2,exportName = "shop_id")
@NotNull(message = "门店编码不能为空")
    private String shopId;//create by mark 门店编码

	@Column(name = "huodong_id",unique = true,columnDefinition = "varchar(64) COMMENT '活动编号'")
    @ExcelColumn(columnName="活动编号",order = 1,exportName = "huodong_id")
@NotNull(message = "活动编号不能为空")
    private String huodongId;//create by mark 活动编号

	@Column(name = "huodong_title",unique = true,columnDefinition = "varchar(32) COMMENT '主标题'")
    @ExcelColumn(columnName="主标题",order = 3,exportName = "huodong_title")
    private String huodongTitle;//create by mark 主标题

	@Column(name = "huodong_subtitle",unique = true,columnDefinition = "varchar(32) COMMENT '副标题'")
    @ExcelColumn(columnName="副标题",order = 4,exportName = "huodong_subtitle")
    private String huodongSubtitle;//create by mark 副标题

	@Column(name = "user_limit",unique = true,columnDefinition = "int(50) COMMENT '人员上限'")
    @ExcelColumn(columnName="人员上限",order = 5,exportName = "user_limit")
    private Integer userLimit;//create by mark 人员上限

	@Column(name = "huodong_status",unique = true,columnDefinition = "varchar(32) COMMENT '活动状态'")
    @ExcelColumn(columnName="活动状态",order = 6,exportName = "huodong_status")
    private String huodongStatus;//create by mark 活动状态

	@Column(name = "huodong_demo",unique = true,columnDefinition = "varchar(512) COMMENT '活动备注'")
    @ExcelColumn(columnName="活动备注",order = 7,exportName = "huodong_demo")
    private String huodongDemo;//create by mark 活动备注

	@Column(name = "huodong_url",unique = true,columnDefinition = "varchar(512) COMMENT '推广链接'")
    @ExcelColumn(columnName="推广链接",order = 8,exportName = "huodong_url")
    private String huodongUrl;//create by mark 推广链接



	 @Override
    public String getPKid()
    {
        return huodongId+shopId;
    }
    @Override
    public  String getObjName(){
        return "HdHuodong2shop";
    }
    @Override
    public  String getObjDesc(){
        return "活动门店";
    }

}