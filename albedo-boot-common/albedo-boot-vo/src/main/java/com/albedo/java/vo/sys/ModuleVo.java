package com.albedo.java.vo.sys;

import com.albedo.java.vo.base.TreeEntityVo;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;

/**
 * Copyright 2013 albedo All right reserved Author lijie Created on 2013-10-23 下午4:29:21
 */
@Data
@ToString
public class ModuleVo extends TreeEntityVo {

    public static final String F_PERMISSION = "permission";
    public static final String ROOT_ID = "4d32c49cc7f448dcbfb92ce9c4dde058";



    private static final long serialVersionUID = 1L;
    /*** 模块类型 0 菜单模块 1权限模块 */
    private String type;

    private String target;
    /*** 请求方法*/
    private String requestMethod;
    /*** 链接地址 */
    private String url;
    /*** 图标class */
    private String iconCls;
    /*** 权限标识 */
    private String permission;
    /*** 针对顶层菜单，0 普通展示下级菜单， 1以树形结构展示 */
    private String showType;
    /*** 服务名称 */
    private String microservice;
    /*** 是否 */
    private boolean hasChild;

    private boolean menuLeaf;
    private boolean menuTop;
    private boolean show;
    private String hrefName;


}
