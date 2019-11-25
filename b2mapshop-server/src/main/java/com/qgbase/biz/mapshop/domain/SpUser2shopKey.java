package com.qgbase.biz.mapshop.domain;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;

@Data
@Embeddable
public class SpUser2shopKey implements Serializable {
    private String userId;
    //  @Id
//  @Column(name = "idcardno")
    private String shopId;
}
