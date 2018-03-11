package com.albedo.java.common.persistence.domain;

import com.albedo.java.util.PublicUtil;
import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.Version;
import com.baomidou.mybatisplus.enums.FieldFill;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.xml.bind.annotation.XmlTransient;
import java.util.Date;

/**
 * Base abstract class for entities which will hold definitions for created, last modified by and created,
 * last modified by date.
 */
@Data
public abstract class DataEntity<T extends BaseEntity> extends BaseEntity<T> {

    private static final long serialVersionUID = 1L;
    @JSONField(serialize = false)
    @ApiModelProperty(hidden = true)
    @TableField(value = "created_by",fill = FieldFill.INSERT)
    protected String createdBy;


    @TableField(value = "created_date",fill = FieldFill.INSERT)
    protected Date createdDate = PublicUtil.getCurrentDate();

    @TableField(value = "last_modified_by",fill = FieldFill.INSERT_UPDATE)
    protected String lastModifiedBy;

    @TableField(value = "last_modified_date",fill = FieldFill.INSERT_UPDATE)
    protected Date lastModifiedDate = PublicUtil.getCurrentDate();

    /*** 默认0，必填，离线乐观锁 */
    @Version
    @JSONField(serialize = false)
    @XmlTransient
    @ApiModelProperty(hidden = true)
    @TableField("version_")
    protected Integer version = 0;

    /*** 备注 */
    @XmlTransient
    @TableField("description_")
    protected String description;


}
