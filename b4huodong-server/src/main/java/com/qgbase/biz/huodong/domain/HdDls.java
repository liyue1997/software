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
 * 主要用于：代理商 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "hd_dls")
public class HdDls extends TBaseEntity {
     @Id
    	@Column(name = "dls_id",unique = true,columnDefinition = "varchar(64) COMMENT '代理商编码'")
    @ExcelColumn(columnName="代理商编码",order = 1,exportName = "dls_id")
@NotNull(message = "代理商编码不能为空")
    private String dlsId;//create by mark 代理商编码

	@Column(name = "dls_name",unique = true,columnDefinition = "varchar(64) COMMENT '代理商简称'")
    @ExcelColumn(columnName="代理商简称",order = 2,exportName = "dls_name")
    private String dlsName;//create by mark 代理商简称

	@Column(name = "dls_fullname",unique = true,columnDefinition = "varchar(64) COMMENT '代理商全称'")
    @ExcelColumn(columnName="代理商全称",order = 3,exportName = "dls_fullname")
    private String dlsFullname;//create by mark 代理商全称

	@Column(name = "dls_lon",unique = true,columnDefinition = "varchar(64) COMMENT '经度'")
    @ExcelColumn(columnName="经度",order = 4,exportName = "dls_lon")
    private String dlsLon;//create by mark 经度

	@Column(name = "dls_lat",unique = true,columnDefinition = "varchar(64) COMMENT '纬度'")
    @ExcelColumn(columnName="纬度",order = 5,exportName = "dls_lat")
    private String dlsLat;//create by mark 纬度

	@Column(name = "zone_code",unique = true,columnDefinition = "varchar(64) COMMENT '区域编码'")
    @ExcelColumn(columnName="区域编码",order = 6,exportName = "zone_code")
    private String zoneCode;//create by mark 区域编码

	@Column(name = "dls_address",unique = true,columnDefinition = "varchar(512) COMMENT '代理商地址'")
    @ExcelColumn(columnName="代理商地址",order = 7,exportName = "dls_address")
    private String dlsAddress;//create by mark 代理商地址

	@Column(name = "dls_hetong",unique = true,columnDefinition = "varchar(64) COMMENT '合同编号'")
    @ExcelColumn(columnName="合同编号",order = 8,exportName = "dls_hetong")
    private String dlsHetong;//create by mark 合同编号

	@Column(name = "dls_tel",unique = true,columnDefinition = "varchar(64) COMMENT '代理商电话'")
    @ExcelColumn(columnName="代理商电话",order = 9,exportName = "dls_tel")
    private String dlsTel;//create by mark 代理商电话

	@Column(name = "dls_status",unique = true,columnDefinition = "varchar(512) COMMENT '代理商状态'")
    @ExcelColumn(columnName="代理商状态",order = 10,exportName = "dls_status")
    private String dlsStatus;//create by mark 代理商状态



	 @Override
    public String getPKid()
    {
        return dlsId;
    }
    @Override
    public  String getObjName(){
        return "HdDls";
    }
    @Override
    public  String getObjDesc(){
        return "代理商";
    }

}