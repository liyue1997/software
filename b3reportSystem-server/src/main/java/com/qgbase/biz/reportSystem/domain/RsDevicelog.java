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
 * 主要用于：设备使用记录 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "rs_devicelog")
public class RsDevicelog extends TBaseEntity {
     @Id
    	@Column(name = "log_id",unique = true,columnDefinition = "varchar(64) COMMENT '记录id'")
    @ExcelColumn(columnName="记录id",order = 1,exportName = "log_id")
@NotNull(message = "记录id不能为空")
    private String logId;//create by mark 记录id

	@Column(name = "opname",unique = true,columnDefinition = "varchar(64) COMMENT '操作名称'")
    @ExcelColumn(columnName="操作名称",order = 2,exportName = "opname")
    private String opname;//create by mark 操作名称

	@Column(name = "start_date",unique = true,columnDefinition = "datetime(50) COMMENT '开始时间'")
    @ExcelColumn(columnName="开始时间",order = 3,exportName = "start_date")
    private Date startDate;//create by mark 开始时间

	@Column(name = "end_date",unique = true,columnDefinition = "datetime(50) COMMENT '结束时间'")
    @ExcelColumn(columnName="结束时间",order = 4,exportName = "end_date")
    private Date endDate;//create by mark 结束时间

	@Column(name = "client_id",unique = true,columnDefinition = "varchar(64) COMMENT '客户id'")
    @ExcelColumn(columnName="客户id",order = 5,exportName = "client_id")
    private String clientId;//create by mark 客户id

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

	@Column(name = "use_time",unique = true,columnDefinition = "int COMMENT '使用时长(s)'")
    @ExcelColumn(columnName="使用时长(s)",order = 11,exportName = "use_time")
    private int useTime;//create by mark 使用时长(s)



	 @Override
    public String getPKid()
    {
        return logId;
    }
    @Override
    public  String getObjName(){
        return "RsDevicelog";
    }
    @Override
    public  String getObjDesc(){
        return "设备使用记录";
    }

}