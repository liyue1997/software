package com.qgbase.biz.info.domain;

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
 * Created by Mark on 2019-08-16
 * 主要用于：用户设置 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "ts_user_setting")
public class TsUserSetting extends TBaseEntity {
     @Id
    	@Column(name = "user_setting_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户设置id'")
    @ExcelColumn(columnName="用户设置id",order = 1,exportName = "user_setting_id")
@NotNull(message = "用户设置id不能为空")
    private String userSettingId;//create by mark 用户设置id

	@Column(name = "user_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 2,exportName = "user_id")
@NotNull(message = "用户id不能为空")
    private String userId;//create by mark 用户id

	@Column(name = "setting_key",unique = true,columnDefinition = "varchar(64) COMMENT '设置关键字'")
    @ExcelColumn(columnName="设置关键字",order = 3,exportName = "setting_key")
@NotNull(message = "设置关键字不能为空")
    private String settingKey;//create by mark 设置关键字

	@Column(name = "setting_value",unique = true,columnDefinition = "varchar(64) COMMENT '设置值'")
    @ExcelColumn(columnName="设置值",order = 4,exportName = "setting_value")
@NotNull(message = "设置值不能为空")
    private String settingValue;//create by mark 设置值

	@Column(name = "setting_desc",unique = true,columnDefinition = "varchar(255) COMMENT '设置描述'")
    @ExcelColumn(columnName="设置描述",order = 5,exportName = "setting_desc")
    private String settingDesc;//create by mark 设置描述



	 @Override
    public String getPKid()
    {
        return userSettingId;
    }
    @Override
    public  String getObjName(){
        return "TsUserSetting";
    }
    @Override
    public  String getObjDesc(){
        return "用户设置";
    }

}