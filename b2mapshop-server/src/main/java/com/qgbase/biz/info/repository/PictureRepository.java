package com.qgbase.biz.info.repository;

import com.qgbase.biz.info.domain.TPicture;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : HuWenBin
 * @date : 2019/8/12
 */
@Repository
public interface PictureRepository extends CrudRepository<TPicture,String> {

    /**
     * 获取图片
     * @param objectId      用户ID
     * @param pictureType 图片类型
     * @return            图片列表
     */
    List<TPicture> findByObjectIdAndPictureType(String objectId, String pictureType);

}
