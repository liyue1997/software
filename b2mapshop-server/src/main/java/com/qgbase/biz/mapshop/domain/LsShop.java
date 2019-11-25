package com.qgbase.biz.mapshop.domain;

import com.qgbase.common.domain.TBaseEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import com.qgbase.excel.annotation.ExcelColumn;

import java.util.Date;

/**
 * Created by Mark on 2019-08-17
 * 主要用于：商户信息 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "ls_shop")
public class LsShop extends TBaseEntity {
     @Id
    	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(50) COMMENT '商户编号'")
    @ExcelColumn(columnName="商户编号",order = 1,exportName = "shop_id")
@NotNull(message = "商户编号不能为空")
    private String shopId;//create by mark 商户编号

	@Column(name = "shop_name",unique = true,columnDefinition = "varchar(50) COMMENT '商户简称'")
    @ExcelColumn(columnName="商户简称",order = 2,exportName = "shop_name")
    private String shopName;//create by mark 商户简称

	@Column(name = "shop_fullname",unique = true,columnDefinition = "varchar(50) COMMENT '商户全称'")
    @ExcelColumn(columnName="商户全称",order = 3,exportName = "shop_fullname")
    private String shopFullname;//create by mark 商户全称

	@Column(name = "shop_tel",unique = true,columnDefinition = "varchar(50) COMMENT '电话'")
    @ExcelColumn(columnName="电话",order = 4,exportName = "shop_tel")
    private String shopTel;//create by mark 电话

	@Column(name = "shop_phone",unique = true,columnDefinition = "varchar(50) COMMENT '手机号'")
    @ExcelColumn(columnName="手机号",order = 5,exportName = "shop_phone")
    private String shopPhone;//create by mark 手机号

	@Column(name = "shop_hetong",unique = true,columnDefinition = "varchar(50) COMMENT '合同编号'")
    @ExcelColumn(columnName="合同编号",order = 6,exportName = "shop_hetong")
    private String shopHetong;//create by mark 合同编号

	@Column(name = "shop_lat",unique = true,columnDefinition = "varchar(50) COMMENT '维度'")
    @ExcelColumn(columnName="维度",order = 7,exportName = "shop_lat")
    private String shopLat;//create by mark 维度

	@Column(name = "shop_link",unique = true,columnDefinition = "varchar(50) COMMENT '介绍连接'")
    @ExcelColumn(columnName="介绍连接",order = 8,exportName = "shop_link")
    private String shopLink;//create by mark 介绍连接

	@Column(name = "city_name",unique = true,columnDefinition = "varchar(255) COMMENT '城市名称'")
    @ExcelColumn(columnName="城市名称",order = 9,exportName = "city_name")
    private String cityName;//create by mark 城市名称

	@Column(name = "area_name",unique = true,columnDefinition = "varchar(255) COMMENT '区域名称'")
    @ExcelColumn(columnName="区域名称",order = 10,exportName = "area_name")
    private String areaName;//create by mark 区域名称

	@Column(name = "shop_address",unique = true,columnDefinition = "varchar(512) COMMENT '地址'")
    @ExcelColumn(columnName="地址",order = 11,exportName = "shop_address")
    private String shopAddress;//create by mark 地址

	@Column(name = "shop_route",unique = true,columnDefinition = "varchar(512) COMMENT '交通指引'")
    @ExcelColumn(columnName="交通指引",order = 12,exportName = "shop_route")
    private String shopRoute;//create by mark 交通指引

	@Column(name = "shop_des",unique = true,columnDefinition = "varchar(512) COMMENT '备注'")
    @ExcelColumn(columnName="备注",order = 13,exportName = "shop_des")
    private String shopDes;//create by mark 备注

	@Column(name = "shop_lon",unique = true,columnDefinition = "varchar(50) COMMENT '经度'")
    @ExcelColumn(columnName="经度",order = 14,exportName = "shop_lon")
    private String shopLon;//create by mark 经度

	@Column(name = "shop_status",unique = true,columnDefinition = "varchar(50) COMMENT '审核状态'")
    @ExcelColumn(columnName="审核状态",order = 15,exportName = "shop_status")
    private String shopStatus;//create by mark 审核状态

	@Column(name = "shop_score",unique = true,columnDefinition = "varchar(50) COMMENT '评分'")
    @ExcelColumn(columnName="评分",order = 16,exportName = "shop_score")
    private String shopScore;//create by mark 评分

	@Column(name = "shop_scoredes",unique = true,columnDefinition = "varchar(500) COMMENT '评分说明'")
    @ExcelColumn(columnName="评分说明",order = 17,exportName = "shop_scoredes")
    private String shopScoredes;//create by mark 评分说明

	@Column(name = "shop_average",unique = true,columnDefinition = "varchar(50) COMMENT '人均消费'")
    @ExcelColumn(columnName="人均消费",order = 18,exportName = "shop_average")
    private String shopAverage;//create by mark 人均消费

	@Column(name = "shop_tags",unique = true,columnDefinition = "varchar(50) COMMENT '商户标签'")
    @ExcelColumn(columnName="商户标签",order = 19,exportName = "shop_tags")
    private String shopTags;//create by mark 商户标签

    @Transient
    private String pictureId;
    @Transient
    private String pictureUrl;

	 @Override
    public String getPKid()
    {
        return shopId;
    }
    @Override
    public  String getObjName(){
        return "LsShop";
    }
    @Override
    public  String getObjDesc(){
        return "商户信息";
    }

}