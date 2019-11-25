package com.qgbase.biz.mapshop.domain;

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
 * Created by Mark on 2019-08-22
 * 主要用于：买家 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "sp_user")
public class SpUser extends TBaseEntity {
     @Id
    	@Column(name = "user_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 1,exportName = "user_id")
@NotNull(message = "用户id不能为空")
    private String userId;//create by mark 用户id

	@Column(name = "user_lon",unique = true,columnDefinition = "varchar(64) COMMENT '经度'")
    @ExcelColumn(columnName="经度",order = 2,exportName = "user_lon")
    private String userLon;//create by mark 经度

	@Column(name = "user_lat",unique = true,columnDefinition = "varchar(64) COMMENT '纬度'")
    @ExcelColumn(columnName="纬度",order = 3,exportName = "user_lat")
    private String userLat;//create by mark 纬度

	@Column(name = "user_credits",unique = true,columnDefinition = "int(50) COMMENT '信用分'")
    @ExcelColumn(columnName="信用分",order = 4,exportName = "user_credits")
    private Integer userCredits;//create by mark 信用分



	 @Override
    public String getPKid()
    {
        return userId;
    }
    @Override
    public  String getObjName(){
        return "SpUser";
    }
    @Override
    public  String getObjDesc(){
        return "买家";
    }

}