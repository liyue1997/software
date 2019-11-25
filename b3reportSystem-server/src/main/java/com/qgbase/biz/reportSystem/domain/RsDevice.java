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
 * 主要用于：设备 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "rs_device")
public class RsDevice extends TBaseEntity {
     @Id
    	@Column(name = "device_id",unique = true,columnDefinition = "varchar(64) COMMENT '设备id'")
    @ExcelColumn(columnName="设备id",order = 1,exportName = "device_id")
@NotNull(message = "设备id不能为空")
    private String deviceId;//create by mark 设备id

	@Column(name = "device_uuid",unique = true,columnDefinition = "varchar(64) COMMENT '设备uuid'")
    @ExcelColumn(columnName="设备uuid",order = 2,exportName = "device_uuid")
    private String deviceUuid;//create by mark 设备uuid

	@Column(name = "device_type",unique = true,columnDefinition = "varchar(64) COMMENT '设备类型'")
    @ExcelColumn(columnName="设备类型",order = 3,exportName = "device_type")
    private String deviceType;//create by mark 设备类型

	@Column(name = "device_lon",unique = true,columnDefinition = "varchar(64) COMMENT '经度'")
    @ExcelColumn(columnName="经度",order = 4,exportName = "device_lon")
    private String deviceLon;//create by mark 经度

	@Column(name = "device_lat",unique = true,columnDefinition = "varchar(64) COMMENT '纬度'")
    @ExcelColumn(columnName="纬度",order = 5,exportName = "device_lat")
    private String deviceLat;//create by mark 纬度

	@Column(name = "zone_code",unique = true,columnDefinition = "varchar(64) COMMENT '区域编码'")
    @ExcelColumn(columnName="区域编码",order = 6,exportName = "zone_code")
    private String zoneCode;//create by mark 区域编码

	@Column(name = "sell_date",unique = true,columnDefinition = "date(50) COMMENT '销售日期'")
    @ExcelColumn(columnName="销售日期",order = 7,exportName = "sell_date")
    private String sellDate;//create by mark 销售日期

	@Column(name = "client_id",unique = true,columnDefinition = "varchar(64) COMMENT '客户id'")
    @ExcelColumn(columnName="客户id",order = 8,exportName = "client_id")
    private String clientId;//create by mark 客户id

	@Column(name = "device_errorinfo",unique = true,columnDefinition = "varchar(64) COMMENT '设备异常信息'")
    @ExcelColumn(columnName="设备异常信息",order = 9,exportName = "device_errorinfo")
    private String deviceErrorinfo;//create by mark 设备异常信息

	@Column(name = "device_status",unique = true,columnDefinition = "varchar(64) COMMENT '设备状态'")
    @ExcelColumn(columnName="设备状态",order = 10,exportName = "device_status")
    private String deviceStatus;//create by mark 设备状态

	@Column(name = "dls_id",unique = true,columnDefinition = "varchar(64) COMMENT '代理商id'")
    @ExcelColumn(columnName="代理商id",order = 11,exportName = "dls_id")
    private String dlsId;//create by mark 代理商id

	@Column(name = "yw_user_id",unique = true,columnDefinition = "varchar(64) COMMENT '业务人员id'")
    @ExcelColumn(columnName="业务人员id",order = 12,exportName = "yw_user_id")
    private String ywUserId;//create by mark 业务人员id

	@Column(name = "soft_version",unique = true,columnDefinition = "varchar(64) COMMENT '软件版本'")
    @ExcelColumn(columnName="软件版本",order = 13,exportName = "soft_version")
    private String softVersion;//create by mark 软件版本

	@Column(name = "device_bak",unique = true,columnDefinition = "varchar(512) COMMENT '备注'")
    @ExcelColumn(columnName="备注",order = 14,exportName = "device_bak")
    private String deviceBak;//create by mark 备注



	 @Override
    public String getPKid()
    {
        return deviceId;
    }
    @Override
    public  String getObjName(){
        return "RsDevice";
    }
    @Override
    public  String getObjDesc(){
        return "设备";
    }

}