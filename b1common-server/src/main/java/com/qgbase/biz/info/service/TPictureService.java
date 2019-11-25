package com.qgbase.biz.info.service;

import com.qgbase.biz.info.domain.TPicture;
import com.qgbase.biz.info.repository.PictureRepository;
import com.qgbase.biz.user.domain.TUser;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.common.enumeration.EnumResultType;
import com.qgbase.util.StringUtil;
import com.qgbase.util.TToolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by Mark on 2019-08-06
 * * 主要用于：图片 业务处理，此代码为自动生成
 */
@Component
public class TPictureService extends TBaseBo<TPicture> {
    @Autowired
    CommonDao commonDao;

    @Autowired
    private PictureRepository pictureRepository;

    @Override
    public TPicture createObj() {
        return new TPicture();
    }

    @Override
    public Class getEntityClass() {
        return TPicture.class;
    }

    @Override
    public TPicture newObj(OperInfo oper) throws Exception {
        TPicture obj = super.newObj(oper);
        //这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setPictureId(commonDao.getNewKey("pic", "pic", 4, 2));
        return obj;
    }

    @Override
    public String checkAddorUpdate(TPicture obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
        //写下你的处理方法
        return super.checkAddorUpdate(obj, oper, isNew);
    }

    @Override
    public String checkDelete(TPicture obj, OperInfo oper) throws Exception {
        //这里对 删除前进行检查，检查失败返回错误信息
        //写下你的处理方法

        return super.checkDelete(obj, oper);
    }

    /*
    根据图片类型和业务对象id 获取所有图片
     */
    public List getPicturesByObjectid(String pictureType, String objectId, OperInfo oper) {
        return commonDao.getHqlListP("from TPicture where pictureType=? and objectId=?", pictureType, objectId);
    }


    /*
    根据图片类型和业务对象id 删除所有图片
     */
    public void delPicturesByObjectid(String pictureType, String objectId, OperInfo oper) throws Exception {
        List objs = commonDao.getHqlListP("from TPicture where pictureType=? and objectId=?", pictureType, objectId);
        for (Object obj : objs
        ) {
            LogDebug(((TPicture) obj).getPictureId());
            this.deleteobj(((TPicture) obj).getPictureId(), oper);
        }
    }

    public TPicture getImgOne(String objectId, String pictureType) {
        List<TPicture> pictureList = pictureRepository.findByObjectIdAndPictureType(objectId, pictureType);
        if (null != pictureList && pictureList.size() > 0) {
            return pictureList.get(0);
        }
        return null;
    }

    public List<TPicture> getImgList(String objectId, String pictureType) {
        List<TPicture> pictureList = pictureRepository.findByObjectIdAndPictureType(objectId, pictureType);
        if (null != pictureList && pictureList.size() > 0) {
            return pictureList;
        }
        return null;
    }

    public TPicture saveImgOne(String objectId, String pictureType, String imgUrl, String imgSurl, OperInfo operInfo) throws Exception {
        TPicture picture = newObj(operInfo);
        picture.setObjectId(objectId);
        picture.setPictureType(pictureType);
        picture.setPictureSurl(imgSurl);
        picture.setPictureUrl(imgUrl);
        picture.setFileType(imgUrl.substring(imgUrl.lastIndexOf(".") + 1));
        TPicture item = getImgOne(objectId, pictureType);
        if (null != item) {
            deleteobj(item.getPictureId(), operInfo);
            return addobj(picture, operInfo);
        }
        return addobj(picture, operInfo);
    }

    public TPicture saveImgList(String objectId, String pictureType, String imgUrl, String imgSurl, OperInfo operInfo) throws Exception {
        TPicture picture = newObj(operInfo);
        picture.setObjectId(objectId);
        picture.setPictureType(pictureType);
        picture.setPictureSurl(imgSurl);
        picture.setPictureUrl(imgUrl);
        picture.setFileType(imgUrl.substring(imgUrl.lastIndexOf(".") + 1));
        return addobj(picture, operInfo);
    }
}