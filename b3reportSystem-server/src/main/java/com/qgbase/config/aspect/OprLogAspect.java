package com.qgbase.config.aspect;

import com.qgbase.biz.operRecord.domain.OprLog;
import com.qgbase.biz.operRecord.service.OprLogService;
import com.qgbase.common.domain.FlowModel;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.enumeration.EnumResultType;
import com.qgbase.config.Constants;
import com.qgbase.config.OperLogRecorder;
import com.qgbase.config.exception.SysRunException;
import com.qgbase.util.JsonUtil;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TTool;
import com.qgbase.util.TToolRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by IntelliJ IDEA 2017.
 * User:lbb
 * Date:2018/05/14
 * Time:21:07
 * description:拦截所有controller层，记录操作日志到数数据库
 */
@Component
@Aspect
public class OprLogAspect {
    private final Logger logger = LoggerFactory.getLogger(getEntityClass());

    @Autowired
    OperLogRecorder operLogRecorder;

    @Autowired
    OprLogService oprLogService;

    protected Class getEntityClass() {
        return OprLogAspect.class;
    }


    /**
     * 定义一个切入点.
     * 解释下：
     * <p>
     * ~ 第一个 * 代表任意修饰符及任意返回值.
     * ~ 第二个 * 任意包名
     * ~ .. 匹配任意数量的参数.
     */
    @Pointcut("execution(* com.qgbase..controller..*(..))")
    void webLog() {
    }


    @Around("webLog()")
    public Object interceptor(ProceedingJoinPoint joinPoint) {
        Object result = null;
        try {
            //从WEB请求中提取操作人、IP、请求时间、请求操作系统等参数
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            HttpServletRequest requestAop = attributes.getRequest();
            OprLog oprLog = oprLogService.createObj();
            Object[] objs = joinPoint.getArgs();
            OperInfo opr = null;
            List params = new ArrayList();
            if (objs != null && objs.length > 0) {
                for (Object obj : objs) {
                    if (obj != null && obj instanceof OperInfo) {
                        opr = (OperInfo) obj;
                    } else if (!(obj instanceof HttpServletResponse || obj instanceof HttpServletRequest)) {
                        params.add(obj);
                    }
                }
            }

            //如果是非登陆情况下的请求，则由系统构造一个Guest用户
            if (opr == null) {
                opr = OperInfo.createVirtualUser();
                opr.lastIp = TToolRequest.getClientIp(requestAop);
                opr.lastOs = TToolRequest.getOsInfo(requestAop.getHeader("User-Agent"));
                opr.lastTime = TTool.getSystime();
            }
            oprLog.setClientUid(opr.clientUid);
            oprLog.setOs(opr.lastOs);
            oprLog.setIp(opr.lastIp);
            oprLog.setUserName(opr.getCurrentUser() == null ? "Guest" : opr.getCurrentUser().getUsername());
            oprLog.setOprTime(opr.lastTime == null ? new Date(System.currentTimeMillis()) : opr.lastTime);
            oprLog.setUrl(requestAop.getServletPath());
            oprLog.setClassName(joinPoint.getSignature().getDeclaringType().getSimpleName());
            oprLog.setMethodName(joinPoint.getSignature().getName());
            oprLog.setParameter(JsonUtil.toJson(params));
            long beginTime = System.currentTimeMillis();
            try {
                //执行拦截的实际方法
                result = joinPoint.proceed();
                if (result != null) {
                    oprLog.setReturnValue(JsonUtil.toJson(result));
                } else {
                    //验证码或文件类型请求无返回值
                    result = "无返回值";
                }
                oprLog.setStatus(Constants.SUCCESS);
            } catch (SysRunException e) {
                oprLog.setStatus(Constants.BIZ_EXCEPTION);
                result = TToolRequest.ResultException(e.getCode(), e.getMessage());
                oprLog.setExtend1(e.getDebug());
                logger.error(e.getMessage(), e);
            } catch (Exception e) {
                oprLog.setStatus(Constants.SYS_EXCEPTION);
                result = TToolRequest.ResultException(EnumResultType.EXCEPTION.getCode(), EnumResultType.EXCEPTION.getMsg());
                e.printStackTrace();
                oprLog.setExtend1(StringUtil.printStackTraceToString(e));
            } finally {
                oprLog.setReturnValue(JsonUtil.toJson(result));
                oprLog.setWorkTime(System.currentTimeMillis() - beginTime);
                operLogRecorder.flow(new FlowModel(opr, oprLog));
            }
        } catch (Throwable e) {
            e.printStackTrace();
        } finally {
            return result;
        }
    }
}
