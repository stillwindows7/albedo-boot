package com.albedo.java.common.data.util;

import com.albedo.java.common.persistence.SpecificationDetail;
import com.albedo.java.util.PublicUtil;
import com.albedo.java.util.QueryUtil;
import com.albedo.java.util.domain.Order;
import com.albedo.java.util.domain.QueryCondition;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Created by lijie on 2018/3/8.
 */
public class QueryWrapperUtil {

    private static Collection handlerQueryConditionCollectionValue(QueryCondition queryCondition){
        Collection col = null;
        if (queryCondition.getValue() instanceof String) {
            String val = String.valueOf(queryCondition.getValue());
            col = val.contains(",") ? Lists.newArrayList(val.split(","))
                : Lists.newArrayList(val);
        }
        if (queryCondition.getValue() instanceof Collection) {
            col = (Collection) queryCondition.getValue();
        }
        return col;
    }
    private static String handlerQueryConditionLikeValue(QueryCondition queryCondition){
        String val = (String) queryCondition.getValue();
        return  !val.startsWith("%") && !val.toString().endsWith("%")
            ? PublicUtil.toAppendStr("%", val, "%") : val;
    }
    public static EntityWrapper convertSpecificationDetail(SpecificationDetail specificationDetail){
        Map<String, Object> paramsMap = Maps.newHashMap();
        EntityWrapper entityWrapper = new EntityWrapper();
        List<QueryCondition> andQueryConditions = specificationDetail.getAndQueryConditions();
        if(PublicUtil.isNotEmpty(specificationDetail.getAndQueryConditions())){
            entityWrapper.andNew();
            for(QueryCondition queryCondition : andQueryConditions){
                Object queryValue = QueryUtil.getQueryValue(queryCondition, null);
                switch (queryCondition.getOperate()) {
                    case notIn:
                        entityWrapper.notIn(queryCondition.getFieldName(), handlerQueryConditionCollectionValue(queryCondition));
                        break;
                    case in:
                        entityWrapper.in(queryCondition.getFieldName(), handlerQueryConditionCollectionValue(queryCondition));
                        break;
                    case like:entityWrapper.like(queryCondition.getFieldName(), handlerQueryConditionLikeValue(queryCondition));
                        break;
                    case notLike:entityWrapper.notLike(queryCondition.getFieldName(), handlerQueryConditionLikeValue(queryCondition));
                        break;
                    case between:
                        entityWrapper.between(queryCondition.getFieldName()
                            , queryValue
                            , QueryUtil.getQueryValue(queryCondition, queryCondition.getEndValue()));
                        break;
                    case isNull:
                        entityWrapper.isNull(queryCondition.getFieldName());
                        break;
                    case isNotNull:
                        entityWrapper.isNotNull(queryCondition.getFieldName());
                        break;
                        default:
                            entityWrapper.where(PublicUtil.toAppendStr(
                                queryCondition.getFieldName()," ",
                                queryCondition.getOperate().getOperator(), " ",
                                queryValue));
                            break;

                }
            }
        }
        List<Order> orders = specificationDetail.getOrders();
        if(PublicUtil.isNotEmpty(orders)){
            for (Order order : orders){
                entityWrapper.orderBy(order.getProperty(), Order.Direction.asc.equals(order.getDirection()));
            }
        }
        return entityWrapper;
    }
}
