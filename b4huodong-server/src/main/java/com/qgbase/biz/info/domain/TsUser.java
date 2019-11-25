package com.qgbase.biz.info.domain;

import com.qgbase.common.domain.TBaseEntity;
import com.qgbase.excel.annotation.ExcelColumn;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Mark on 2019-08-03
 * 主要用于：登录用户 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "ts_user")
public class TsUser extends TBaseEntity {
     @Id
    	@Column(name = "user_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 1,exportName = "user_id")
@NotNull(message = "用户id不能为空")
    private String userId;//create by mark 用户id

	@Column(name = "user_account",unique = true,columnDefinition = "varchar(64) COMMENT '用户登录账户'")
    @ExcelColumn(columnName="用户登录账户",order = 2,exportName = "user_account")
    private String userAccount;//create by mark 用户登录账户

	@Column(name = "password",unique = true,columnDefinition = "varchar(64) COMMENT '密码'")
    @ExcelColumn(columnName="密码",order = 3,exportName = "password")
    private String password;//create by mark 密码

	@Column(name = "username",unique = true,columnDefinition = "varchar(64) COMMENT '用户名'")
    @ExcelColumn(columnName="用户名",order = 4,exportName = "username")
    private String username;//create by mark 用户名

	@Column(name = "user_type",unique = true,columnDefinition = "varchar(32) COMMENT '用户类型'")
    @ExcelColumn(columnName="用户类型",order = 5,exportName = "user_type")
    private String userType;//create by mark 用户类型

	@Column(name = "user_status",unique = true,columnDefinition = "int(50) COMMENT '是否允许登录'")
    @ExcelColumn(columnName="是否允许登录",order = 6,exportName = "user_status")
    private Integer userStatus;//create by mark 是否允许登录

	@Column(name = "role_id",unique = true,columnDefinition = "varchar(64) COMMENT '角色'")
    @ExcelColumn(columnName="角色",order = 7,exportName = "role_id")
    private String roleId;//create by mark 角色

	@Column(name = "last_ip",unique = true,columnDefinition = "varchar(255) COMMENT '最后登录ip'")
    @ExcelColumn(columnName="最后登录ip",order = 8,exportName = "last_ip")
    private String lastIp;//create by mark 最后登录ip

	@Column(name = "last_os",unique = true,columnDefinition = "varchar(255) COMMENT '最后登录系统'")
    @ExcelColumn(columnName="最后登录系统",order = 9,exportName = "last_os")
    private String lastOs;//create by mark 最后登录系统

	@Column(name = "last_time",unique = true,columnDefinition = "datetime(50) COMMENT '最后登录时间'")
    @ExcelColumn(columnName="最后登录时间",order = 10,exportName = "last_time")
    private Date lastTime;//create by mark 最后登录时间
    @Transient
    private String pictureId;
    @Transient
    private String pictureUrl;

    @Override
    public String getPKid()
    {
        return userId;
    }
    @Override
    public  String getObjName(){
        return "TsUser";
    }
    @Override
    public  String getObjDesc(){
        return "登录用户";
    }


}