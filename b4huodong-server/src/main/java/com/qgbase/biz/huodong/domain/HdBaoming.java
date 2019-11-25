package com.qgbase.biz.info.domain;

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
 * Created by Mark on 2019-11-06
 * 主要用于：报名申请 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "hd_baoming")
public class HdBaoming extends TBaseEntity {
     @Id
    	@Column(name = "baoming_id",unique = true,columnDefinition = "varchar(64) COMMENT '报名编码'")
    @ExcelColumn(columnName="报名编码",order = 1,exportName = "baoming_id")
@NotNull(message = "报名编码不能为空")
    private String baomingId;//create by mark 报名编码

	@Column(name = "shop_name",unique = true,columnDefinition = "varchar(64) COMMENT '门店简称'")
    @ExcelColumn(columnName="门店简称",order = 2,exportName = "shop_name")
    private String shopName;//create by mark 门店简称

	@Column(name = "shop_fullname",unique = true,columnDefinition = "varchar(64) COMMENT '门店全称'")
    @ExcelColumn(columnName="门店全称",order = 3,exportName = "shop_fullname")
    private String shopFullname;//create by mark 门店全称

	@Column(name = "shop_address",unique = true,columnDefinition = "varchar(512) COMMENT '门店地址'")
    @ExcelColumn(columnName="门店地址",order = 4,exportName = "shop_address")
    private String shopAddress;//create by mark 门店地址

	@Column(name = "shop_contact",unique = true,columnDefinition = "varchar(64) COMMENT '联系人'")
    @ExcelColumn(columnName="联系人",order = 5,exportName = "shop_contact")
    private String shopContact;//create by mark 联系人

	@Column(name = "shop_tel",unique = true,columnDefinition = "varchar(64) COMMENT '门店电话'")
    @ExcelColumn(columnName="门店电话",order = 6,exportName = "shop_tel")
    private String shopTel;//create by mark 门店电话

	@Column(name = "handle_status",unique = true,columnDefinition = "varchar(32) COMMENT '处理状态'")
    @ExcelColumn(columnName="处理状态",order = 7,exportName = "handle_status")
    private String handleStatus;//create by mark 处理状态

	@Column(name = "handle_demo",unique = true,columnDefinition = "varchar(512) COMMENT '处理备注'")
    @ExcelColumn(columnName="处理备注",order = 8,exportName = "handle_demo")
    private String handleDemo;//create by mark 处理备注

	@Column(name = "handle_user_id",unique = true,columnDefinition = "varchar(64) COMMENT '处理人员'")
    @ExcelColumn(columnName="处理人员",order = 9,exportName = "handle_user_id")
    private String handleUserId;//create by mark 处理人员



	 @Override
    public String getPKid()
    {
        return baomingId;
    }
    @Override
    public  String getObjName(){
        return "HdBaoming";
    }
    @Override
    public  String getObjDesc(){
        return "报名申请";
    }

}