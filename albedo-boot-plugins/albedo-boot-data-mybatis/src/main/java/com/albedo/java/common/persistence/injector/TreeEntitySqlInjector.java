package com.albedo.java.common.persistence.injector;

import com.albedo.java.common.persistence.annotation.ManyToOne;
import com.albedo.java.common.persistence.domain.TreeEntity;
import com.albedo.java.util.PublicUtil;
import com.albedo.java.util.StringUtil;
import com.albedo.java.util.base.Reflections;
import com.baomidou.mybatisplus.entity.GlobalConfiguration;
import com.baomidou.mybatisplus.entity.TableFieldInfo;
import com.baomidou.mybatisplus.entity.TableInfo;
import com.baomidou.mybatisplus.mapper.AutoSqlInjector;
import com.baomidou.mybatisplus.toolkit.GlobalConfigUtils;
import com.baomidou.mybatisplus.toolkit.SqlReservedWords;
import com.baomidou.mybatisplus.toolkit.StringUtils;
import com.baomidou.mybatisplus.toolkit.TableInfoHelper;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.ibatis.builder.MapperBuilderAssistant;
import org.apache.ibatis.mapping.SqlSource;

import java.beans.PropertyDescriptor;
import java.util.Iterator;
import java.util.List;

public class TreeEntitySqlInjector extends AutoSqlInjector {

    public final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(getClass());
    public enum SqlTreeMethod {
        FIND_TREE_LIST("findTreeList", "查询树形结构", "<script>SELECT %s FROM %s %s</script>");

        private final String method;
        private final String desc;
        private final String sql;

        private SqlTreeMethod(String method, String desc, String sql) {
            this.method = method;
            this.desc = desc;
            this.sql = sql;
        }

        public String getMethod() {
            return this.method;
        }

        public String getDesc() {
            return this.desc;
        }

        public String getSql() {
            return this.sql;
        }
    }

    @Override
    public void inject(MapperBuilderAssistant builderAssistant, Class<?> mapperClass) {
        super.inject(builderAssistant, mapperClass);
        Class<?> modelClass = this.extractModelClass(mapperClass);
        try {
            if (null != modelClass) {
                TableInfo table = TableInfoHelper.initTableInfo(builderAssistant, modelClass);
                PropertyDescriptor[] ps = PropertyUtils.getPropertyDescriptors(modelClass);
                for (PropertyDescriptor p : ps) {
                    ManyToOne annotation = Reflections.getAnnotation(mapperClass, p.getName(), ManyToOne.class);
                    if (annotation != null) {


                    }
                }


                this.injectFindTreeList(SqlTreeMethod.FIND_TREE_LIST, mapperClass, modelClass, table);
            }



        } catch (Exception e) {
            log.error("{}", e);
        }
    }

