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
 * 主要用于：设备使用统计 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "rs_device_report")
public class RsDeviceReport extends TBaseEntity {
     @Id
    	@Column(name = "log_id",unique = true,columnDefinition = "varchar(64) COMMENT '记录id'")
    @ExcelColumn(columnName="记录id",order = 1,exportName = "log_id")
@NotNull(message = "记录id不能为空")
    private String logId;//create by mark 记录id

	@Column(name = "log_day",unique = true,columnDefinition = "varchar(64) COMMENT '统计天'")
    @ExcelColumn(columnName="统计天",order = 2,exportName = "log_day")
    private String logDay;//create by mark 统计天

	@Column(name = "log_month",unique = true,columnDefinition = "varchar(64) COMMENT '统计月'")
    @ExcelColumn(columnName="统计月",order = 3,exportName = "log_month")
    private String logMonth;//create by mark 统计月

	@Column(name = "log_year",unique = true,columnDefinition = "varchar(64) COMMENT '统计日'")
    @ExcelColumn(columnName="统计日",order = 4,exportName = "log_year")
    private String logYear;//create by mark 统计日

	@Column(name = "log_week",unique = true,columnDefinition = "varchar(64) COMMENT '统计星期'")
    @ExcelColumn(columnName="统计星期",order = 5,exportName = "log_week")
    private String logWeek;//create by mark 统计星期

	@Column(name = "device_id",unique = true,columnDefinition = "varchar(64) COMMENT '设备id'")
    @ExcelColumn(columnName="设备id",order = 6,exportName = "device_id")
    private String deviceId;//create by mark 设备id

	@Column(name = "device_uuid",unique = true,columnDefinition = "varchar(64) COMMENT '设备uuid'")
    @ExcelColumn(columnName="设备uuid",order = 7,exportName = "device_uuid")
    private String deviceUuid;//create by mark 设备uuid

	@Column(name = "device_type",unique = true,columnDefinition = "varchar(64) COMMENT '设备类型'")
    @ExcelColumn(columnName="设备类型",order = 8,exportName = "device_type")
    private String deviceType;//create by mark 设备类型

	@Column(name = "dls_id",unique = true,columnDefinition = "varchar(64) COMMENT '代理商id'")
    @ExcelColumn(columnName="代理商id",order = 9,exportName = "dls_id")
    private String dlsId;//create by mark 代理商id

	@Column(name = "yw_user_id",unique = true,columnDefinition = "varchar(64) COMMENT '业务人员id'")
    @ExcelColumn(columnName="业务人员id",order = 10,exportName = "yw_user_id")
    private String ywUserId;//create by mark 业务人员id

	@Column(name = "client_id",unique = true,columnDefinition = "varchar(64) COMMENT '客户id'")
    @ExcelColumn(columnName="客户id",order = 11,exportName = "client_id")
    private String clientId;//create by mark 客户id

	@Column(name = "use_times",unique = true,columnDefinition = "int COMMENT '使用次数'")
    @ExcelColumn(columnName="使用次数",order = 12,exportName = "use_times")
    private Integer useTimes;//create by mark 使用次数

	@Column(name = "use_time",unique = true,columnDefinition = "int COMMENT '使用时长(s)'")
    @ExcelColumn(columnName="使用时长(s)",order = 13,exportName = "use_time")
    private Integer useTime;//create by mark 使用时长(s)

	@Column(name = "error_times",unique = true,columnDefinition = "int COMMENT '故障次数'")
    @ExcelColumn(columnName="故障次数",order = 14,exportName = "error_times")
    private Integer errorTimes;//create by mark 故障次数



	 @Override
    public String getPKid()
    {
        return logId;
    }
    @Override
    public  String getObjName(){
        return "RsDeviceReport";
    }
    @Override
    public  String getObjDesc(){
        return "设备使用统计";
    }

}