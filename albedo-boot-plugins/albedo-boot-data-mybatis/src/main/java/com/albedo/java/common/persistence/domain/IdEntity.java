package com.albedo.java.common.persistence.domain;

import com.albedo.java.util.PublicUtil;
import com.albedo.java.util.annotation.SearchField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;


public class IdEntity<T extends BaseEntity> extends DataEntity<T> {

    private static final long serialVersionUID = 1L;
    @SearchField
    @TableId(value = GeneralEntity.F_SQL_ID, type = IdType.UUID)
    protected String id; // 编号

    public IdEntity() {
        super();
    }

    @Override
    protected Serializable pkVal() {
        return getId();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        if (PublicUtil.isNotEmpty(id)) this.id = id;
    }

}
