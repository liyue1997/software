package com.qgbase.biz.info.service;

import cn.hutool.core.date.DateTime;
import com.qgbase.biz.info.domain.TYzm;
import com.qgbase.common.TBaseBo;
import com.qgbase.common.dao.CommonDao;
import com.qgbase.common.domain.OperInfo;
import com.qgbase.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;


/**
 * Created by Mark on 2019-08-03
 * * 主要用于：验证码 业务处理，此代码为自动生成
 */
@Component
public class TYzmService extends TBaseBo<TYzm>{
    @Autowired
    CommonDao commonDao;

    @Override
    public TYzm createObj() {
        return new TYzm();
    }
    @Override
    public Class getEntityClass() {
        return TYzm.class;
    }

    @Override
    public TYzm newObj(OperInfo oper) throws Exception {
        TYzm obj =  super.newObj(oper);
		//这里对新创建的对象进行初始化 ，比如 obj.setIsUsed(1);
        //写下你的处理方法


        return obj;
    }

	@Override
    public String checkAddorUpdate(TYzm obj, OperInfo oper, boolean isNew) throws Exception {
        //这里对 新增和修改 保存前进行检查，检查失败返回错误信息
		//写下你的处理方法

        return super.checkAddorUpdate(obj, oper, isNew);
    }
	
	 @Override
    public String checkDelete(TYzm obj, OperInfo oper) throws Exception  {
        //这里对 删除前进行检查，检查失败返回错误信息
		//写下你的处理方法

		return super.checkDelete(obj, oper);
    }
    public String getYzmcode()
    {
        int n=(int)((Math.random()*9+1)*100000);
        return Integer.toString(n);
    }
    public DateTime getActiveDate()
    {
        return new DateTime(DateTime.now().getTime() + 120000);//有效期1分钟
    }

    public TYzm createYzm(String useraccount, OperInfo oper)throws Exception{

        TYzm yzm= getobj(useraccount,oper);
        if (yzm !=null )
        {
            if (  DateTime.now().before(yzm.getActiveDate())  )
                throw new Exception("请莫频繁申请验证码");
            yzm.setActiveDate(getActiveDate() );

            yzm.setYzm(getYzmcode());
            return updateobj(yzm,oper);

        }
        else
        {
            yzm = newObj(oper);
            yzm.setYzm(getYzmcode());
            yzm.setUseraccount(useraccount);
            yzm.setActiveDate( getActiveDate());
            return addobj(yzm,oper);

        }
    }

    public String checkYzm(String useraccount,String yzmCode, OperInfo oper)throws Exception{

        TYzm yzm= getobj(useraccount,oper);
        if (yzm !=null )
        {
            if (  DateTime.now().after(yzm.getActiveDate())  )
                return "验证码已经过期";
            if (yzm.getYzm().equals(yzmCode))
            {
                return "";
            }
            else
                return "验证码不正确";
        }
        else
        {
                return "验证码过期";
        }
    }
}