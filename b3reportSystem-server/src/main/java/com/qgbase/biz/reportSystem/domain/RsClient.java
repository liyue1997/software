package com.qgbase.biz.reportSystem.domain;

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
 * Created by Mark on 2019-10-09
 * 主要用于：客户 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "rs_client")
public class RsClient extends TBaseEntity {
    @Id
    @Column(name = "client_id",unique = true,columnDefinition = "varchar(64) COMMENT '客户编码'")
    @ExcelColumn(columnName="客户编码",order = 1,exportName = "client_id")
    @NotNull(message = "客户编码不能为空")
    private String clientId;//create by mark 客户编码

	@Column(name = "client_name",unique = true,columnDefinition = "varchar(64) COMMENT '客户简称'")
    @ExcelColumn(columnName="客户简称",order = 2,exportName = "client_name")
    private String clientName;//create by mark 客户简称

	@Column(name = "client_fullname",unique = true,columnDefinition = "varchar(64) COMMENT '客户全称'")
    @ExcelColumn(columnName="客户全称",order = 3,exportName = "client_fullname")
    private String clientFullname;//create by mark 客户全称

	@Column(name = "client_lon",unique = true,columnDefinition = "varchar(64) COMMENT '经度'")
    @ExcelColumn(columnName="经度",order = 4,exportName = "client_lon")
    private String clientLon;//create by mark 经度

	@Column(name = "client_lat",unique = true,columnDefinition = "varchar(64) COMMENT '纬度'")
    @ExcelColumn(columnName="纬度",order = 5,exportName = "client_lat")
    private String clientLat;//create by mark 纬度

	@Column(name = "zone_code",unique = true,columnDefinition = "varchar(64) COMMENT '区域编码'")
    @ExcelColumn(columnName="区域编码",order = 6,exportName = "zone_code")
    private String zoneCode;//create by mark 区域编码

	@Column(name = "client_address",unique = true,columnDefinition = "varchar(512) COMMENT '代理商地址'")
    @ExcelColumn(columnName="代理商地址",order = 7,exportName = "client_address")
    private String clientAddress;//create by mark 代理商地址

	@Column(name = "client_hetong",unique = true,columnDefinition = "varchar(64) COMMENT '合同编号'")
    @ExcelColumn(columnName="合同编号",order = 8,exportName = "client_hetong")
    private String clientHetong;//create by mark 合同编号

	@Column(name = "client_tel",unique = true,columnDefinition = "varchar(64) COMMENT '代理商电话'")
    @ExcelColumn(columnName="代理商电话",order = 9,exportName = "client_tel")
    private String clientTel;//create by mark 代理商电话

	@Column(name = "client_status",unique = true,columnDefinition = "varchar(512) COMMENT '代理商状态'")
    @ExcelColumn(columnName="代理商状态",order = 10,exportName = "client_status")
    private String clientStatus;//create by mark 代理商状态

	@Column(name = "dls_id",unique = true,columnDefinition = "varchar(64) COMMENT '代理商id'")
    @ExcelColumn(columnName="代理商id",order = 11,exportName = "dls_id")
    private String dlsId;//create by mark 代理商id

	@Column(name = "yw_user_id",unique = true,columnDefinition = "varchar(64) COMMENT '业务人员id'")
    @ExcelColumn(columnName="业务人员id",order = 12,exportName = "yw_user_id")
    private String ywUserId;//create by mark 业务人员id

	@Column(name = "hk_speed",unique = true,columnDefinition = "varchar(64) COMMENT '汇款速度'")
    @ExcelColumn(columnName="汇款速度",order = 13,exportName = "hk_speed")
    private String hkSpeed;//create by mark 汇款速度

	@Column(name = "client_level",unique = true,columnDefinition = "varchar(64) COMMENT '客户等级'")
    @ExcelColumn(columnName="客户等级",order = 14,exportName = "client_level")
    private String clientLevel;//create by mark 客户等级



	 @Override
    public String getPKid()
    {
        return clientId;
    }
    @Override
    public  String getObjName(){
        return "RsClient";
    }
    @Override
    public  String getObjDesc(){
        return "客户";
    }

}