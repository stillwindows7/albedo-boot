package com.albedo.java.common.persistence.domain;

import com.albedo.java.util.annotation.SearchField;
import com.albedo.java.util.domain.QueryCondition.Operator;
import com.baomidou.mybatisplus.annotations.TableField;
import lombok.Data;

/**
 * 数据TreeEntity类
 *
 * @author somewhere version 2013-12-27 下午12:27:10
 */
@Data
public abstract class TreeEntity<T extends TreeEntity> extends IdEntity {

    public static final String ROOT = "1";
    public static final String F_NAME = "name";
    public static final String F_PARENTID = "parentId";
    public static final String F_PARENTIDS = "parentIds";
    public static final String F_ISLEAF = "isLeaf";
    public static final String F_SORT = "sort";
    public static final String F_PARENT = "parent";
    public static final String F_SQL_NAME = "name_";
    public static final String F_SQL_PARENTID = "parent_id";
    public static final String F_SQL_PARENTIDS = "parent_ids";
    public static final String F_SQL_ISLEAF = "is_leaf";
    public static final String F_SQL_SORT = "sort_";
    private static final long serialVersionUID = 1L;
    /*** 组织名称 */
    @SearchField(op = Operator.like)
    @TableField(TreeEntity.F_SQL_NAME)
    protected String name;
    /*** 上级组织 */
    @SearchField
    @TableField(TreeEntity.F_SQL_PARENTID)
    protected String parentId;
    /*** 所有父编号 */
    @SearchField(op = Operator.like)
    @TableField(TreeEntity.F_SQL_PARENTIDS)
    protected String parentIds;
    /*** 上级组织 */
    @TableField(el = "parent.id",exist = false)
    protected T parent;
    /*** 序号 */
    @TableField(TreeEntity.F_SQL_SORT)
    protected Integer sort = 30;
    /*** 父模块名称 */
    @TableField(exist = false)
    protected String parentName;
    /*** 1 叶子节点 0非叶子节点 */
    @TableField(TreeEntity.F_SQL_ISLEAF)
    private boolean isLeaf = false;

    public TreeEntity() {
        super();
        this.sort = 30;
    }

}
