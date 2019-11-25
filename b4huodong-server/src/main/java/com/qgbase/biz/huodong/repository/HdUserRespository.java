package com.qgbase.biz.huodong.repository;

import com.qgbase.biz.huodong.domain.HdUser;
import org.springframework.data.repository.CrudRepository;

public interface HdUserRespository  extends CrudRepository<HdUser, String> {
    HdUser getFirstByUserWeixinid(String userWeixinid);
}
