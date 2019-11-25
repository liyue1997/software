
package com.qgbase.biz.storage.controller;

import cn.hutool.core.io.FileUtil;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.biz.storage.domain.TAttachment;
import com.qgbase.biz.storage.service.StorageService;

import com.qgbase.config.exception.SysRunException;
import com.qgbase.util.TToolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Controller
@RequestMapping("/api/storage")
/**
 * 文件上传下载统一封装
 * @author cuiwei
 * @date 2018-05-05
 */
public class StorageController {
    @Autowired
    StorageService storageService;


    /**
     * 上传文件
     *
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/f")
    @ResponseBody
    public String uploadAttach(HttpServletRequest request, OperInfo operInfo) throws Exception {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getServletContext());
        Map map = new HashMap();
        if (multipartResolver.isMultipart(request)) {
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            Iterator<String> iter = multiRequest.getFileNames();
            while (iter.hasNext()) {
                String code = iter.next();
                MultipartFile file = multiRequest.getFile(code);
                TAttachment TAttachment = storageService.newObj(file, operInfo);
                map.put(file.getOriginalFilename(), TAttachment.getAttachmentId());
            }
        }
        return TToolRequest.ResultSuccess(map);
    }


    /**
     * 下载文件
     *
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/f/{fid}")
    @ResponseBody
    public void getAttatch(@PathVariable(value = "fid") String fid, OperInfo operInfo, HttpServletResponse response) throws Exception {
        TAttachment TAttachment = storageService.getobj(fid,operInfo);
        String filename = String.format("%s.%s", TAttachment.getNewName(), TAttachment.getFileExtension());
        response.setContentType("application/octet-stream; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\"");
        String fullName = String.format("%s/%s",storageService.storagePath,filename);
        OutputStream os = response.getOutputStream();
        if(FileUtil.exist(fullName)) {
            FileUtil.writeToStream(fullName,os);
            os.close();
        }
        else
        {
            throw new SysRunException("-2","文件不存在",fid,fullName);
        }
    }


//    /**
//     * 根据URI获取文件信息
//     *
//     * @param uri
//     * @return
//     * @author cuiwei
//     * @date 2018-01-04
//     */
//    @ResponseBody
//    @RequestMapping("/getInfoByUri")
//    public String getInfoByUri(@RequestParam("uri") String uri) {
//
//        Map result = new HashMap();
//        try {
//            AttachmentCommon attachmentCommon = storageService.getAttsByUri(uri);
//            result.put("data", attachmentCommon);
//            result.put("success", true);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
    }

