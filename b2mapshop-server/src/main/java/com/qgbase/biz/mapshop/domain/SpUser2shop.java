package com.qgbase.biz.mapshop.domain;

import com.qgbase.common.domain.TBaseEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import com.qgbase.excel.annotation.ExcelColumn;

import java.util.Date;

/**
 * Created by Mark on 2019-08-30
 * 主要用于：用户浏览收藏得店铺 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "sp_user2shop")
@IdClass(SpUser2shopKey.class)
public class SpUser2shop extends TBaseEntity {
     @Id
    	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(50) COMMENT '商户编号'")
    @ExcelColumn(columnName="商户编号",order = 2,exportName = "shop_id")
@NotNull(message = "商户编号不能为空")
    private String shopId;//create by mark 商户编号
    @Id
	@Column(name = "user_id",unique = true,columnDefinition = "varchar(50) COMMENT '用户编号'")
    @ExcelColumn(columnName="用户编号",order = 1,exportName = "user_id")
@NotNull(message = "用户编号不能为空")
    private String userId;//create by mark 用户编号

	@Column(name = "islove",unique = true,columnDefinition = "int(50) COMMENT '是否收藏'")
    @ExcelColumn(columnName="是否收藏",order = 3,exportName = "islove")
    private Integer islove;//create by mark 是否收藏



	 @Override
    public String getPKid()
    {
        return userId+shopId;
    }
    @Override
    public  String getObjName(){
        return "SpUser2shop";
    }
    @Override
    public  String getObjDesc(){
        return "用户浏览收藏得店铺";
    }

}