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
 * 主要用于：区域 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "rs_zone")
public class RsZone extends TBaseEntity {
     @Id
    	@Column(name = "zone_code",unique = true,columnDefinition = "varchar(64) COMMENT '区域编码'")
    @ExcelColumn(columnName="区域编码",order = 1,exportName = "zone_code")
@NotNull(message = "区域编码不能为空")
    private String zoneCode;//create by mark 区域编码

	@Column(name = "zone_name",unique = true,columnDefinition = "varchar(64) COMMENT '区域简称'")
    @ExcelColumn(columnName="区域简称",order = 2,exportName = "zone_name")
    private String zoneName;//create by mark 区域简称

	@Column(name = "zone_fullname",unique = true,columnDefinition = "varchar(64) COMMENT '区域全称'")
    @ExcelColumn(columnName="区域全称",order = 3,exportName = "zone_fullname")
    private String zoneFullname;//create by mark 区域全称

	@Column(name = "zone_lon",unique = true,columnDefinition = "varchar(64) COMMENT '经度'")
    @ExcelColumn(columnName="经度",order = 4,exportName = "zone_lon")
    private String zoneLon;//create by mark 经度

	@Column(name = "zone_lat",unique = true,columnDefinition = "varchar(64) COMMENT '纬度'")
    @ExcelColumn(columnName="纬度",order = 5,exportName = "zone_lat")
    private String zoneLat;//create by mark 纬度

	@Column(name = "zone_level",unique = true,columnDefinition = "int(50) COMMENT '显示级别'")
    @ExcelColumn(columnName="显示级别",order = 6,exportName = "zone_level")
    private Integer zoneLevel;//create by mark 显示级别



	 @Override
    public String getPKid()
    {
        return zoneCode;
    }
    @Override
    public  String getObjName(){
        return "RsZone";
    }
    @Override
    public  String getObjDesc(){
        return "区域";
    }

}