package com.qgbase.biz.info.repository;

import com.qgbase.biz.info.domain.AppVer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by pc on 2019/9/17.
 */
@Repository
public interface AppVerRespository  extends CrudRepository<AppVer, String> {
    List<AppVer> findByTVerAndTUsertype(String ver,String userType);
}
