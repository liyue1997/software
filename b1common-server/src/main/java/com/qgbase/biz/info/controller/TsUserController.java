package com.qgbase.biz.info.controller;

import com.qgbase.biz.info.domain.TPicture;
import com.qgbase.biz.info.domain.TsUser;
import com.qgbase.biz.info.service.TPictureService;
import com.qgbase.biz.info.service.TsUserService;
import com.qgbase.biz.info.TinfoQuery;
import com.qgbase.biz.storage.domain.TAttachment;
import com.qgbase.biz.storage.service.StorageService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.enumeration.EnumResultType;
import com.qgbase.config.annotation.Permission;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.excel.ExcelUtil;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TToolRequest;
import com.qgbase.util.PageControl;
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
 * Created by Mark on 2019-08-03
 * * 主要用于：登录用户 接口层，此代码为自动生成
 */
@Controller
@RequestMapping(value = "/api/TsUser")
public class TsUserController {
    @Autowired
    TsUserService TsUserService;
    @Autowired
    TinfoQuery infoQuery;
    @Autowired
    TPictureService pictureService;


    @Autowired
    StorageService storageService;

    @ApiOperation(value = "添加对象")
    @PostMapping(value = "/addobj")
    @ResponseBody
    @Permission(moduleCode = "TsUser", operationCode = "NEW")
    public String addobj(@ModelAttribute TsUser TsUser, OperInfo opUser) throws Exception {
        TsUser obj = TsUserService.addobj(TsUser, opUser);
        return TToolRequest.Result(EnumResultType.SAVE_SUCCESS.getCode(), EnumResultType.SAVE_SUCCESS.getMsg(), obj);
    }

    @ApiOperation(value = "查询对象")
    @PostMapping(value = "/getobj")
    @ResponseBody
    @Permission(moduleCode = "TsUser", operationCode = "QUERY")
    public String getobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        TsUser user = TsUserService.getobj(id, opUser);
        TPicture picture = pictureService.getImgOne(id, "user_sfz");
        if (null != picture){
            user.setPictureId(picture.getPictureId());
            user.setPictureUrl(picture.getPictureUrl());
        }
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), user);
    }

    @ApiOperation(value = "修改对象")
    @PostMapping(value = "/updateobj")
    @ResponseBody
    @Permission(moduleCode = "TsUser", operationCode = "UPDATE")
    public String updateobj(@ModelAttribute TsUser TsUser, OperInfo opUser) throws Exception {
        TsUser obj = TsUserService.updateobj(TsUser, opUser);
        return TToolRequest.Result(EnumResultType.UPDATE_SUCCESS.getCode(), EnumResultType.UPDATE_SUCCESS.getMsg(), obj);
    }

    @ApiOperation(value = "删除对象")
    @PostMapping(value = "/deleteobj")
    @ResponseBody
    @Permission(moduleCode = "TsUser", operationCode = "DELETE")
    public String deleteobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        TsUserService.deleteobj(id, opUser);
        return TToolRequest.Result(EnumResultType.DEL_SUCCESS.getCode(), EnumResultType.DEL_SUCCESS.getMsg(), null);
    }

    @ApiOperation(value = "添加初始化对象")
    @PostMapping(value = "/newObj")
    @ResponseBody
    @Permission(moduleCode = "TsUser", operationCode = "NEW")
    public String newObj(OperInfo opUser) throws Exception {
        TsUser obj = TsUserService.newObj(opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), obj);
    }


    @ApiOperation(value = "查询")
    @PostMapping(value = "/queryTsUserList")
    @ResponseBody
    @Permission(moduleCode = "TsUser", operationCode = "QUERY")
    public String queryTsUserList(@RequestBody Map queryMap, OperInfo operInfo) throws Exception {
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), infoQuery.queryTsUserList(queryMap, operInfo));
    }


    @ApiOperation(value = "导出")
    @PostMapping(value = "/exportExcel")
    @Permission(moduleCode = "TsUser", operationCode = "QUERY")
    public void exportExcel(@RequestBody Map queryMap, HttpServletResponse response, OperInfo operInfo) throws Exception {
        List list = infoQuery.queryTsUserList(queryMap, operInfo).getList();
        response.reset();
        response.setContentType("application/octet-stream;charset=UTF-8");
        response.setHeader("Pragma", "No-cache");
        OutputStream os = response.getOutputStream();
        ExcelUtil.writeWithMap(list, os, TsUser.class);
        os.close();
    }


    @ApiOperation(value = "添加初始化对象")
    @PostMapping(value = "/importExcel/{uid}")
    @ResponseBody
    public String importExcel(@PathVariable("uid") String uid, OperInfo opr) throws Exception {
        TAttachment attachment = storageService.getobj(uid, opr);
        List<TsUser> objs = null;
        if (attachment != null) {
            String filePath = attachment.getStorePath() + "/" + attachment.getNewName() + "." + attachment.getFileExtension();
            List objList = new ArrayList();
            objs = ExcelUtil.readFrom(filePath, TsUser.class, TsUserService, opr);
            if (objs != null && objs.size() > 0) {
                for (TsUser obj : objs) {
                    try {
                        String msg = TsUserService.checkAddorUpdate(obj, opr, true);
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
                    for (TsUser obj : objs) {
                        TsUserService.addobj(obj, opr);
                    }
                } else {
                    return TToolRequest.ResultSuccess(objList);
                }
            }

        }
        return TToolRequest.ResultSuccess(null);
    }

}
