package com.qgbase.biz.info.domain;

import com.qgbase.common.domain.TBaseEntity;
import com.qgbase.excel.annotation.ExcelColumn;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Created by Mark on 2019-08-03
 * 主要用于：用户设备 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "app_device")
public class AppDevice extends TBaseEntity {
     @Id
    	@Column(name = "t_deviceseq",unique = true,columnDefinition = "varchar(255) COMMENT '设备序列号'")
    @ExcelColumn(columnName="设备序列号",order = 2,exportName = "t_deviceseq")
@NotNull(message = "设备序列号不能为空")
    private String tDeviceseq;//create by mark 设备序列号

	@Column(name = "t_userid",unique = true,columnDefinition = "int(50) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 1,exportName = "t_userid")
@NotNull(message = "用户id不能为空")
    private Integer tUserid;//create by mark 用户id

	@Column(name = "t_ver",unique = true,columnDefinition = "varchar(50) COMMENT '版本号'")
    @ExcelColumn(columnName="版本号",order = 3,exportName = "t_ver")
    private String tVer;//create by mark 版本号



	 @Override
    public String getPKid()
    {
        return tUserid+tDeviceseq;
    }
    @Override
    public  String getObjName(){
        return "AppDevice";
    }
    @Override
    public  String getObjDesc(){
        return "用户设备";
    }

}