package com.qgbase.biz.sqldebug.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by lbb on 2018/5/14
 * 操作记录实体
 */
@Data
@Entity
@Table(name = "t_log_sql")
public class LogSql {

    @Id
    @Column(name="log_id")
    private String logId;


    @Column(name="fsql")
    private String fsql;

    @Column(name="fparams")
    private String fparams;


    @Column(name="work_time")
    private String workTime;

    @Column(name="create_date")
    private Date createDate;


    @Column(name="returns")
    private String returns;


}
