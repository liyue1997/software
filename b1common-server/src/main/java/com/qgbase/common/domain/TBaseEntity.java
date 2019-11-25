package com.qgbase.common.domain;


import com.qgbase.util.JsonUtil;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import java.util.Date;


/**
 * Created by lbb on 2018/4/24.
 * 主要用于：基本实体类
 */
@Data
@MappedSuperclass
public abstract class TBaseEntity {
    //create by lbb 创建时间
    @Column(name = "create_date",updatable = false)
    private Date createDate;
    @Column(name = "create_user",updatable = false)
    //create by lbb 创建用户
    private String createUser;
    @Column(name = "modify_date")
    //create by lbb 最后维护时间
    private Date modifyDate;
    //create by lbb 最后维护用户
    @Column(name = "modify_user")
    private String modifyUser;

    @Transient
    public  String importMsg;

    public abstract  String getPKid();
    public abstract String getObjName();
    public abstract String getObjDesc();
    public  String getObjDebug(){
        //return  getObjName()+","+getPKid();
        return JsonUtil.toJson(this);
    }

}
