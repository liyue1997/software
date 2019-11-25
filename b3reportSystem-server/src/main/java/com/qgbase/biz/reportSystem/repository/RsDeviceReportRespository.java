package com.qgbase.biz.reportSystem.repository;

import com.qgbase.biz.reportSystem.domain.RsDeviceReport;
import org.springframework.data.repository.CrudRepository;

public interface RsDeviceReportRespository extends CrudRepository<RsDeviceReport,String> {
    RsDeviceReport getFirstByDeviceIdAndAndLogDay(String deviceid,String logDay);
}
