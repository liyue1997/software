/**
 * @author cuiwei
 * @date 2018-05-05
 */
package com.qgbase.biz.storage.service;

import cn.hutool.core.io.FileUtil;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.biz.storage.domain.TAttachment;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Component
/**
 * @author cuiwei
 * @date 2018-05-05
 */
public class StorageService extends TBaseBo<TAttachment> {
    @Autowired
    CommonDao commonDao;
    @Value("${storage.path}")
    public String storagePath;

    public TAttachment newObj(MultipartFile file, OperInfo oper) throws Exception {
        TAttachment attachment = super.newObj(oper);
        //文件唯一标志
        String uid = StringUtil.uuid().replace("-", "");
        attachment.setAttachmentId(uid);
        //保存在服务器文件名
        attachment.setNewName(uid);
        //保存在服务器的位置
        attachment.setStorePath(storagePath);
        //原文件名称
        String originFileName = file.getOriginalFilename();
        attachment.setOriginName(StringUtil.subBefore(originFileName,".",true));
        //扩展名
        String extension = StringUtil.subAfter(originFileName, ".", true);
        if (StringUtil.isNotBlankIfStr(originFileName)) {
            attachment.setFileExtension(extension);
        }
        //文件大小
        attachment.setFileSize(file.getSize());
        String fullName = String.format("%s/%s.%s",storagePath, attachment.getNewName(), attachment.getFileExtension());
        File storeFile = new File(fullName);
        FileUtil.writeFromStream(file.getInputStream(),storeFile);
        //crc32校验值
        Long crc32 = FileUtil.checksumCRC32(storeFile);
        attachment.setFileCRC32(crc32);
        addobj(attachment,oper);
        return attachment;
    }



    @Override
    public Class getEntityClass() {
        return TAttachment.class;
    }

    @Override
    protected TAttachment createObj() {

        TAttachment attachment = new TAttachment();
        attachment.setFileExtension("");
        return attachment;
    }
}
