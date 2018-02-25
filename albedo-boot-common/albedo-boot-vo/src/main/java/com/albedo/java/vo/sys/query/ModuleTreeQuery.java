package com.albedo.java.vo.sys.query;

import lombok.Data;

/**
 * Created by somewhere on 2017/3/2.
 */
@Data
public class ModuleTreeQuery {

    private String type;
    private String all;
    private Boolean root = false;

}
