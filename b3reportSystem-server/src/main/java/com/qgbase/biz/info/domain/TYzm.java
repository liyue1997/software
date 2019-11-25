package com.qgbase.biz.info.domain;

import com.qgbase.common.domain.TBaseEntity;
import com.qgbase.excel.annotation.ExcelColumn;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Mark on 2019-08-03
 * 主要用于：验证码 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "t_yzm")
public class TYzm extends TBaseEntity {
     @Id
    	@Column(name = "useraccount",unique = true,columnDefinition = "varchar(255) COMMENT '用户账户'")
    @ExcelColumn(columnName="用户账户",order = 1,exportName = "useraccount")
@NotNull(message = "用户账户不能为空")
    private String useraccount;//create by mark 用户账户

	@Column(name = "yzm",unique = true,columnDefinition = "varchar(50) COMMENT '验证码'")
    @ExcelColumn(columnName="验证码",order = 2,exportName = "yzm")
    private String yzm;//create by mark 验证码

	@Column(name = "active_date",unique = true,columnDefinition = "datetime(50) COMMENT '有效时间'")
    @ExcelColumn(columnName="有效时间",order = 3,exportName = "active_date")
    private Date activeDate;//create by mark 有效时间



	 @Override
    public String getPKid()
    {
        return useraccount;
    }
    @Override
    public  String getObjName(){
        return "TYzm";
    }
    @Override
    public  String getObjDesc(){
        return "验证码";
    }

}