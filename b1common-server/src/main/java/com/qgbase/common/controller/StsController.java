package com.qgbase.common.controller;

import com.qgbase.app.domain.CommonRet;
import com.qgbase.common.domain.STSToken;
import com.qgbase.common.service.StsTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : shl
 * @date : 2019/8/6
 */
@RestController
public class StsController {

    @Autowired
    private StsTokenService tokenService;

    @GetMapping("get")
    public CommonRet getststoken(){
        STSToken stsToken = tokenService.getStsToken();
        return new CommonRet();
    }


}
