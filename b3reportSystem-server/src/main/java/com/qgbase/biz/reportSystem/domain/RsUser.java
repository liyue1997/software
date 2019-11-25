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
 * Created by Mark on 2019-10-11
 * 主要用于：代理商用户 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "rs_user")
public class RsUser extends TBaseEntity {
     @Id
    	@Column(name = "user_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 1,exportName = "user_id")
@NotNull(message = "用户id不能为空")
    private String userId;//create by mark 用户id

	@Column(name = "user_name",unique = true,columnDefinition = "varchar(32) COMMENT '用户姓名'")
    @ExcelColumn(columnName="用户姓名",order = 2,exportName = "user_name")
    private String userName;//create by mark 用户姓名

	@Column(name = "user_number",unique = true,columnDefinition = "varchar(32) COMMENT '用户工号'")
    @ExcelColumn(columnName="用户工号",order = 3,exportName = "user_number")
    private String userNumber;//create by mark 用户工号

	@Column(name = "user_phone",unique = true,columnDefinition = "varchar(32) COMMENT '用户手机号'")
    @ExcelColumn(columnName="用户手机号",order = 4,exportName = "user_phone")
    private String userPhone;//create by mark 用户手机号

	@Column(name = "dls_id",unique = true,columnDefinition = "varchar(64) COMMENT '代理商id'")
    @ExcelColumn(columnName="代理商id",order = 5,exportName = "dls_id")
    private String dlsId;//create by mark 代理商id

	@Column(name = "dls_user_type",unique = true,columnDefinition = "varchar(32) COMMENT '用户类型'")
    @ExcelColumn(columnName="用户类型",order = 6,exportName = "dls_user_type")
    private String dlsUserType;//create by mark 用户类型

	@Column(name = "zone_code",unique = true,columnDefinition = "varchar(64) COMMENT '区域编码'")
    @ExcelColumn(columnName="区域编码",order = 7,exportName = "zone_code")
    private String zoneCode;//create by mark 区域编码

	@Column(name = "user_tel",unique = true,columnDefinition = "varchar(32) COMMENT '用户电话'")
    @ExcelColumn(columnName="用户电话",order = 8,exportName = "user_tel")
    private String userTel;//create by mark 用户电话

	@Column(name = "user_qq",unique = true,columnDefinition = "varchar(32) COMMENT '用户QQ号'")
    @ExcelColumn(columnName="用户QQ号",order = 9,exportName = "user_qq")
    private String userQq;//create by mark 用户QQ号

	@Column(name = "is_active",unique = true,columnDefinition = "int(50) COMMENT '是否在职'")
    @ExcelColumn(columnName="是否在职",order = 10,exportName = "is_active")
    private Integer isActive;//create by mark 是否在职



	 @Override
    public String getPKid()
    {
        return userId;
    }
    @Override
    public  String getObjName(){
        return "RsUser";
    }
    @Override
    public  String getObjDesc(){
        return "代理商用户";
    }

}