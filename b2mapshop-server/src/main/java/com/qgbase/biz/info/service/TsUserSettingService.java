package com.qgbase.biz.info.service;

import com.qgbase.biz.info.domain.TsUserSetting;
import com.qgbase.biz.info.repository.TsUserSettingRepository;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by Mark on 2019-08-16
 * * 主要用于：用户设置 业务处理，此代码为自动生成
 */
@Component
public class TsUserSettingService extends TBaseBo<TsUserSetting>{
    @Autowired
    CommonDao commonDao;

    @Autowired
    private TsUserSettingRepository tsUserSettingRepository;

    @Override
    public TsUserSetting createObj() {
        return new TsUserSetting();
    }
    @Override
    public Class getEntityClass() {
        return TsUserSetting.class;
    }

    @Override
    public TsUserSetting newObj(OperInfo oper) throws Exception {
        TsUserSetting obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法
        obj.setUserSettingId(commonDao.getNewKey("USRK", "USRK", 4, 5));

        return obj;
    }

	@Override
    public String checkAddorUpdate(TsUserSetting obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(TsUserSetting obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }

    public List<TsUserSetting> findBySettingKey(String settingKey,String settingValue,OperInfo oper) throws Exception {
       return tsUserSettingRepository.findBySettingKeyAndSettingValue(settingKey,settingValue);
    }
    public TsUserSetting findBySettingKeyOne(String settingKey,String settingValue,OperInfo oper) throws Exception {
        List<TsUserSetting> values= findBySettingKey(settingKey,settingValue,oper);
        if (values.size()>0)
            return  values.get(0);
        return null;
    }
    public TsUserSetting getBySettingKey(String userId,String settingKey,OperInfo oper)throws Exception {
        List<TsUserSetting> values= tsUserSettingRepository.findByUserIdAndSettingKey(userId,settingKey);
        if (values.size()>0)
            return  values.get(0);
        return null;
    }
    public String getValueBySettingKey(String userId,String settingKey,OperInfo oper)throws Exception {
        List<TsUserSetting> values= tsUserSettingRepository.findByUserIdAndSettingKey(userId,settingKey);
        if (values.size()>0)
            return  values.get(0).getSettingValue();
        return "";
    }
    public TsUserSetting saveSettingOne(String userId,String settingKey, String settingValue, String settingDesc, OperInfo oper) throws Exception {
        List<TsUserSetting> values= tsUserSettingRepository.findByUserIdAndSettingKey(userId,settingKey);
        if (values.size()>0) {
            for (TsUserSetting value:values
                 ) {
                deleteobj(value.getUserSettingId(),oper);
            }

        }
        TsUserSetting obj=newObj(oper);
        obj.setUserId(userId);
        obj.setSettingKey(settingKey);
        obj.setSettingValue(settingValue);
        obj.setSettingDesc(settingDesc);
        addobj(obj,oper);
        return null;
    }

}