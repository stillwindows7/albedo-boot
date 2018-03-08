package com.albedo.java.modules.base.web;

import com.albedo.java.common.security.SecurityUtil;
import com.albedo.java.modules.sys.service.PersistentTokenService;
import com.albedo.java.util.JsonUtil;
import com.albedo.java.util.StringUtil;
import com.albedo.java.util.domain.Globals;
import com.albedo.java.util.domain.PageModel;
import com.albedo.java.web.rest.ResultBuilder;
import com.albedo.java.web.rest.base.BaseResource;
import com.alibaba.fastjson.JSON;
import com.codahale.metrics.annotation.Timed;
import com.google.common.collect.Lists;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * session 管理
 *
 * @author admin
 * @version 2017-01-03
 */
@Controller
@RequestMapping(value = "${albedo.adminPath}/sys/persistentToken")
public class PersistentTokenResource extends BaseResource {

    @Resource
    private PersistentTokenService persistentTokenService;

    @GetMapping(value = "/list")
    @Timed
    public String list() {
        return "modules/sys/persistentTokenList";
    }

    /**
     * @param pm
     */
    @GetMapping(value = "/")
    public ResponseEntity getPage(PageModel pm) {
        persistentTokenService.findPage(pm, SecurityUtil.dataScopeFilter());
        JSON rs = JsonUtil.getInstance().setRecurrenceStr("user_loginId").toJsonObject(pm);
        return ResultBuilder.buildObject(rs);
    }

    @DeleteMapping(value = "/{ids:" + Globals.LOGIN_REGEX
            + "}")
    @Timed
    public ResponseEntity delete(@PathVariable String ids) {
        log.debug("REST request to delete User: {}", ids);
        persistentTokenService.delete(Lists.newArrayList(ids.split(StringUtil.SPLIT_DEFAULT)));
        return ResultBuilder.buildOk("删除成功");
    }

}
