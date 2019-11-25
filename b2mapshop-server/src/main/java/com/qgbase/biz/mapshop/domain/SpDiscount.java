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
 * 主要用于：商铺优惠 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "sp_discount")
public class SpDiscount extends TBaseEntity {
     @Id
     @Column(name = "discount_id",unique = true,columnDefinition = "varchar(64) COMMENT '优惠id'")
    @ExcelColumn(columnName="优惠id",order = 1,exportName = "discount_id")
    @NotNull(message = "优惠id不能为空")
    private String discountId;//create by mark 优惠id

	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(64) COMMENT '商铺ID'")
    @ExcelColumn(columnName="商铺ID",order = 2,exportName = "shop_id")
@NotNull(message = "商铺ID不能为空")
    private String shopId;//create by mark 商铺ID

	@Column(name = "discount_name",unique = true,columnDefinition = "varchar(64) COMMENT '优惠商品'")
    @ExcelColumn(columnName="优惠商品",order = 3,exportName = "discount_name")
@NotNull(message = "优惠商品不能为空")
    private String discountName;//create by mark 优惠商品

	@Column(name = "discount_desc",unique = true,columnDefinition = "varchar(512) COMMENT '优惠策略'")
    @ExcelColumn(columnName="优惠策略",order = 4,exportName = "discount_desc")
@NotNull(message = "优惠策略不能为空")
    private String discountDesc;//create by mark 优惠策略

	@Column(name = "min_users",unique = true,columnDefinition = "int(50) COMMENT '最小组团人数'")
    @ExcelColumn(columnName="最小组团人数",order = 5,exportName = "min_users")
    private Integer minUsers;//create by mark 最小组团人数

	@Column(name = "iseffective",unique = true,columnDefinition = "int(50) COMMENT '是否有效'")
    @ExcelColumn(columnName="是否有效",order = 6,exportName = "iseffective")
    private Integer iseffective;//create by mark 是否有效

    @Column(name = "last_team_id",unique = true,columnDefinition = "varchar(64) COMMENT '商铺ID'")
    private String lastTeamId;//create by mark 商铺ID


	 @Override
    public String getPKid()
    {
        return discountId;
    }
    @Override
    public  String getObjName(){
        return "SpDiscount";
    }
    @Override
    public  String getObjDesc(){
        return "商铺优惠";
    }

}