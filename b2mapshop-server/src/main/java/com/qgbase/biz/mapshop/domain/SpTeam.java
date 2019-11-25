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
 * 主要用于：组团 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "sp_team")
public class SpTeam extends TBaseEntity {
     @Id
    	@Column(name = "team_id",unique = true,columnDefinition = "varchar(64) COMMENT '组团id'")
    @ExcelColumn(columnName="组团id",order = 1,exportName = "team_id")
@NotNull(message = "组团id不能为空")
    private String teamId;//create by mark 组团id

	@Column(name = "discount_id",unique = true,columnDefinition = "varchar(64) COMMENT '优惠id'")
    @ExcelColumn(columnName="优惠id",order = 2,exportName = "discount_id")
@NotNull(message = "优惠id不能为空")
    private String discountId;//create by mark 优惠id

	@Column(name = "shop_id",unique = true,columnDefinition = "varchar(64) COMMENT '商铺ID'")
    @ExcelColumn(columnName="商铺ID",order = 3,exportName = "shop_id")
@NotNull(message = "商铺ID不能为空")
    private String shopId;//create by mark 商铺ID

	@Column(name = "team_name",unique = true,columnDefinition = "varchar(64) COMMENT '优惠商品'")
    @ExcelColumn(columnName="优惠商品",order = 4,exportName = "team_name")
@NotNull(message = "优惠商品不能为空")
    private String teamName;//create by mark 优惠商品

	@Column(name = "discount_desc",unique = true,columnDefinition = "varchar(512) COMMENT '优惠策略'")
    @ExcelColumn(columnName="优惠策略",order = 5,exportName = "discount_desc")
@NotNull(message = "优惠策略不能为空")
    private String discountDesc;//create by mark 优惠策略

	@Column(name = "min_users",unique = true,columnDefinition = "int(50) COMMENT '最小组团人数'")
    @ExcelColumn(columnName="最小组团人数",order = 6,exportName = "min_users")
    private Integer minUsers;//create by mark 最小组团人数

	@Column(name = "start_userid",unique = true,columnDefinition = "varchar(64) COMMENT '发起用户'")
    @ExcelColumn(columnName="发起用户",order = 7,exportName = "start_userid")
@NotNull(message = "发起用户不能为空")
    private String startUserid;//create by mark 发起用户

	@Column(name = "start_date",unique = true,columnDefinition = "datetime(50) COMMENT '发起时间'")
    @ExcelColumn(columnName="发起时间",order = 8,exportName = "start_date")
    private Date startDate;//create by mark 发起时间

	@Column(name = "end_date",unique = true,columnDefinition = "datetime(50) COMMENT '结束时间'")
    @ExcelColumn(columnName="结束时间",order = 9,exportName = "end_date")
    private Date endDate;//create by mark 结束时间

	@Column(name = "valid_date",unique = true,columnDefinition = "datetime(50) COMMENT '有效截至时间'")
    @ExcelColumn(columnName="有效截至时间",order = 10,exportName = "valid_date")
    private Date validDate;//create by mark 有效截至时间

	@Column(name = "isvalided",unique = true,columnDefinition = "int(50) COMMENT '是否成团'")
    @ExcelColumn(columnName="是否成团",order = 11,exportName = "isvalided")
    private Integer isvalided;//create by mark 是否成团

	@Column(name = "iscancle",unique = true,columnDefinition = "int(50) COMMENT '是否取消'")
    @ExcelColumn(columnName="是否取消",order = 12,exportName = "iscancle")
    private Integer iscancle;//create by mark 是否取消


    @Column(name = "teamusercount",unique = true,columnDefinition = "int(50) COMMENT '最小组团人数'")
    private Integer teamUserCount;//create by mark 最小组团人数

    @Column(name = "group_id",unique = true,columnDefinition = "int(50) COMMENT '群组id'")
    private Integer groupId;//create by mark 是否取消
	 @Override
    public String getPKid()
    {
        return teamId;
    }
    @Override
    public  String getObjName(){
        return "SpTeam";
    }
    @Override
    public  String getObjDesc(){
        return "组团";
    }

}