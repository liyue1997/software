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
 * 主要用于：商户用户 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "sp_shopuser")
public class SpShopuser extends TBaseEntity {
     @Id
    	@Column(name = "user_id",unique = true,columnDefinition = "varchar(50) COMMENT '用户编号'")
    @ExcelColumn(columnName="用户编号",order = 1,exportName = "user_id")
@NotNull(message = "用户编号不能为空")
    private String userId;//create by mark 用户编号

	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(50) COMMENT '商户编号'")
    @ExcelColumn(columnName="商户编号",order = 2,exportName = "shop_id")
    private String shopId;//create by mark 商户编号

	@Column(name = "user_name",unique = true,columnDefinition = "varchar(50) COMMENT '姓名'")
    @ExcelColumn(columnName="姓名",order = 3,exportName = "user_name")
    private String userName;//create by mark 姓名

	@Column(name = "user_phone",unique = true,columnDefinition = "varchar(50) COMMENT '手机号'")
    @ExcelColumn(columnName="手机号",order = 4,exportName = "user_phone")
    private String userPhone;//create by mark 手机号

	@Column(name = "user_admin",unique = true,columnDefinition = "int(50) COMMENT '是否管理员'")
    @ExcelColumn(columnName="是否管理员",order = 5,exportName = "user_admin")
    private Integer userAdmin;//create by mark 是否管理员



	 @Override
    public String getPKid()
    {
        return userId;
    }
    @Override
    public  String getObjName(){
        return "SpShopuser";
    }
    @Override
    public  String getObjDesc(){
        return "商户用户";
    }

}