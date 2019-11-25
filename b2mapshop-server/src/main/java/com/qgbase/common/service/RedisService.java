package com.qgbase.common.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by lbb on 2018/5/4.
 * redis工具类
 * redisTemplate.opsForValue();//操作字符串
 * redisTemplate.opsForHash();//操作hash
 * redisTemplate.opsForList();//操作list
 * redisTemplate.opsForSet();//操作set
 * redisTemplate.opsForZSet();//操作有序set
 */
public class RedisService extends RedisTemplate{
    /**
     * 存储字典值
     * @param key 键
     */
    public void setDicValue(String key){

    }

    /**
     * 得到字典缓存值
     * @param key 键
     * @return 值
     */
    public List getDicValue(String key){

        return null;
    }
    /**
     * 更新字典缓存
     * @param key 键
     * @param value 值
     */
    public void updateDicValue(String key,List value){

    }
    /**
     * redis通用set
     * @param key key
     * @param v value
     */
    public void setValue(String key,String v,Integer overTime){
        ValueOperations<String, String> operations=opsForValue();
        operations.set(key,v);
        expire(key,overTime, TimeUnit.SECONDS);
    }

    /**
     * 返回关键值
     * @param key key值
     * @return 返回值
     */
    public String getValue(String key){
        ValueOperations<String, String> operations=opsForValue();
        return operations.get(key);
    }
}