    public void injectFindTreeList(SqlTreeMethod sqlMethod, Class<?> mapperClass, Class<?> modelClass, TableInfo table) {
        String tableAlias = StringUtil.toFirstLowerCase(modelClass.getSimpleName()),sql = String.format(sqlMethod.getSql(),
            PublicUtil.toAppendStr(sqlSelectColumns(table, false, tableAlias, null),", ",
                sqlSelectColumns(table, false, TreeEntity.F_PARENT, TreeEntity.F_PARENT)
                ),
            PublicUtil.toAppendStr( table.getTableName(), " ", tableAlias, " LEFT JOIN ",
                table.getTableName(), " ", TreeEntity.F_PARENT," ON ",
                tableAlias,".",TreeEntity.F_SQL_PARENTID, " = ", TreeEntity.F_PARENT,".", TreeEntity.F_SQL_ID
                ),
            sqlWhereEntityWrapper(table, tableAlias));
        SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql, modelClass);
        this.addSelectMappedStatement(mapperClass, sqlMethod.getMethod(), sqlSource, modelClass, table);
    }

    protected String sqlSelectColumns(TableInfo table, boolean entityWrapper, String columnPrefix, String selectProfix) {
        StringBuilder columns = new StringBuilder();
        if (null != table.getResultMap()) {
            if (entityWrapper) {
                columns.append("<choose><when test=\"ew != null and ew.sqlSelect != null\">${ew.sqlSelect}</when><otherwise>");
            }

            columns.append("*");
            if (entityWrapper) {
                columns.append("</otherwise></choose>");
            }
        } else {
            if (entityWrapper) {
                columns.append("<choose><when test=\"ew != null and ew.sqlSelect != null\">${ew.sqlSelect}</when><otherwise>");
            }

            List<TableFieldInfo> fieldList = table.getFieldList();
            int size = 0;
            if (null != fieldList) {
                size = fieldList.size();
            }

            if (StringUtils.isNotEmpty(table.getKeyProperty())) {
                if(PublicUtil.isNotEmpty(columnPrefix)){
                    columns.append(columnPrefix).append(".");
                }
                String keyProperty = table.getKeyProperty();
                if(PublicUtil.isNotEmpty(selectProfix)){
                    keyProperty = selectProfix+"."+keyProperty;
                }
                if (table.isKeyRelated()) {

                    columns.append(table.getKeyColumn()).append(" AS ").append(this.sqlWordConvert(keyProperty));
                } else {
                    columns.append(this.sqlWordConvert(keyProperty));
                }

                if (size >= 1) {
                    columns.append(",");
                }
            }

            if (size >= 1) {
                int i = 0;

                for(Iterator iterator = fieldList.iterator(); iterator.hasNext(); ++i) {
                    TableFieldInfo fieldInfo = (TableFieldInfo)iterator.next();
                    String property = fieldInfo.getProperty();
                    if(PublicUtil.isNotEmpty(selectProfix)){
                        property = selectProfix+"."+property;
                    }
                    String wordConvert = this.sqlWordConvert(property);
                    if(PublicUtil.isNotEmpty(columnPrefix)){
                        columns.append(columnPrefix).append(".");
                    }
                    if (fieldInfo.getColumn().equals(wordConvert)) {
                        columns.append(wordConvert);
                    } else {
                        columns.append(fieldInfo.getColumn());
                        columns.append(" AS ").append(wordConvert);
                    }

                    if (i + 1 < size) {
                        columns.append(",");
                    }
                }
            }

            if (entityWrapper) {
                columns.append("</otherwise></choose>");
            }
        }

        return columns.toString();
    }

    protected String sqlWordConvert(String convertStr) {
        GlobalConfiguration globalConfig = GlobalConfigUtils.getGlobalConfig(this.configuration);
        return SqlReservedWords.convertQuote(globalConfig, convertStr);
    }

    protected String sqlWhereEntityWrapper(TableInfo table, String columnPrefix) {
        StringBuilder where = new StringBuilder(128);
        where.append("\n<where>");
        where.append("\n<if test=\"ew!=null\">");
        where.append("\n<if test=\"ew.entity!=null\">");
        if (StringUtils.isNotEmpty(table.getKeyProperty())) {
            where.append("\n<if test=\"ew.entity.").append(table.getKeyProperty()).append("!=null\">\n");
            if(PublicUtil.isNotEmpty(columnPrefix)){
                where.append(columnPrefix).append(".");
            }
            where.append(table.getKeyColumn()).append("=#{ew.entity.").append(table.getKeyProperty()).append("}");
            where.append("\n</if>");
        }

        List<TableFieldInfo> fieldList = table.getFieldList();
        Iterator i$ = fieldList.iterator();

        while(i$.hasNext()) {
            TableFieldInfo fieldInfo = (TableFieldInfo)i$.next();
            where.append(this.convertIfTag(fieldInfo, "ew.entity.", false));
            where.append(" AND ");
            if(PublicUtil.isNotEmpty(columnPrefix)){
                where.append(columnPrefix).append(".");
            }
            where.append(this.sqlCondition(fieldInfo.getCondition(), fieldInfo.getColumn(), "ew.entity." + fieldInfo.getEl()));
            where.append(this.convertIfTag(fieldInfo, true));
        }

        where.append("\n</if>");
        where.append("\n<if test=\"ew!=null and ew.sqlSegment!=null and ew.notEmptyOfWhere\">\n${ew.sqlSegment}\n</if>");
        where.append("\n</if>");
        where.append("\n</where>");
        where.append("\n<if test=\"ew!=null and ew.sqlSegment!=null and ew.emptyOfWhere\">\n${ew.sqlSegment}\n</if>");
        return where.toString();
    }


}
