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
 * 主要用于：门店 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "hd_shop")
public class HdShop extends TBaseEntity {
     @Id
    	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(64) COMMENT '门店编码'")
    @ExcelColumn(columnName="门店编码",order = 1,exportName = "shop_id")
@NotNull(message = "门店编码不能为空")
    private String shopId;//create by mark 门店编码

	@Column(name = "shop_pre",unique = true,columnDefinition = "varchar(64) COMMENT '门店前缀'")
    @ExcelColumn(columnName="门店前缀",order = 2,exportName = "shop_pre")
    private String shopPre;//create by mark 门店前缀

	@Column(name = "shop_name",unique = true,columnDefinition = "varchar(64) COMMENT '门店简称'")
    @ExcelColumn(columnName="门店简称",order = 3,exportName = "shop_name")
    private String shopName;//create by mark 门店简称

	@Column(name = "shop_fullname",unique = true,columnDefinition = "varchar(64) COMMENT '门店全称'")
    @ExcelColumn(columnName="门店全称",order = 4,exportName = "shop_fullname")
    private String shopFullname;//create by mark 门店全称

	@Column(name = "shop_lon",unique = true,columnDefinition = "varchar(64) COMMENT '经度'")
    @ExcelColumn(columnName="经度",order = 5,exportName = "shop_lon")
    private String shopLon;//create by mark 经度

	@Column(name = "shop_lat",unique = true,columnDefinition = "varchar(64) COMMENT '纬度'")
    @ExcelColumn(columnName="纬度",order = 6,exportName = "shop_lat")
    private String shopLat;//create by mark 纬度

	@Column(name = "zone_code",unique = true,columnDefinition = "varchar(64) COMMENT '区域编码'")
    @ExcelColumn(columnName="区域编码",order = 7,exportName = "zone_code")
    private String zoneCode;//create by mark 区域编码

	@Column(name = "shop_address",unique = true,columnDefinition = "varchar(512) COMMENT '门店地址'")
    @ExcelColumn(columnName="门店地址",order = 8,exportName = "shop_address")
    private String shopAddress;//create by mark 门店地址

	@Column(name = "shop_hetong",unique = true,columnDefinition = "varchar(64) COMMENT '合同编号'")
    @ExcelColumn(columnName="合同编号",order = 9,exportName = "shop_hetong")
    private String shopHetong;//create by mark 合同编号

	@Column(name = "shop_tel",unique = true,columnDefinition = "varchar(64) COMMENT '门店电话'")
    @ExcelColumn(columnName="门店电话",order = 10,exportName = "shop_tel")
    private String shopTel;//create by mark 门店电话

	@Column(name = "shop_status",unique = true,columnDefinition = "varchar(32) COMMENT '门店状态'")
    @ExcelColumn(columnName="门店状态",order = 11,exportName = "shop_status")
    private String shopStatus;//create by mark 门店状态

	@Column(name = "dls_id",unique = true,columnDefinition = "varchar(64) COMMENT '代理商id'")
    @ExcelColumn(columnName="代理商id",order = 12,exportName = "dls_id")
    private String dlsId;//create by mark 代理商id

	@Column(name = "yw_user_id",unique = true,columnDefinition = "varchar(64) COMMENT '业务人员id'")
    @ExcelColumn(columnName="业务人员id",order = 13,exportName = "yw_user_id")
    private String ywUserId;//create by mark 业务人员id

	@Column(name = "hk_speed",unique = true,columnDefinition = "varchar(64) COMMENT '汇款速度'")
    @ExcelColumn(columnName="汇款速度",order = 14,exportName = "hk_speed")
    private String hkSpeed;//create by mark 汇款速度

	@Column(name = "shop_level",unique = true,columnDefinition = "varchar(64) COMMENT '门店等级'")
    @ExcelColumn(columnName="门店等级",order = 15,exportName = "shop_level")
    private String shopLevel;//create by mark 门店等级



	 @Override
    public String getPKid()
    {
        return shopId;
    }
    @Override
    public  String getObjName(){
        return "HdShop";
    }
    @Override
    public  String getObjDesc(){
        return "门店";
    }

}