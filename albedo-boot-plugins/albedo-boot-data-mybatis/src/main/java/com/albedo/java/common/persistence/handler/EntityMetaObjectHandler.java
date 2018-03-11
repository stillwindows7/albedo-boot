package com.albedo.java.common.persistence.handler;

import com.albedo.java.common.persistence.domain.DataEntity;
import com.albedo.java.util.PublicUtil;
import com.albedo.java.util.base.Assert;
import com.albedo.java.util.spring.SpringContextHolder;
import com.baomidou.mybatisplus.mapper.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.data.domain.AuditorAware;

import java.util.Date;

public class EntityMetaObjectHandler extends MetaObjectHandler {

    AuditorAware auditorAware;

    public AuditorAware getAuditorAware() {
        if(auditorAware==null){
            AuditorAware auditorAware = SpringContextHolder.getBean(AuditorAware.class);
            Assert.assertIsTrue(auditorAware!=null, "auditorAware is not defined");
        }
        return auditorAware;
    }

    @Override
    public void insertFill(MetaObject metaObject) {
        setFieldValByName(DataEntity.F_CREATEDBY, getAuditorAware().getCurrentAuditor(), metaObject);
        Date date = PublicUtil.getCurrentDate();
        setFieldValByName(DataEntity.F_CREATEDDATE, date, metaObject);
        setFieldValByName(DataEntity.F_LASTMODIFIEDBY, getAuditorAware().getCurrentAuditor(), metaObject);
        setFieldValByName(DataEntity.F_LASTMODIFIEDDATE, date, metaObject);

    }

    @Override
    public void updateFill(MetaObject metaObject) {
        Date date = PublicUtil.getCurrentDate();
        setFieldValByName(DataEntity.F_LASTMODIFIEDBY, getAuditorAware().getCurrentAuditor(), metaObject);
        setFieldValByName(DataEntity.F_LASTMODIFIEDDATE, date, metaObject);
    }
}
