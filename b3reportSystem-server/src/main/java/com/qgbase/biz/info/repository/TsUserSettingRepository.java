package com.qgbase.biz.info.repository;

import com.qgbase.biz.info.domain.TPicture;
import com.qgbase.biz.info.domain.TsUserSetting;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TsUserSettingRepository extends CrudRepository<TsUserSetting,String> {

    /**
     * 获取图片
     * @param settingKey
     * @return            图片列表
     */
    List<TsUserSetting> findBySettingKeyAndSettingValue(String settingKey,String settingValue);

    List<TsUserSetting> findByUserIdAndSettingKey(String userId,String settingKey);

}