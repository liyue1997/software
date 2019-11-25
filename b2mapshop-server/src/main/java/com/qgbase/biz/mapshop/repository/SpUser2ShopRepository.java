package com.qgbase.biz.mapshop.repository;

import com.qgbase.biz.mapshop.domain.SpUser2shop;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpUser2ShopRepository extends CrudRepository<SpUser2shop,String> {
    List<SpUser2shop> findByShopIdAndUserId(String shopId, String userId);

}
