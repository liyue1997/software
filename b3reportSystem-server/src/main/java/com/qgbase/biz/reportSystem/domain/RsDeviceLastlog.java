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
 * Created by Mark on 2019-10-12
 * 主要用于：设备消息 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "rs_device_lastlog")
public class RsDeviceLastlog extends TBaseEntity {
     @Id
    	@Column(name = "device_id",unique = true,columnDefinition = "varchar(64) COMMENT '设备id'")
    @ExcelColumn(columnName="设备id",order = 1,exportName = "device_id")
@NotNull(message = "设备id不能为空")
    private String deviceId;//create by mark 设备id

	@Column(name = "last_logid",unique = true,columnDefinition = "varchar(64) COMMENT '最后消息id'")
    @ExcelColumn(columnName="最后消息id",order = 2,exportName = "last_logid")
    private String lastLogid;//create by mark 最后消息id

    @Column(name = "error_log",unique = true,columnDefinition = "varchar(64) COMMENT '最后消息id'")
    @ExcelColumn(columnName="最后消息id",order = 2,exportName = "error_log")
    private String errorLog;//create by mark 最后消息id


	 @Override
    public String getPKid()
    {
        return deviceId;
    }
    @Override
    public  String getObjName(){
        return "RsDeviceLastlog";
    }
    @Override
    public  String getObjDesc(){
        return "设备消息";
    }

}