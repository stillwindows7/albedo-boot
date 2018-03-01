package com.albedo.java.modules.sys.web;

import com.albedo.java.common.security.SecurityUtil;
import com.albedo.java.common.security.annotaion.RequiresPermissions;
import com.albedo.java.modules.sys.domain.Dict;
import com.albedo.java.modules.sys.service.DictService;
import com.albedo.java.util.DictUtil;
import com.albedo.java.util.JsonUtil;
import com.albedo.java.util.PublicUtil;
import com.albedo.java.util.StringUtil;
import com.albedo.java.util.base.Reflections;
import com.albedo.java.util.domain.ComboSearch;
import com.albedo.java.util.domain.ComboData;
import com.albedo.java.util.domain.Globals;
import com.albedo.java.util.domain.PageModel;
import com.albedo.java.util.exception.RuntimeMsgException;
import com.albedo.java.vo.base.SelectResult;
import com.albedo.java.vo.sys.DictVo;
import com.albedo.java.vo.sys.query.DictQuery;
import com.albedo.java.vo.sys.query.DictQuerySearch;
import com.albedo.java.vo.sys.query.DictTreeQuery;
import com.albedo.java.vo.sys.query.DictTreeResult;
import com.albedo.java.web.rest.ResultBuilder;
import com.albedo.java.web.rest.base.TreeVoResource;
import com.alibaba.fastjson.JSON;
import com.codahale.metrics.annotation.Timed;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * REST controller for managing Station.
 *
 * @author somewhere
 */
@Controller
@RequestMapping("${albedo.adminPath}/sys/dict")
public class DictResource extends TreeVoResource<DictService, DictVo> {


    @GetMapping(value = "findTreeData")
    @RequiresPermissions("sys_module_view")
    public ResponseEntity findTreeData(DictTreeQuery dictTreeQuery) {
        List<DictTreeResult> rs = service.findTreeData(dictTreeQuery, DictUtil.getDictList());
        return ResultBuilder.buildOk(rs);
    }

    @GetMapping(value = "findSelectData")
    public ResponseEntity findSelectData(DictQuerySearch dictQuerySearch) {
        Map<String, Object> map = Maps.newHashMap();
        if (PublicUtil.isNotEmpty(dictQuerySearch.getDictQueries())) {
            List<DictQuery> dictQueries = JSON.parseArray(dictQuerySearch.getDictQueries(), DictQuery.class);
            dictQueries.forEach(dictQuery -> map.put(StringUtil.toCamelCase(dictQuery.getCode()),
                DictUtil.getDictList(dictQuery).
                    stream().map(item -> new SelectResult(item.getVal(), item.getName())).collect(Collectors.toList())));
        }
        return ResultBuilder.buildOk(map);
    }
    @GetMapping(value = "codes")
    public ResponseEntity codes(DictQuery dictQuery, ComboSearch comboSearch) {

        List<ComboData> dataList = Lists.newArrayList();
        if(dictQuery!=null && PublicUtil.isNotEmpty(dictQuery.getCode())){
            List<Dict> dictList = DictUtil.getDictListFilterVal(dictQuery.getCode(),
                dictQuery.getFilter());
            if (PublicUtil.isNotEmpty(dictList)) {

                dictList.forEach(item -> dataList.add(Reflections.createObj(ComboData.class,
                    Lists.newArrayList(ComboData.F_ID, ComboData.F_NAME), item.getVal(), item.getName())));
            }
        }else if(comboSearch !=null){
            dataList.addAll(service.findJson(comboSearch));
        }
        return ResultBuilder.buildOk(dataList);
    }

    /**
     * @param pm
     * @return
     * @throws URISyntaxException
     */
    @GetMapping(value = "/")
    public ResponseEntity getPage(PageModel<Dict> pm) {
        pm.setSortDefaultName(Direction.DESC, Dict.F_SORT, Dict.F_LASTMODIFIEDDATE);
        service.findPage(pm);
        JSON rs = JsonUtil.getInstance().setRecurrenceStr("parent_name").toJsonObject(pm);
        return ResultBuilder.buildObject(rs);
    }

    /**
     * @param dictVo
     * @return
     * @throws URISyntaxException
     */
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity save(@Valid @RequestBody DictVo dictVo)
            throws URISyntaxException {
        log.debug("REST request to save Dict : {}", dictVo);
        // Lowercase the dictVo login before comparing with database
        if (!checkByProperty(Reflections.createObj(DictVo.class, Lists.newArrayList(DictVo.F_ID, DictVo.F_CODE),
                dictVo.getId(), dictVo.getName()))) {
            throw new RuntimeMsgException("编码已存在");
        }
        service.save(dictVo);
        DictUtil.clearCache();
        return ResultBuilder.buildOk("保存", dictVo.getName(), "成功");
    }

    /**
     * @param ids
     * @return
     */
    @DeleteMapping(value = "/{ids:" + Globals.LOGIN_REGEX
            + "}")
    @Timed
    public ResponseEntity delete(@PathVariable String ids) {
        log.debug("REST request to delete Dict: {}", ids);
        service.deleteByParentIds(Lists.newArrayList(ids.split(StringUtil.SPLIT_DEFAULT)), SecurityUtil.getCurrentUserId());
        DictUtil.clearCache();
        return ResultBuilder.buildOk("删除成功");
    }


    @PutMapping(value = "/{ids:" + Globals.LOGIN_REGEX
            + "}")
    @Timed
    public ResponseEntity lockOrUnLock(@PathVariable String ids) {
        log.debug("REST request to lockOrUnLock Dict: {}", ids);
        service.lockOrUnLockByParentIds(Lists.newArrayList(ids.split(StringUtil.SPLIT_DEFAULT)), SecurityUtil.getCurrentUserId());
        DictUtil.clearCache();
        return ResultBuilder.buildOk("操作成功");
    }

}
