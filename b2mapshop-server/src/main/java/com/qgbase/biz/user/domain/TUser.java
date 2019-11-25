package com.qgbase.biz.user.domain;

import com.qgbase.common.domain.TBaseEntity;
import com.qgbase.excel.annotation.ExcelColumn;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Map;

/**
 * Created by lbb on 2018/4/17.
 * 主要用于：用户实体类
 */

@Data
@Entity
@Table(name = "ts_user")
public class TUser extends TBaseEntity {
    @Id
    @Column(name = "user_id", length = 64, unique = true)
    @NotNull(message = "主键不能为空")
    private String userId;//create by lbb 用户登陆名
    @ExcelColumn(columnName = "用户名", order = 1, exportName = "username")
    @Column(name = "username", columnDefinition = "varchar(64) COMMENT '用户姓名'")
    private String username;//create by lbb 用户姓名
    @ExcelColumn(columnName = "用户账户", order = 2, exportName = "user_account")
    @Column(name = "user_account", columnDefinition = "varchar(64) COMMENT '用户账号'")
    @NotNull(message = "账户不能为空")
    private String userAccount;//create by lbb 用户账号
    @Column(name = "password", columnDefinition = "varchar(64) COMMENT '用户密码'")
    private String password;//create by lbb 用户密码
    @ExcelColumn(columnName = "角色", order = 3, exportName = "role_id")
    @Column(name = "role_id", columnDefinition = "varchar(64) COMMENT '角色'")
    @NotNull(message = "角色不能为空")
    private String roleId;//create by lbb 角色
    @ExcelColumn(columnName = "时间", order = 4, exportName = "last_time")
    @Column(name = "last_time", columnDefinition = "dateTime COMMENT '最后访问时间'")
    private Date lastTime;//create by lbb 最后访问时间
    @ExcelColumn(columnName = "最后登陆系统", order = 5, exportName = "last_os")
    @Column(name = "last_os", columnDefinition = "varchar(64) COMMENT '最后登陆操作系统'")
    private String lastOs;//create by lbb 最后登陆操作系统
    @ExcelColumn(columnName = "最后登陆IP", order = 6, exportName = "last_ip")
    @Column(name = "last_ip", columnDefinition = "varchar(64) COMMENT '最后登陆IP'")
    private String lastIp;//create by lbb 最后登陆IP
    @Column(name = "user_status", columnDefinition = "int(4) COMMENT '是否允许登陆'")
    private Integer userStatus;//create by lbb 是否允许登陆
    @Column(name = "user_type", columnDefinition = "varchar(32) COMMENT '用户类型，区别农户和系统用户'")
    private String userType;//create by lbb 用户类型，区别农户和系统用户
    @Transient
    private TUser tuser;
    @Transient
    private Map extendInfo;

    @Override
    public String getPKid() {
        return userId;
    }

    @Override
    public String getObjName() {
        return "t_user";
    }

    @Override
    public String getObjDesc() {
        return "系统用户";
    }

    public TUser getLoginUser() {
        tuser = new TUser();
        this.tuser.setUsername(this.getUsername());
        this.tuser.setExtendInfo(this.getExtendInfo());
        return tuser;
    }

}
