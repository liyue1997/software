package com.qgbase.app.controller;

import cn.hutool.core.date.DateTime;
import com.qgbase.app.dao.TAppQuery;
import com.qgbase.biz.info.service.TPictureService;
import com.qgbase.biz.info.service.TYzmService;
import com.qgbase.biz.user.service.TUserService;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TToolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class COSFileController {

    @Autowired
    TUserService tUserService;
    @Autowired
    TYzmService tYzmService;
    @Autowired
    TAppQuery tAppQuery;
    @Autowired
    com.qgbase.biz.info.service.TsUserService TsUserService;
    @Autowired
    TPictureService tPictureService;

    public String getParmams(String key, HttpServletRequest request)
    {
        String value=  request.getParameter(key);
        return value;
    }

    public OperInfo getOper(HttpServletRequest request) throws Exception {
        OperInfo oper=OperInfo.createVirtualUser();
        if (StringUtil.isNotBlank(request.getParameter("userid")) )
        {
            oper.setCurrentUser(tUserService.getobj(request.getParameter("userid"),oper));
            if (oper.getCurrentUser()==null)
                return null;

        }
        oper.lastTime= DateTime.now();
        oper.lastIp= TToolRequest.getClientIp(request);
        oper.lastOs="App"+TToolRequest.getOsInfo(request.getHeader("user-agent"));
        return oper;

    }

//    @RequestMapping(value = "/cosfile/file")
//    public CommonRet index() throws Exception {
//        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
//        HttpServletRequest request = servletRequestAttributes.getRequest();
//        HttpServletResponse response = servletRequestAttributes.getResponse();
//        System.out.println(request.getQueryString());
//        String command = request.getParameter("command");
//        System.out.println(command);
//        try {
//            //OperInfo oper=getOper(request);// OperInfo.createVirtualUser();
//            //if (oper==null && command !="CommonJust")
//            //   return CommonRet.getFail("请重新登录");
//            if (StringUtil.isNotBlank(command)) {
//                switch (command) {
//                    case "CommonJust":
//                        // 1 初始化用户身份信息(secretId, secretKey)
//                        COSCredentials cred = new BasicCOSCredentials("", "");
//                        // 2 设置bucket的区域, COS地域的简称请参照 https://cloud.tencent.com/document/product/436/6224
//                        ClientConfig clientConfig = new ClientConfig(new Region("ap-shanghai"));
//                        // 3 生成 cos 客户端
//                        COSClient cosclient = new COSClient(cred, clientConfig);
//                        // bucket名需包含appid
//                        String bucketName = "test-1251965632";
//                        String key = "123.zip";
//                        Date expirationTime = new Date(System.currentTimeMillis() + 30 * 60 * 1000);
//                        // 生成预签名上传 URL
//                        URL url = cosclient.generatePresignedUrl(bucketName, key, expirationTime, HttpMethodName.PUT);
//
//                        url.toString();
//                        return ret;
//                    default:
//                        return CommonRet.getFail("请求参数不支持:" + command);
//                }
//            } else {
//                CommonRet commonRet = CommonRet.getFail("请求参数错误");
//                //JSONObject object =new JSONObject(ret);
//                // String jsonstr = object.toString();
//                return commonRet;
//            }
//        }
//        catch (Exception e){
//            System.out.println(e);
//            e.printStackTrace();
//            return CommonRet.getFail(e.getMessage());
//
//        }
//    }

}
