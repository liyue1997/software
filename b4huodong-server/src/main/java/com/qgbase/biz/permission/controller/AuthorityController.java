package com.qgbase.biz.permission.controller;

import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.permission.service.IPermissionFacade;
import com.qgbase.permission.service.TsRoleService;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TToolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/authority")
@Controller
/**
 * 权限接口封装
 * @author cuiwei
 * @date 2018-05-09
 */
public class AuthorityController {

    @Autowired
    IPermissionFacade permissionFacade;
    @Autowired
    TsRoleService tsRoleService;

    @GetMapping("/getMenus")
    @ResponseBody
    public String getMenus(OperInfo operInfo)
    {
        TUser user = operInfo.getCurrentUser();
        List list = permissionFacade.getRoleMenuBySysIdAndRoleId("Z2",user.getRoleId());
        return TToolRequest.ResultSuccess(list);
    }

    @PostMapping("/getnewMenus")
    @ResponseBody
    public String getnewMenus(@RequestParam("sysid") String sysid,OperInfo operInfo)
    {
        TUser user = operInfo.getCurrentUser();
        List list = permissionFacade.getRoleMenuBySysIdAndRoleId(sysid,user.getRoleId());
        return TToolRequest.ResultSuccess(list);
    }
    @PostMapping("/getOprs")
    @ResponseBody
    public String getOprs(@RequestParam("moduleCode") String moduleCode,OperInfo operInfo)
    {
        TUser user = operInfo.getCurrentUser();
        String  oprs = tsRoleService.getFunctionList(moduleCode,user.getRoleId());
        if(StringUtil.isNotBlankIfStr(oprs)) {
            return TToolRequest.ResultSuccess(oprs.split(","));
        }
        else
        {
            return TToolRequest.ResultSuccess("");
        }
    }

}
