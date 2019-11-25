package com.qgbase.biz.huodong.repository;

import com.qgbase.biz.huodong.domain.HdShopuser;
import com.qgbase.biz.huodong.domain.HdUser;
import org.springframework.data.repository.CrudRepository;

public interface HdShopuserRespository extends CrudRepository<HdShopuser, String> {
    HdShopuser getFirstByUserWeixinid(String userWeixinid);
}
