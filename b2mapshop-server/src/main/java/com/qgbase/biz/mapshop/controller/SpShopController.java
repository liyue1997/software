package com.qgbase.biz.mapshop.controller;

import com.qgbase.biz.info.domain.TPicture;
import com.qgbase.biz.info.service.TPictureService;
import com.qgbase.biz.mapshop.TmapshopQuery;
import com.qgbase.biz.mapshop.domain.LsShop;
import com.qgbase.biz.mapshop.domain.SpShop;
import com.qgbase.biz.mapshop.service.SpShopService;
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

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by Mark on 2019-08-17
 * * 主要用于：商户信息 接口层，此代码为自动生成
 */
@Controller
@RequestMapping(value = "/api/LsShop")
public class SpShopController {
    @Autowired
    SpShopService shopService;
    @Autowired
    TmapshopQuery mapshopQuery;
    @Autowired
    TPictureService pictureService;

    @Autowired
    StorageService storageService;

    @ApiOperation(value = "添加对象")
    @PostMapping(value = "/addobj")
    @ResponseBody
    @Permission(moduleCode = "LsShop", operationCode = "NEW")
    public String addobj(@ModelAttribute SpShop shop, OperInfo opUser) throws Exception {
        return TToolRequest.Result(EnumResultType.SAVE_SUCCESS.getCode(), EnumResultType.SAVE_SUCCESS.getMsg(), shopService.addobj(shop, opUser));
    }

    @ApiOperation(value = "查询对象")
    @PostMapping(value = "/getobj")
    @ResponseBody
    @Permission(moduleCode = "LsShop", operationCode = "QUERY")
    public String getobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        SpShop obj = shopService.getobj(id, opUser);
        TPicture picture = pictureService.getImgOne(id, "user_sfz");
        if (null != picture) {
            obj.setPictureId(picture.getPictureId());
            obj.setPictureUrl(picture.getPictureUrl());
        }
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), obj);
    }

    @ApiOperation(value = "修改对象")
    @PostMapping(value = "/updateobj")
    @ResponseBody
    @Permission(moduleCode = "LsShop", operationCode = "UPDATE")
    public String updateobj(@ModelAttribute SpShop shop, OperInfo opUser) throws Exception {
        return TToolRequest.Result(EnumResultType.UPDATE_SUCCESS.getCode(), EnumResultType.UPDATE_SUCCESS.getMsg(), shopService.updateobj(shop, opUser));
    }

    @ApiOperation(value = "删除对象")
    @PostMapping(value = "/deleteobj")
    @ResponseBody
    @Permission(moduleCode = "LsShop", operationCode = "DELETE")
    public String deleteobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        shopService.deleteobj(id, opUser);
        return TToolRequest.Result(EnumResultType.DEL_SUCCESS.getCode(), EnumResultType.DEL_SUCCESS.getMsg(), null);
    }

    @ApiOperation(value = "添加初始化对象")
    @PostMapping(value = "/newObj")
    @ResponseBody
    @Permission(moduleCode = "LsShop", operationCode = "NEW")
    public String newObj(OperInfo opUser) throws Exception {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), shopService.newObj(opUser));
    }


    @ApiOperation(value = "查询")
    @PostMapping(value = "/queryLsShopList")
    @ResponseBody
    @Permission(moduleCode = "LsShop", operationCode = "QUERY")
    public String queryLsShopList(@RequestBody Map queryMap, OperInfo operInfo) throws Exception {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), mapshopQuery.querySpShopList(queryMap, operInfo));
    }


    @ApiOperation(value = "导出")
    @PostMapping(value = "/exportExcel")
    @Permission(moduleCode = "LsShop", operationCode = "QUERY")
    public void exportExcel(@RequestBody Map queryMap, HttpServletResponse response, OperInfo operInfo) throws Exception {
        List list = mapshopQuery.querySpShopList(queryMap, operInfo).getList();
        response.reset();
        response.setContentType("application/octet-stream;charset=UTF-8");
        response.setHeader("Pragma", "No-cache");
        OutputStream os = response.getOutputStream();
        ExcelUtil.writeWithMap(list, os, LsShop.class);
        os.close();
    }


    @ApiOperation(value = "添加初始化对象")
    @PostMapping(value = "/importExcel/{uid}")
    @ResponseBody
    public String importExcel(@PathVariable("uid") String uid, OperInfo opr) throws Exception {
        TAttachment attachment = storageService.getobj(uid, opr);
        List<SpShop> objs = null;
        if (attachment != null) {
            String filePath = attachment.getStorePath() + "/" + attachment.getNewName() + "." + attachment.getFileExtension();
            List objList = new ArrayList();
            objs = ExcelUtil.readFrom(filePath, SpShop.class, shopService, opr);
            if (objs != null && objs.size() > 0) {
                for (SpShop obj : objs) {
                    try {
                        String msg = shopService.checkAddorUpdate(obj, opr, true);
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
                    for (SpShop obj : objs) {
                        shopService.addobj(obj, opr);
                    }
                } else {
                    return TToolRequest.ResultSuccess(objList);
                }
            }

        }
        return TToolRequest.ResultSuccess(null);
    }

}
