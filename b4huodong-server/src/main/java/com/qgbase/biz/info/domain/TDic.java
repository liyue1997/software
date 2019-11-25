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
 * Created by Mark on 2019-08-16
 * 主要用于：数据字典 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "t_dic")
public class TDic extends TBaseEntity {
     @Id
    	@Column(name = "dic_id",unique = true,columnDefinition = "varchar(64) COMMENT '字典主键'")
    @ExcelColumn(columnName="字典主键",order = 1,exportName = "dic_id")
@NotNull(message = "字典主键不能为空")
    private String dicId;//create by mark 字典主键

	@Column(name = "dic_type",unique = true,columnDefinition = "varchar(255) COMMENT '字典类型'")
    @ExcelColumn(columnName="字典类型",order = 2,exportName = "dic_type")
@NotNull(message = "字典类型不能为空")
    private String dicType;//create by mark 字典类型

	@Column(name = "dic_code",unique = true,columnDefinition = "varchar(255) COMMENT '字典代码'")
    @ExcelColumn(columnName="字典代码",order = 3,exportName = "dic_code")
@NotNull(message = "字典代码不能为空")
    private String dicCode;//create by mark 字典代码

	@Column(name = "dic_value",unique = true,columnDefinition = "varchar(255) COMMENT '字典值'")
    @ExcelColumn(columnName="字典值",order = 4,exportName = "dic_value")
@NotNull(message = "字典值不能为空")
    private String dicValue;//create by mark 字典值

	@Column(name = "dic_desc",unique = true,columnDefinition = "varchar(255) COMMENT '字典描述'")
    @ExcelColumn(columnName="字典描述",order = 5,exportName = "dic_desc")
    private String dicDesc;//create by mark 字典描述

	@Column(name = "is_used",unique = true,columnDefinition = "int(50) COMMENT '是否可用'")
    @ExcelColumn(columnName="是否可用",order = 6,exportName = "is_used")
    private Integer isUsed;//create by mark 是否可用

	@Column(name = "order_no",unique = true,columnDefinition = "int(50) COMMENT '排序'")
    @ExcelColumn(columnName="排序",order = 7,exportName = "order_no")
    private Integer orderNo;//create by mark 排序

	@Column(name = "parent_id",unique = true,columnDefinition = "varchar(255) COMMENT '父字典编码'")
    @ExcelColumn(columnName="父字典编码",order = 8,exportName = "parent_id")
    private String parentId;//create by mark 父字典编码

	@Column(name = "pysx",unique = true,columnDefinition = "varchar(255) COMMENT '拼音缩写'")
    @ExcelColumn(columnName="拼音缩写",order = 9,exportName = "pysx")
    private String pysx;//create by mark 拼音缩写

	@Column(name = "dic_data1",unique = true,columnDefinition = "varchar(64) COMMENT '预留字段1'")
    @ExcelColumn(columnName="预留字段1",order = 10,exportName = "dic_data1")
    private String dicData1;//create by mark 预留字段1

	@Column(name = "dic_data2",unique = true,columnDefinition = "varchar(64) COMMENT '预留字段2'")
    @ExcelColumn(columnName="预留字段2",order = 11,exportName = "dic_data2")
    private String dicData2;//create by mark 预留字段2



	 @Override
    public String getPKid()
    {
        return dicId;
    }
    @Override
    public  String getObjName(){
        return "TDic";
    }
    @Override
    public  String getObjDesc(){
        return "数据字典";
    }

}