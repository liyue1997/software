package com.qgbase.common.controller;

import com.qgbase.app.domain.CommonRet;
import com.qgbase.common.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author : shl
 * @date : 2019/8/5
 */
@RestController
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("upload-file")
    public CommonRet uploadFile(@RequestParam("file") MultipartFile file) {
        return fileService.uploadFile(file);
    }

}
