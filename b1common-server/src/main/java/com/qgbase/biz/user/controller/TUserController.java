package com.qgbase.biz.user.controller;

import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.enumeration.EnumResultType;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.annotation.Permission;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.permission.service.TsRoleService;
import com.qgbase.util.TToolRequest;
import com.qgbase.biz.user.service.TUserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by lbb on 2018/4/17.
 * 主要用于：用户管理
 */
@Controller
@RequestMapping(value = "/api/user")
public class TUserController {
    @Autowired
    TUserService tUserService;
    @Autowired
    TsRoleService tsRoleService;

    @ApiOperation(value = "添加对象")
    @PostMapping(value = "/addobj")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "NEW")
    public String addobj(@ModelAttribute TUser tuser, OperInfo opUser) throws Exception {
        TUser tuser1 = tUserService.addobj(tuser, opUser);
        return TToolRequest.Result(EnumResultType.SAVE_SUCCESS.getCode(), EnumResultType.SAVE_SUCCESS.getMsg(), tuser1);
    }

    @ApiOperation(value = "查询对象")
    @PostMapping(value = "/getobj")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "QUERY")
    public String getobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        TUser tuser = tUserService.getobj(id, opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), tuser);
    }

    @ApiOperation(value = "修改对象")
    @PostMapping(value = "/updateobj")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "UPDATE")
    public String updateobj(@ModelAttribute TUser tuser, OperInfo opUser) throws Exception {
        TUser tuser1 = tUserService.updateobj(tuser, opUser);
        return TToolRequest.Result(EnumResultType.UPDATE_SUCCESS.getCode(), EnumResultType.UPDATE_SUCCESS.getMsg(), tuser1);
    }

    @ApiOperation(value = "删除对象")
    @PostMapping(value = "/deleteobj")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "DELETE")
    public String deleteobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        tUserService.deleteobj(id, opUser);
        return TToolRequest.Result(EnumResultType.DEL_SUCCESS.getCode(), EnumResultType.DEL_SUCCESS.getMsg(), null);
    }

    @ApiOperation(value = "重置密码")
    @PostMapping(value = "/restPassword")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "CZMM")
    public String restPassword(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        tUserService.restPassword(id, opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), null);
    }

    @ApiOperation(value = "更新密码")
    @PostMapping(value = "/updatePassword")
    @ResponseBody
    @Permission(moduleCode = "XGMM", operationCode = "UPDATE")
    public String updatePassword(@RequestParam("oldPass") String oldPass, @RequestParam("newPass") String newPass, OperInfo opUser) throws Exception {
        tUserService.updatePassword(opUser.getCurrentUser().getUserId(), oldPass, newPass, opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), null);
    }

    @ApiOperation(value = "添加初始化对象")
    @PostMapping(value = "/newObj")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "NEW")
    public String newObj(OperInfo opUser) throws Exception {
        TUser tuser = tUserService.newObj(opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), tuser);
    }

    @ApiOperation(value = "注销用户")
    @PostMapping(value = "/cancelobj")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "ZX")
    public String cancelobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        TUser tUser = tUserService.cancelobj(id, opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), tUser);
    }

    @ApiOperation(value = "恢复用户")
    @PostMapping(value = "/recoveryobj")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "HF")
    public String recoveryobj(@RequestParam("id") String id, OperInfo opUser) throws Exception {
        TUser tUser = tUserService.recoveryobj(id, opUser);
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), tUser);
    }

    @ApiOperation(value = "查询角色")
    @PostMapping(value = "/queryRoleList")
    @ResponseBody
    @Permission(moduleCode = "YHDLGL", operationCode = "QUERY")
    public String queryRoleList(OperInfo opUser) throws Exception {
        List list = tsRoleService.getRoleTreeList(-1, "admin");
        return TToolRequest.Result(EnumResultType.SUCCESS.getCode(), EnumResultType.SUCCESS.getMsg(), list);
    }

}
