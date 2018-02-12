package com.albedo.java.common.security.annotaion;

import java.lang.annotation.*;

/**
 * Created by lijie on 2018/2/12.
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequiresPermissions {
    String[] value();
}
