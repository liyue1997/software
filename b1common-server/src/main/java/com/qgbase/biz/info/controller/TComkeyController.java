package com.qgbase.biz.info.controller;

import com.qgbase.biz.info.domain.TComkey;
import com.qgbase.biz.info.service.TComkeyService;
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
 * * 主要用于：业务键值 接口层，此代码为自动生成
 */
@Controller
@RequestMapping(value = "/api/TComkey")
public class TComkeyController {
    @Autowired
    TComkeyService TComkeyService;
	@Autowired
    TinfoQuery infoQuery;

	
    @Autowired
    StorageService storageService;

    @ApiOperation(value="添加对象")
    @PostMapping(value = "/addobj")
    @ResponseBody
    @Permission(moduleCode = "TComkey",operationCode = "NEW")
    public String addobj(@ModelAttribute TComkey TComkey, OperInfo opUser) throws Exception {
           TComkey obj = TComkeyService.addobj(TComkey,opUser);
           return  TToolRequest.Result(EnumResultType.SAVE_SUCCESS.getCode(), EnumResultType.SAVE_SUCCESS.getMsg(), obj);
    }
    @ApiOperation(value="查询对象")
    @PostMapping(value = "/getobj")
    @ResponseBody
    @Permission(moduleCode = "TComkey",operationCode = "QUERY")
    public String getobj(@RequestParam("id") String id,OperInfo opUser) throws Exception{
        TComkey obj = TComkeyService.getobj(id,opUser);
        return  TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), obj);
    }
    @ApiOperation(value="修改对象")
    @PostMapping(value = "/updateobj")
    @ResponseBody
    @Permission(moduleCode = "TComkey",operationCode = "UPDATE")
    public String updateobj(@ModelAttribute TComkey TComkey, OperInfo opUser) throws Exception{
        TComkey obj = TComkeyService.updateobj(TComkey,opUser);
        return  TToolRequest.Result(EnumResultType.UPDATE_SUCCESS.getCode(), EnumResultType.UPDATE_SUCCESS.getMsg(), obj);
    }
    @ApiOperation(value="删除对象")
    @PostMapping(value = "/deleteobj")
    @ResponseBody
    @Permission(moduleCode = "TComkey",operationCode = "DELETE")
    public String deleteobj(@RequestParam("id") String id,OperInfo opUser) throws Exception {
        TComkeyService.deleteobj(id,opUser);
        return TToolRequest.Result(EnumResultType.DEL_SUCCESS.getCode(), EnumResultType.DEL_SUCCESS.getMsg(),null);
    }
    @ApiOperation(value="添加初始化对象")
    @PostMapping(value = "/newObj")
    @ResponseBody
    @Permission(moduleCode = "TComkey",operationCode = "NEW")
    public String newObj(OperInfo opUser) throws Exception {
        TComkey obj = TComkeyService.newObj(opUser);
        return  TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), obj);
    }
   
	
    @ApiOperation(value="查询")
	@PostMapping(value = "/queryTComkeyList")
    @ResponseBody
    @Permission(moduleCode = "TComkey",operationCode = "QUERY")
    public String  queryTComkeyList(@RequestBody Map queryMap, OperInfo operInfo) throws Exception {
		 return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(),infoQuery.queryTComkeyList(queryMap, operInfo));
    }

	
    @ApiOperation(value="导出")
    @PostMapping(value = "/exportExcel")
    @Permission(moduleCode = "TComkey",operationCode = "QUERY")
    public void exportExcel(@RequestBody Map queryMap, HttpServletResponse response, OperInfo operInfo) throws Exception {
        List list = infoQuery.queryTComkeyList(queryMap,operInfo).getList();
        response.reset();
        response.setContentType("application/octet-stream;charset=UTF-8");
        response.setHeader("Pragma", "No-cache");
        OutputStream os = response.getOutputStream();
        ExcelUtil.writeWithMap(list,os,TComkey.class);
        os.close();
    }


    @ApiOperation(value="添加初始化对象")
    @PostMapping(value = "/importExcel/{uid}")
    @ResponseBody
    public String importExcel(@PathVariable("uid")String uid,OperInfo opr) throws Exception {
        TAttachment attachment = storageService.getobj(uid,opr);
        List<TComkey> objs = null;
        if(attachment != null)
        {
            String filePath = attachment.getStorePath() + "/" +  attachment.getNewName() + "."+  attachment.getFileExtension();
            List objList = new ArrayList();
            objs = ExcelUtil.readFrom(filePath,TComkey.class,TComkeyService,opr);
            if(objs != null && objs.size() > 0)
            {
                for(TComkey obj : objs)
                {
                    try {
                        String msg = TComkeyService.checkAddorUpdate(obj, opr,true);
                        if(StringUtil.isNotBlankIfStr(msg))
                        {
                            obj.setImportMsg(msg);
                            objList.add(obj);
                        }
                    }
                    catch (SysRunException sre)
                    {
                        sre.printStackTrace();
                        obj.setImportMsg(sre.getMessage());
                    }
                    catch (Exception e)
                    {
                        e.printStackTrace();
                        obj.setImportMsg("系统繁忙");

                    }
                }
                if(objList.size() == 0) {
                    for (TComkey obj : objs) {
                        TComkeyService.addobj(obj, opr);
                    }
                }
                else
                {
                    return TToolRequest.ResultSuccess(objList);
                }
            }

        }
        return TToolRequest.ResultSuccess(null);
    }

}
