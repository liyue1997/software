package com.qgbase.biz.reportSystem.repository;

import com.qgbase.biz.reportSystem.domain.RsDeviceerrorlog;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RsDeviceerrorlogRespository extends CrudRepository<RsDeviceerrorlog,String> {
    List<RsDeviceerrorlog> findByDeviceIdAndErrorTypeAndEndDateIsNull(String deviceid,String errorType);
    List<RsDeviceerrorlog> findByDeviceIdAndEndDateIsNull(String deviceid);
}
