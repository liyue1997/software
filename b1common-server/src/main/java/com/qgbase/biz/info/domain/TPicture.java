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
 * Created by Mark on 2019-08-06
 * 主要用于：图片 实体类定义，此代码为自动生成
 */

@Data
@Entity
@Table(name = "t_picture")
public class TPicture extends TBaseEntity {
    @Id
    @Column(name = "picture_id", unique = true, columnDefinition = "varchar(64) COMMENT '图片id'")
    @ExcelColumn(columnName = "图片id", order = 1, exportName = "picture_id")
    @NotNull(message = "图片id不能为空")
    private String pictureId;//create by mark 图片id

    @Column(name = "picture_type", unique = true, columnDefinition = "varchar(64) COMMENT '图片类型'")
    @ExcelColumn(columnName = "图片类型", order = 2, exportName = "picture_type")
    private String pictureType;//create by mark 图片类型

    @Column(name = "object_id", unique = true, columnDefinition = "varchar(64) COMMENT '对象id'")
    @ExcelColumn(columnName = "对象id", order = 3, exportName = "object_id")
    private String objectId;//create by mark 对象id

    @Column(name = "picture_url", unique = true, columnDefinition = "varchar(255) COMMENT '图片url'")
    @ExcelColumn(columnName = "图片url", order = 4, exportName = "picture_url")
    private String pictureUrl;//create by mark 图片url

    @Column(name = "picture_surl", unique = true, columnDefinition = "varchar(255) COMMENT '图片缩略图url'")
    @ExcelColumn(columnName = "图片缩略图url", order = 5, exportName = "picture_surl")
    private String pictureSurl;//create by mark 图片缩略图url

    @Column(name = "file_type", unique = true, columnDefinition = "varchar(64) COMMENT '图片后缀名'")
    @ExcelColumn(columnName = "图片后缀名", order = 6, exportName = "file_type")
    private String fileType;//create by mark 图片后缀名


    @Override
    public String getPKid() {
        return pictureId;
    }

    @Override
    public String getObjName() {
        return "TPicture";
    }

    @Override
    public String getObjDesc() {
        return "图片";
    }

}