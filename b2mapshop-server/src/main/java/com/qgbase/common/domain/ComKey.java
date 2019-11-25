package com.qgbase.common.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "comkey")
public class ComKey {
    @Id
    @Column(name="tkey")
    private String tKey;
    @Column(name="tvalue" ,columnDefinition = "bigint")
    private Long tValue;
}
