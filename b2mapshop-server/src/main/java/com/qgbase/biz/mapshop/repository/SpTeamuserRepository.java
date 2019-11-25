package com.qgbase.biz.mapshop.repository;

import com.qgbase.biz.mapshop.domain.SpTeamuser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpTeamuserRepository extends CrudRepository<SpTeamuser,String> {
    List<SpTeamuser> findByTeamIdAndUserId(String teamId,String userId);

    List<SpTeamuser> findByTeamId(String teamId);

}
