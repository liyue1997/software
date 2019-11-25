package com.qgbase.biz.info.controller;

import com.qgbase.biz.info.TinfoQuery;
import com.qgbase.biz.info.domain.TPicture;
import com.qgbase.biz.info.service.TPictureService;
import com.qgbase.biz.storage.domain.TAttachment;
import com.qgbase.biz.storage.service.StorageService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.enumeration.EnumResultType;
import com.qgbase.config.annotation.Permission;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.excel.ExcelUtil;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TToolRequest;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by Mark on 2019-08-06
 * * 主要用于：图片 接口层，此代码为自动生成
 */
@Controller
@RequestMapping(value = "/api/TPicture")
public class TPictureController {
    @Autowired
    TPictureService TPictureService;
    @Autowired
    TinfoQuery infoQuery;


    @Autowired
    StorageService storageService;

    @ApiOperation(value = "添加对象")
    @PostMapping(value = "/addobj")
    @ResponseBody
    @Permission(moduleCode = "TPicture", operationCode = "NEW")
    public String addobj(@ModelAttribute TPicture TPicture, OperInfo opUser) throws Exception {
        TPicture obj = TPictureService.addobj(TPicture, opUser);
        return TToolRequest.Result(EnumResultType.SAVE_SUCCESS.getCode(), EnumResultType.SAVE_SUCCESS.getMsg(), obj);
    }

    @ApiOperation(value = "查询对象")
    @PostMapping(value = "/getobj")
    @ResponseBody
    @Permission(moduleCode = "TPicture", operationCode = "QUERY")
    public String getobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        TPicture obj = TPictureService.getobj(id, opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), obj);
    }

    @ApiOperation(value = "修改对象")
    @PostMapping(value = "/updateobj")
    @ResponseBody
    @Permission(moduleCode = "picture", operationCode = "UPDATE")
    public String updateobj(@ModelAttribute TPicture picture, OperInfo opUser) throws Exception {
        TPicture obj = TPictureService.updateobj(picture, opUser);
        return TToolRequest.Result(EnumResultType.UPDATE_SUCCESS.getCode(), EnumResultType.UPDATE_SUCCESS.getMsg(), obj);
    }

    @ApiOperation(value = "删除对象")
    @PostMapping(value = "/deleteobj")
    @ResponseBody
    @Permission(moduleCode = "TPicture", operationCode = "DELETE")
    public String deleteobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        TPictureService.deleteobj(id, opUser);
        return TToolRequest.Result(EnumResultType.DEL_SUCCESS.getCode(), EnumResultType.DEL_SUCCESS.getMsg(), null);
    }

    @ApiOperation(value = "添加初始化对象")
    @PostMapping(value = "/newObj")
    @ResponseBody
    @Permission(moduleCode = "TPicture", operationCode = "NEW")
    public String newObj(OperInfo opUser) throws Exception {
        TPicture obj = TPictureService.newObj(opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), obj);
    }


    @ApiOperation(value = "查询")
    @PostMapping(value = "/queryTPictureList")
    @ResponseBody
    @Permission(moduleCode = "TPicture", operationCode = "QUERY")
    public String queryTPictureList(@RequestBody Map queryMap, OperInfo operInfo) throws Exception {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), infoQuery.queryTPictureList(queryMap, operInfo));
    }


    @ApiOperation(value = "获取")
    @PostMapping(value = "/getPicturesByObjectid")
    @ResponseBody
    @Permission(moduleCode = "TPicture", operationCode = "QUERY")
    public String getPicturesByObjectid(@RequestParam("pictureType") String pictureType, @RequestParam("objectId") String objectId, OperInfo operInfo) throws Exception {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg()
                , TPictureService.getPicturesByObjectid(pictureType, objectId, operInfo));
    }

    @ApiOperation(value = "导出")
    @PostMapping(value = "/exportExcel")
    @Permission(moduleCode = "TPicture", operationCode = "QUERY")
    public void exportExcel(@RequestBody Map queryMap, HttpServletResponse response, OperInfo operInfo) throws Exception {
        List list = infoQuery.queryTPictureList(queryMap, operInfo).getList();
        response.reset();
        response.setContentType("application/octet-stream;charset=UTF-8");
        response.setHeader("Pragma", "No-cache");
        OutputStream os = response.getOutputStream();
        ExcelUtil.writeWithMap(list, os, TPicture.class);
        os.close();
    }


    @ApiOperation(value = "添加初始化对象")
    @PostMapping(value = "/importExcel/{uid}")
    @ResponseBody
    public String importExcel(@PathVariable("uid") String uid, OperInfo opr) throws Exception {
        TAttachment attachment = storageService.getobj(uid, opr);
        List<TPicture> objs = null;
        if (attachment != null) {
            String filePath = attachment.getStorePath() + "/" + attachment.getNewName() + "." + attachment.getFileExtension();
            List objList = new ArrayList();
            objs = ExcelUtil.readFrom(filePath, TPicture.class, TPictureService, opr);
            if (objs != null && objs.size() > 0) {
                for (TPicture obj : objs) {
                    try {
                        String msg = TPictureService.checkAddorUpdate(obj, opr, true);
                        if (StringUtil.isNotBlankIfStr(msg)) {
                            obj.setImportMsg(msg);
                            objList.add(obj);
                        }
                    } catch (SysRunException sre) {
                        sre.printStackTrace();
                        obj.setImportMsg(sre.getMessage());
                    } catch (Exception e) {
                        e.printStackTrace();
                        obj.setImportMsg("系统繁忙");

                    }
                }
                if (objList.size() == 0) {
                    for (TPicture obj : objs) {
                        TPictureService.addobj(obj, opr);
                    }
                } else {
                    return TToolRequest.ResultSuccess(objList);
                }
            }
        }
        return TToolRequest.ResultSuccess(null);
    }

    @ApiOperation(value = "上传文件")
    @PostMapping(value = "/uploadfile")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        System.out.println("uploadfile");
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode()
                , "", null);
    }

    @ApiOperation(value = "获取图片(一个对象只有一张图片)")
    @PostMapping(value = "/getImgOne")
    @ResponseBody
    public String getImgOne(@RequestParam("objectId") String objectId, @RequestParam("pictureType") String pictureType) {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), TPictureService.getImgOne(objectId, pictureType));
    }

    @ApiOperation(value = "获取多张图片(一个对象多张图片)")
    @PostMapping(value = "/getImgList")
    @ResponseBody
    public String getImgList(@RequestParam("objectId") String objectId, @RequestParam("pictureType") String pictureType) {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), TPictureService.getImgList(objectId, pictureType));

    }

    @ApiOperation(value = "保存图片(一个对象只有一张图片)")
    @PostMapping(value = "/saveImgOne")
    @ResponseBody
    public String saveImgOne(@RequestParam("objectId") String objectId,
                             @RequestParam("pictureType") String pictureType,
                             @RequestParam("imgUrl") String imgUrl,
                             @RequestParam("imgSurl") String imgSurl,
                             OperInfo opr) throws Exception {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), TPictureService.saveImgOne(objectId, pictureType, imgUrl, imgSurl, opr));
    }

    @ApiOperation(value = "保存图片(一个对象多张图片)")
    @PostMapping(value = "/saveImgList")
    @ResponseBody
    public String saveImgList(@RequestParam("objectId") String objectId,
                              @RequestParam("pictureType") String pictureType,
                              @RequestParam("imgUrl") String imgUrl,
                              @RequestParam("imgSurl") String imgSurl,
                              OperInfo opr) throws Exception {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg()
                , TPictureService.saveImgList(objectId, pictureType, imgUrl, imgSurl, opr));
    }
}
