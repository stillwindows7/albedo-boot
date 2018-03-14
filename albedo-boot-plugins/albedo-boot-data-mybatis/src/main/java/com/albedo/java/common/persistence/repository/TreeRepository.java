/**
 * Copyright &copy; 2015 <a href="http://www.bs-innotech.com/">bs-innotech</a> All rights reserved.
 */
package com.albedo.java.common.persistence.repository;

import com.albedo.java.common.persistence.domain.BaseEntity;
import com.baomidou.mybatisplus.mapper.Wrapper;
import org.apache.ibatis.annotations.Param;

import java.io.Serializable;
import java.util.List;

/**
 * TreeRepository
 *
 * @author admin
 * @version 2017-01-01
 */
public interface TreeRepository<T extends BaseEntity, PK extends Serializable> extends BaseRepository<T, PK> {

    /**
     * TreeRepository
     * 使用Wrapper 需要指定前缀 getClassNameProfix()
     * @author admin
     * @version 2017-01-01
     */
    List<T> findTreeList(@Param("ew") Wrapper<T> wrapper);

}
