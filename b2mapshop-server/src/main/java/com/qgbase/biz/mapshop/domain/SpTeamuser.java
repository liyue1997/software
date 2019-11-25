package com.qgbase.biz.mapshop.domain;

import com.qgbase.common.domain.TBaseEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import com.qgbase.excel.annotation.ExcelColumn;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Mark on 2019-08-22
 * 主要用于：组团成员 实体类定义，此代码为自动生成
 * https://www.cnblogs.com/boywwj/p/8031106.html
 * 复合主键
 */

@Data
@Entity
@Table(name = "sp_teamuser")
@IdClass(SpTeamuserKey.class)
public class SpTeamuser extends TBaseEntity {
     @Id
     @Column(name = "user_id",unique = true,columnDefinition = "varchar(64) COMMENT '用户id'")
    @ExcelColumn(columnName="用户id",order = 2,exportName = "user_id")
    @NotNull(message = "用户id不能为空")
    private String userId;//create by mark 用户id

    @Id
	@Column(name = "team_id",unique = true,columnDefinition = "varchar(64) COMMENT ''")
    @ExcelColumn(columnName="",order = 1,exportName = "team_id")
    @NotNull(message = "不能为空")
    private String teamId;//create by mark 

	@Column(name = "start_date",unique = true,columnDefinition = "datetime(50) COMMENT '参与时间'")
    @ExcelColumn(columnName="参与时间",order = 3,exportName = "start_date")
    private Date startDate;//create by mark 参与时间

	@Column(name = "iscare",unique = true,columnDefinition = "int(50) COMMENT '是否关注'")
    @ExcelColumn(columnName="是否关注",order = 4,exportName = "iscare")
    private Integer iscare;//create by mark 是否关注

	@Column(name = "isteamer",unique = true,columnDefinition = "int(50) COMMENT '是否参与'")
    @ExcelColumn(columnName="是否参与",order = 5,exportName = "isteamer")
    private Integer isteamer;//create by mark 是否参与

	@Column(name = "user_credits",unique = true,columnDefinition = "int(50) COMMENT '商户对用户评分'")
    @ExcelColumn(columnName="商户对用户评分",order = 6,exportName = "user_credits")
    private Integer userCredits;//create by mark 商户对用户评分

	@Column(name = "user_credits_desc",unique = true,columnDefinition = "varchar(512) COMMENT '商户对用户评论'")
    @ExcelColumn(columnName="商户对用户评论",order = 7,exportName = "user_credits_desc")
    private String userCreditsDesc;//create by mark 商户对用户评论

	@Column(name = "shop_credits",unique = true,columnDefinition = "int(50) COMMENT '用户评分'")
    @ExcelColumn(columnName="用户评分",order = 8,exportName = "shop_credits")
    private Integer shopCredits;//create by mark 用户评分

	@Column(name = "shop_credits_desc",unique = true,columnDefinition = "varchar(512) COMMENT '用户评论'")
    @ExcelColumn(columnName="用户评论",order = 9,exportName = "shop_credits_desc")
    private String shopCreditsDesc;//create by mark 用户评论

	@Column(name = "ispayed",unique = true,columnDefinition = "int(50) COMMENT '是否付款'")
    @ExcelColumn(columnName="是否付款",order = 10,exportName = "ispayed")
    private Integer ispayed;//create by mark 是否付款



	 @Override
    public String getPKid()
    {
        return teamId+userId;
    }
    @Override
    public  String getObjName(){
        return "SpTeamuser";
    }
    @Override
    public  String getObjDesc(){
        return "组团成员";
    }

}
