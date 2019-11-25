package com.qgbase.util;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.OSSObjectSummary;
import com.aliyun.oss.model.ObjectListing;
import com.qgbase.config.OSSConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Date;

/**
 * @author : shl
 * @date : 2019/8/5
 */
@Component
public class OSSUtil {

    @Autowired
    private OSSConfig ossConfig;

    public static OSSUtil ossUtil;

    @PostConstruct
    public void init() {
        ossUtil = this;
    }

    /**
     * 获取OSSClient实例
     *
     * @return
     */
    private static OSSClient getOSSClient() {
        return new OSSClient(ossUtil.ossConfig.getEndpoint(), ossUtil.ossConfig.getAccessKeyId(), ossUtil.ossConfig.getAccessKeySecret());
    }

    /**
     * 文件流上传
     *
     * @param file 上传文件
     * @param key  key
     */
    public static void uploadFile(File file, String key) {
        OSSClient ossClient = getOSSClient();
        // 上传文件流
        //InputStream inputStream = new FileInputStream(fileName);
        ossClient.putObject(ossUtil.ossConfig.getBucketName(), key, file);
        ossClient.shutdown();
    }

    /**
     * MultipartFile方式上传
     *
     * @param file 上传文件
     * @param key  key
     * @return
     * @throws IOException
     */
    public static String uploadFile(MultipartFile file, String key) throws IOException {
        OSSClient ossClient = getOSSClient();
        ossClient.putObject(ossUtil.ossConfig.getBucketName(), key, file.getInputStream());
        // 生成URL
        Date expiration = new Date(System.currentTimeMillis() + 3600 *1000);
        URL url = ossClient.generatePresignedUrl(ossUtil.ossConfig.getBucketName(), key, expiration);
        ossClient.shutdown();
        return url.toString();
    }

    /**
     * 删除文件
     *
     * @param key 文件key
     */
    public static void deleteFile(String key) {
        OSSClient ossClient = getOSSClient();
        ossClient.deleteObject(ossUtil.ossConfig.getBucketName(), key);
        ossClient.shutdown();

    }

    /**
     * 获取存储对象的名字
     */
    public static void listObject() {
        OSSClient ossClient = getOSSClient();
        ObjectListing listing = ossClient.listObjects(ossUtil.ossConfig.getBucketName());
        for (OSSObjectSummary objectSummary : listing.getObjectSummaries()) {
            System.out.println(objectSummary.getKey());
        }
    }
}
