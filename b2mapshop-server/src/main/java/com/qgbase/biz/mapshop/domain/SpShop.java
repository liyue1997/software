package com.qgbase.biz.mapshop.domain;

import com.qgbase.common.domain.TBaseEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import com.qgbase.excel.annotation.ExcelColumn;

import java.util.Date;

/**
 * Created by Mark on 2019-08-22
 * 主要用于：商铺 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "sp_shop")
public class SpShop extends TBaseEntity {
     @Id
    	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(64) COMMENT '商铺ID'")
    @ExcelColumn(columnName="商铺ID",order = 1,exportName = "shop_id")
@NotNull(message = "商铺ID不能为空")
    private String shopId;//create by mark 商铺ID

	@Column(name = "shop_name",unique = true,columnDefinition = "varchar(64) COMMENT '商铺简称'")
    @ExcelColumn(columnName="商铺简称",order = 2,exportName = "shop_name")
    private String shopName;//create by mark 商铺简称

	@Column(name = "shop_fullname",unique = true,columnDefinition = "varchar(64) COMMENT '商铺全称'")
    @ExcelColumn(columnName="商铺全称",order = 3,exportName = "shop_fullname")
    private String shopFullname;//create by mark 商铺全称

	@Column(name = "shop_tel",unique = true,columnDefinition = "varchar(64) COMMENT '商品电话'")
    @ExcelColumn(columnName="商品电话",order = 4,exportName = "shop_tel")
    private String shopTel;//create by mark 商品电话

	@Column(name = "shop_phone",unique = true,columnDefinition = "varchar(32) COMMENT '商铺手机'")
    @ExcelColumn(columnName="商铺手机",order = 5,exportName = "shop_phone")
    private String shopPhone;//create by mark 商铺手机

	@Column(name = "shop_lon",unique = true,columnDefinition = "varchar(64) COMMENT '经度'")
    @ExcelColumn(columnName="经度",order = 6,exportName = "shop_lon")
    private String shopLon;//create by mark 经度

	@Column(name = "shop_lat",unique = true,columnDefinition = "varchar(64) COMMENT '纬度'")
    @ExcelColumn(columnName="纬度",order = 7,exportName = "shop_lat")
    private String shopLat;//create by mark 纬度

	@Column(name = "city_name",unique = true,columnDefinition = "varchar(64) COMMENT '城市'")
    @ExcelColumn(columnName="城市",order = 8,exportName = "city_name")
    private String cityName;//create by mark 城市

	@Column(name = "area_name",unique = true,columnDefinition = "varchar(64) COMMENT '区域'")
    @ExcelColumn(columnName="区域",order = 9,exportName = "area_name")
    private String areaName;//create by mark 区域

	@Column(name = "shop_address",unique = true,columnDefinition = "varchar(128) COMMENT '商铺地址'")
    @ExcelColumn(columnName="商铺地址",order = 10,exportName = "shop_address")
    private String shopAddress;//create by mark 商铺地址

	@Column(name = "shop_status",unique = true,columnDefinition = "int(50) COMMENT '商铺审核状态'")
    @ExcelColumn(columnName="商铺审核状态",order = 11,exportName = "shop_status")
    private Integer shopStatus;//create by mark 商铺审核状态

	@Column(name = "shop_score",unique = true,columnDefinition = "varchar(32) COMMENT '商铺评分'")
    @ExcelColumn(columnName="商铺评分",order = 12,exportName = "shop_score")
    private String shopScore;//create by mark 商铺评分

	@Column(name = "shop_average",unique = true,columnDefinition = "bigint(50) COMMENT '人均消费'")
    @ExcelColumn(columnName="人均消费",order = 13,exportName = "shop_average")
    private String shopAverage;//create by mark 人均消费

	@Column(name = "shop_tags",unique = true,columnDefinition = "varchar(64) COMMENT '商铺标签'")
    @ExcelColumn(columnName="商铺标签",order = 14,exportName = "shop_tags")
    private String shopTags;//create by mark 商铺标签

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
        return "SpShop";
    }
    @Override
    public  String getObjDesc(){
        return "商铺";
    }

}