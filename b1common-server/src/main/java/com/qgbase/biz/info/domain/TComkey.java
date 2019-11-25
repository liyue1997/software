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
 * Created by Mark on 2019-08-03
 * 主要用于：业务键值 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "t_comkey")
public class TComkey extends TBaseEntity {
     @Id
    	@Column(name = "tkey",unique = true,columnDefinition = "varchar(255) COMMENT 'key'")
    @ExcelColumn(columnName="key",order = 1,exportName = "tkey")
@NotNull(message = "key不能为空")
    private String tkey;//create by mark key

	@Column(name = "tvalue",unique = true,columnDefinition = "bigint(50) COMMENT 'value'")
    @ExcelColumn(columnName="value",order = 2,exportName = "tvalue")
    private String tvalue;//create by mark value



	 @Override
    public String getPKid()
    {
        return tkey;
    }
    @Override
    public  String getObjName(){
        return "TComkey";
    }
    @Override
    public  String getObjDesc(){
        return "业务键值";
    }

}