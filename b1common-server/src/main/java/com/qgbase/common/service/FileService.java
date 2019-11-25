package com.qgbase.common.service;

import com.qgbase.app.domain.CommonRet;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author : shl
 * @date : 2019/8/5
 */
public interface FileService {
    /**
     * 文件上传接口
     * @param file 上传文件
     */
    CommonRet uploadFile(MultipartFile file);

}
