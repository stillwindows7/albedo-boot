package com.albedo.java.common.persistence.annotation;

public @interface ManyToOne {

    /**
     * 如果是字典类型，请设置字典的name值
     */
    String name() default "";

}
