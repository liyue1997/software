package com.qgbase.biz.operRecord.domain;

import com.qgbase.biz.operRecord.service.coverter.OprStatusCoverter;
import com.qgbase.common.domain.TBaseEntity;
import com.qgbase.excel.annotation.ExcelColumn;
import com.qgbase.excel.convert.DateConverter;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by lbb on 2018/5/14
 * 操作记录实体
 */
@Data
@Entity
@Table(name = "ts_opr")
public class OprLog extends TBaseEntity {

    @Id
    @Column(name = "opr_id", length = 64, unique = true)
    @NotNull(message = "主键不能为空")
    private String oprId;

    @ExcelColumn(columnName = "客户端IP", exportName = "ip", order = 1)
    @Column(name = "ip", length = 64)
    private String ip;

    @ExcelColumn(columnName = "操作人", exportName = "username", order = 2)
    @Column(name = "username", length = 64)
    private String userName;

    @ExcelColumn(columnName = "操作结果", exportName = "status",convert = OprStatusCoverter.class, order = 3)
    @Column(name = "status", length = 2)
    private String status;

    @ExcelColumn(columnName = "请求URL", exportName = "url", order = 4)
    @Column(name = "url", length = 256)
    private String url;

    @ExcelColumn(columnName = "操作系统", exportName = "os", order = 5)
    @Column(name = "os", length = 64)
    private String os;

    @ExcelColumn(columnName = "调用模块", exportName = "class_name", order = 6)
    @Column(name = "class_name", length = 256)
    private String className;

    @ExcelColumn(columnName = "调用方法", exportName = "method_name", order = 7)
    @Column(name = "method_name", length = 256)
    private String methodName;

    @ExcelColumn(columnName = "执行时长", exportName = "work_time", order = 8)
    @Column(name = "work_time", length = 64)
    private Long workTime;

    @ExcelColumn(columnName = "执行时间", exportName = "opr_time",convert = DateConverter.class,extend1 = "yyyy-MM-dd HH:mm:ss", order = 9)
    @Column(name = "opr_time", length = 64)
    private Date oprTime;

    @ExcelColumn(columnName = "调用参数", exportName = "params", order = 10)
    @Lob
    @Column(name = "params", columnDefinition = "longtext")
    private String parameter;

//    @ExcelColumn(columnName = "调用结果", exportName = "return_value", order = 11)
    @Lob
    @Column(name = "return_value", columnDefinition = "longtext")
    private String returnValue;

    @ExcelColumn(columnName = "调试信息", exportName = "extend1", order = 12)
    @Lob
    @Column(name = "extend1", columnDefinition = "TEXT")
    private String extend1;


    @ExcelColumn(columnName = "客户端唯一标志", exportName = "client_uid", order = 13)
    @Column(name = "client_uid", columnDefinition = "varchar(128)")
    private String clientUid;
    @Override
    public String getPKid() {
        return oprId;
    }

    @Override
    public String getObjName() {
        return "opr_log";
    }

    @Override
    public String getObjDesc() {
        return "操作日志";
    }
}
