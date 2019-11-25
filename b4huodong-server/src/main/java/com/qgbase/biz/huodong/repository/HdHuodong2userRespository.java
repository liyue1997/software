package com.qgbase.biz.huodong.repository;

import com.qgbase.biz.huodong.domain.HdHuodong2user;
import org.springframework.data.repository.CrudRepository;

public interface HdHuodong2userRespository extends CrudRepository<HdHuodong2user,String> {
    HdHuodong2user getFirstByHuodongIdAndShopIdAndUserId(String huodongId,String shopId,String userId);
    HdHuodong2user getFirstByPayOrder(String orderId);

}
