package com.qgbase.biz.info.domain;

import com.qgbase.common.domain.TBaseEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import com.qgbase.excel.annotation.ExcelColumn;

import java.util.Date;

/**
 * Created by Mark on 2019-09-05
 * 主要用于： 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "im_group_user")
@IdClass(ImGroupUserKey.class)
public class ImGroupUser extends TBaseEntity {
     @Id
    	@Column(name = "user_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 2,exportName = "user_id")
@NotNull(message = "用户id不能为空")
    private String userId;//create by mark 用户id
    @Id
	@Column(name = "group_id",unique = true,columnDefinition = "varchar(64) COMMENT ''")
    @ExcelColumn(columnName="",order = 1,exportName = "group_id")
@NotNull(message = "不能为空")
    private String groupId;//create by mark 

	@Column(name = "group_title",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 3,exportName = "group_title")
@NotNull(message = "用户id不能为空")
    private String groupTitle;//create by mark 用户id

	@Column(name = "groupstatus",unique = true,columnDefinition = "int(50) COMMENT '状态'")
    @ExcelColumn(columnName="状态",order = 4,exportName = "groupstatus")
    private Integer groupstatus;//create by mark 状态



	 @Override
    public String getPKid()
    {
        return groupId+userId;
    }
    @Override
    public  String getObjName(){
        return "ImGroupUser";
    }
    @Override
    public  String getObjDesc(){
        return "";
    }

}