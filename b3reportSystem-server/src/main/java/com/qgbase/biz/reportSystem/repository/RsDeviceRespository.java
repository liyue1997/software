package com.qgbase.biz.reportSystem.repository;

import com.qgbase.biz.reportSystem.domain.RsDevice;
import org.springframework.data.repository.CrudRepository;

public interface RsDeviceRespository extends CrudRepository<RsDevice,String> {

    RsDevice getFirstByDeviceUuid(String uuid);
}
