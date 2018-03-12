package com.albedo.java.modules.base.web;

import com.albedo.java.common.audit.AuditEventService;
import com.albedo.java.util.DateUtil;
import com.albedo.java.util.domain.PageModel;
import com.albedo.java.web.rest.ResultBuilder;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for getting the audit events.
 *
 * @author somewhere
 */
@RestController
@RequestMapping(value = "/management/audits", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuditResource {

    private AuditEventService auditEventService;

    public AuditResource(AuditEventService auditEventService) {
        this.auditEventService = auditEventService;
    }

    /**
     * GET  /audits : get a page of AuditEvents.
     *
     * @param pm the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of AuditEvents in body
     */
    @GetMapping
    public ResponseEntity getAll(PageModel pm){
        PageModel<AuditEvent> page = auditEventService.findAll(pm);
        return ResultBuilder.buildObject(page);
    }

    /**
     * GET  /audits : get a page of AuditEvents between the fromDate and toDate.
     *
     * @param fromDate the start of the time period of AuditEvents to get
     * @param toDate   the end of the time period of AuditEvents to get
     * @param pm the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of AuditEvents in body
     */

    @GetMapping(params = {"fromDate", "toDate"})
    public ResponseEntity getByDates(
            @RequestParam(value = "fromDate") String fromDate,
            @RequestParam(value = "toDate") String toDate,
            PageModel pm) {

        PageModel<AuditEvent> page = auditEventService.findByDates(DateUtil.parseDate(fromDate), DateUtil.parseDate(toDate), pm);
        return ResultBuilder.buildObject(page);
    }

    /**
     * GET  /audits/:id : get an AuditEvent by id.
     *
     * @param id the id of the entity to get
     * @return the ResponseEntity with status 200 (OK) and the AuditEvent in body, or status 404 (Not Found)
     */
    @GetMapping(value = "/{id:.+}")
    public ResponseEntity<AuditEvent> get(@PathVariable Long id) {
        return auditEventService.find(id)
                .map((entity) -> new ResponseEntity<>(entity, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
