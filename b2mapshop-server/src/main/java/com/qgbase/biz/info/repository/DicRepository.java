package com.qgbase.biz.info.repository;

import com.qgbase.biz.info.domain.TDic;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author : shl
 * @name :
 * @date : 2019/8/20
 * @desc :
 */
@Repository
public interface DicRepository extends CrudRepository<TDic, String> {

    @Query(value = "select * from t_dic order by dic_type and order_no",
            nativeQuery = true)
    List<TDic> findAllOderByDicTypeAndOrderNo();

    @Query(value = "select * from t_dic where dic_type = ?1 and is_used = 1 order by order_no",
            nativeQuery = true)
    List<TDic> getByDicType(@Param("dicType") String dicType);
}
