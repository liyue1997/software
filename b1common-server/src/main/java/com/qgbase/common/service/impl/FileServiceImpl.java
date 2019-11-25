package com.qgbase.common.service.impl;

import com.qgbase.app.domain.CommonRet;
import com.qgbase.common.service.FileService;
import com.qgbase.util.OSSUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

/**
 * @author : shl
 * @date : 2019/8/5
 */
@Service
public class FileServiceImpl implements FileService {


    @Override
    public CommonRet uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            return CommonRet.getFail("上传文件为空,请选择需要上传的文件");
        }
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        String fileName = UUID.randomUUID() + suffix;
        try {
            String url = OSSUtil.uploadFile(file, fileName);
            System.out.println("url:" + url);
            return new CommonRet();
        } catch (IOException e) {
            return CommonRet.getFail("上传文件失败");
        }
    }

}
