package com.qgbase.biz.info.repository;

import com.qgbase.biz.info.domain.ImGroupUser;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ImGroupUserRepository extends CrudRepository<ImGroupUser,String> {

    List<ImGroupUser> findByUserIdAndAndGroupId(String userId, String groupId);

    List<ImGroupUser> findByGroupstatusIs(Integer Groupstatus);
}
