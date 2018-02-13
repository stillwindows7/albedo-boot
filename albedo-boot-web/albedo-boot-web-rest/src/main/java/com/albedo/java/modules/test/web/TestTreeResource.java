/**
 * Copyright &copy; 2018 <a href="https://github.com/somewhereMrli/albedo-boot">albedo-boot</a> All rights reserved.
 */
package com.albedo.java.modules.test.web;

import com.albedo.java.common.security.SecurityUtil;
import com.albedo.java.modules.test.domain.vo.TestTreeVo;
import com.albedo.java.modules.test.service.TestTreeService;
import com.albedo.java.util.JsonUtil;
import com.albedo.java.util.PublicUtil;
import com.albedo.java.util.StringUtil;
import com.albedo.java.util.domain.Globals;
import com.albedo.java.util.domain.PageModel;
import com.albedo.java.util.exception.RuntimeMsgException;
import com.albedo.java.vo.sys.query.TreeQuery;
import com.albedo.java.vo.sys.query.TreeResult;
import com.albedo.java.web.rest.ResultBuilder;
import com.albedo.java.web.rest.base.TreeVoResource;
import com.alibaba.fastjson.JSON;
import com.codahale.metrics.annotation.Timed;
import com.google.common.collect.Lists;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


/**
 * 测试树管理Controller 测试树管理
 * @author admin
 * @version 2018-02-13
 */
@Controller
@RequestMapping(value = "${albedo.adminPath}/test/testTree")
public class TestTreeResource extends TreeVoResource<TestTreeService, TestTreeVo> {

    /**
	 * GET / : 获取树型结构数据 测试树管理.
	 *
	 * @param treeQuery
	 * @return the ResponseEntity with status 200 (OK) and with body all testTree
	 */
	@GetMapping(value = "findTreeData")
	public ResponseEntity findTreeData(TreeQuery treeQuery) {
		List<TreeResult> treeResultList = service.findTreeData(treeQuery);
		return ResultBuilder.buildOk(treeResultList);
	}
	/**
	 * GET / : 获取分页界面 测试树管理.
	 *
	 */
	@GetMapping(value = "/list")
	public String list() {
		return "modules/test/testTreeList";
	}

	/**
	 * GET / : 获取分页数据源 测试树管理.
	 *
	 * @param pm the pagination information
	 * @return the ResponseEntity with status 200 (OK) and with body all testTree
	 */
	@GetMapping(value = "/")
	@Timed
	public ResponseEntity getPage(PageModel pm) {
	    service.findPage(pm, SecurityUtil.dataScopeFilter());
		JSON json = JsonUtil.getInstance().setRecurrenceStr().toJsonObject(pm);
		return ResultBuilder.buildObject(json);
	}

    /**
	 * GET / : 保存 a 测试树管理Vo 页.
	 *
	 * @param testTreeVo
	 */
	@GetMapping(value = "/form")
	@Timed
	public String form(TestTreeVo testTreeVo) {
		if (testTreeVo == null) {
            throw new RuntimeMsgException(PublicUtil.toAppendStr("查询模块管理失败，原因：无法查找到编号区域"));
        }
        if (PublicUtil.isNotEmpty(testTreeVo.getParentId())) {
            service.findOptionalTopByParentId(testTreeVo.getParentId()).ifPresent(item -> testTreeVo.setSort(item.getSort() + 30));
            service.findOneById(testTreeVo.getParentId()).ifPresent(item -> testTreeVo.setParentName(item.getName()));
        }
        if (testTreeVo.getSort() == null) {
            testTreeVo.setSort(30);
        }
		return "modules/test/testTreeForm";
	}

	/**
	 * POST / : 保存 a 测试树管理Vo.
	 *
	 * @param {className}Vo
	 */
	@PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity save(@Valid @RequestBody TestTreeVo testTreeVo) {
		log.debug("REST request to save TestTree : {}", testTreeVo);
		service.save(testTreeVo);
        return ResultBuilder.buildOk("保存测试树管理成功");
	}

	/**
	 * DELETE //:id : delete the "id" TestTree.
	 *
	 * @param ids the id of the testTree to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping(value = "/{ids:" + Globals.LOGIN_REGEX
			+ "}", produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity delete(@PathVariable String ids) {
		log.debug("REST request to delete TestTree: {}", ids);
		service.delete(Lists.newArrayList(ids.split(StringUtil.SPLIT_DEFAULT)));
		return ResultBuilder.buildOk("删除测试树管理成功");
	}
	/**
	 * lock //:id : lockOrUnLock the "id" TestTree.
	 *
	 * @param ids the id of the testTree to lock
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@PutMapping(value = "/{ids:" + Globals.LOGIN_REGEX
			+ "}", produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity lockOrUnLock(@PathVariable String ids) {
		log.debug("REST request to lockOrUnLock TestTree: {}", ids);
		service.lockOrUnLock(Lists.newArrayList(ids.split(StringUtil.SPLIT_DEFAULT)));
		return ResultBuilder.buildOk("操作测试树管理成功");
	}

}