package com.qgbase.config.aspect;

import cn.hutool.core.lang.Console;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.config.annotation.Permission;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.permission.service.IPermissionFacade;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
public class PermissionAspect {

    @Autowired
    IPermissionFacade permissionFacade;

    @Pointcut("@annotation(com.qgbase.config.annotation.Permission)")
    public void annotationPointCut() {
    }

    @Before("annotationPointCut()")
    public void before(JoinPoint joinPoint) {
        MethodSignature sign = (MethodSignature) joinPoint.getSignature();
        Method method = sign.getMethod();
        Permission permission = method.getAnnotation(Permission.class);
        Object[] objs = joinPoint.getArgs();
        for (Object obj : objs) {
            if (obj instanceof OperInfo) {
                OperInfo opr = (OperInfo) obj;
                //if (!permissionFacade.checkPermission(opr.getCurrentUser().getRoleId(), permission.moduleCode(), permission.operationCode())) {
                //    throw new SysRunException("-2", "当前用户无权限进行此操作", opr.getCurrentUser().getRoleId(), permission.moduleCode(), permission.operationCode());
                //}
            }
        }
        Console.log(permission.moduleCode() + "  " + permission.operationCode());
    }
}