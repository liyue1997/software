package com.qgbase.biz.storage.domain;

import com.qgbase.common.domain.TBaseEntity;
import lombok.Data;
import lombok.extern.apachecommons.CommonsLog;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * 附件实体类
 * author cuiwei
 * Date: 2018/05/04
 */
@Data
@Entity
@Table(name = "t_attachment")
public class TAttachment extends TBaseEntity {
    @Id
    @Column(name = "attachment_id", unique = true, columnDefinition = "varchar(64) COMMENT '主键ID'")
    @NotNull(message = "主键不能为空")
    private String attachmentId;

    @NotNull(message = "原文件名不能为空")
    @Column(name = "origin_name", columnDefinition = "varchar(256) COMMENT '源文件名称'")
    private String originName;

    @Column(name = "new_name", unique = true, columnDefinition = "varchar(256) COMMENT '文件当前名称'")
    private String newName;

    @Column(name = "store_path", columnDefinition = "varchar(512) COMMENT '文件路径'")
    private String storePath;

    @Column(name = "file_extension", columnDefinition = "varchar(32) COMMENT '文件扩展名'")
    private String fileExtension;

    @Column(name = "file_size", columnDefinition = "bigint COMMENT '文件大小'")
    private Long fileSize;

    @Column(name = "file_crc32", columnDefinition = "bigint COMMENT '文件CRC32校验码'")
    private Long fileCRC32;

    @Override
    public String getPKid() {
        return attachmentId;
    }

    @Override
    public String getObjName() {
        return newName;
    }

    @Override
    public String getObjDesc() {
        return String.format("{path:%s,name : %s}");
    }
}
