package com.qgbase.biz.huodong.domain;

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
 * Created by Mark on 2019-10-29
 * 主要用于：门店用户 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "hd_user")
public class HdUser extends TBaseEntity {
     @Id
    	@Column(name = "user_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 1,exportName = "user_id")
@NotNull(message = "用户id不能为空")
    private String userId;//create by mark 用户id

	@Column(name = "user_name",unique = true,columnDefinition = "varchar(32) COMMENT '用户姓名'")
    @ExcelColumn(columnName="用户姓名",order = 2,exportName = "user_name")
    private String userName;//create by mark 用户姓名

	@Column(name = "user_car",unique = true,columnDefinition = "varchar(32) COMMENT '车牌号'")
    @ExcelColumn(columnName="车牌号",order = 3,exportName = "user_car")
    private String userCar;//create by mark 车牌号

	@Column(name = "user_phone",unique = true,columnDefinition = "varchar(32) COMMENT '用户手机号'")
    @ExcelColumn(columnName="用户手机号",order = 4,exportName = "user_phone")
    private String userPhone;//create by mark 用户手机号

	@Column(name = "user_level",unique = true,columnDefinition = "varchar(32) COMMENT '用户等级'")
    @ExcelColumn(columnName="用户等级",order = 5,exportName = "user_level")
    private String userLevel;//create by mark 用户等级

	@Column(name = "zone_code",unique = true,columnDefinition = "varchar(64) COMMENT '区域编码'")
    @ExcelColumn(columnName="区域编码",order = 6,exportName = "zone_code")
    private String zoneCode;//create by mark 区域编码

	@Column(name = "user_tel",unique = true,columnDefinition = "varchar(32) COMMENT '用户电话'")
    @ExcelColumn(columnName="用户电话",order = 7,exportName = "user_tel")
    private String userTel;//create by mark 用户电话

	@Column(name = "user_weixinid",unique = true,columnDefinition = "varchar(32) COMMENT '用户微信id'")
    @ExcelColumn(columnName="用户微信id",order = 8,exportName = "user_weixinid")
    private String userWeixinid;//create by mark 用户微信id

	@Column(name = "user_nick",unique = true,columnDefinition = "varchar(32) COMMENT '用户昵称'")
    @ExcelColumn(columnName="用户昵称",order = 9,exportName = "user_nick")
    private String userNick;//create by mark 用户昵称

	@Column(name = "user_cartype",unique = true,columnDefinition = "varchar(32) COMMENT '用户车型'")
    @ExcelColumn(columnName="用户车型",order = 10,exportName = "user_cartype")
    private String userCartype;//create by mark 用户车型

	@Column(name = "is_active",unique = true,columnDefinition = "int(50) COMMENT '是否锁定'")
    @ExcelColumn(columnName="是否锁定",order = 11,exportName = "is_active")
    private Integer isActive;//create by mark 是否锁定



	 @Override
    public String getPKid()
    {
        return userId;
    }
    @Override
    public  String getObjName(){
        return "HdUser";
    }
    @Override
    public  String getObjDesc(){
        return "门店用户";
    }

}