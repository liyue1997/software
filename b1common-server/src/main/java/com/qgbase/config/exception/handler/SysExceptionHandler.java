//package com.qgbase.config.exception.handler;
//
//import com.qgbase.common.enumeration.EnumResultType;
//import com.qgbase.util.TToolRequest;
//import com.qgbase.config.exception.SysRunException;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.transaction.TransactionSystemException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import javax.validation.ConstraintViolation;
//import javax.validation.ConstraintViolationException;
//import java.util.Set;
//
///**
// * Created by lbb on 2018/4/27.
// * 主要用于：异常捕获
// */
//
//@ControllerAdvice
//public class SysExceptionHandler {
//    private Class getEntityClass()
//    {
//        return SysExceptionHandler.class;
//    }
//    private final Logger logger = LoggerFactory.getLogger(getEntityClass());
//    @ExceptionHandler(value = Exception.class)
//    @ResponseBody
//    public String handle(Exception e){
//
//    }
//}
