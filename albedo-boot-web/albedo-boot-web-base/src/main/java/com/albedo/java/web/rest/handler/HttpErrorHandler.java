package com.albedo.java.web.rest.handler;

import com.albedo.java.web.rest.ResultBuilder;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by somewhere on 2017/3/2.
 */
@Controller
public class HttpErrorHandler implements ErrorController {

    private final static String ERROR_PATH = "/error";

    /**
     * Supports the HTML Error View
     *
     * @return
     */
    @RequestMapping(value = ERROR_PATH, produces = "text/html")
    public ResponseEntity errorHtml() {
        return ResultBuilder.buildFailed("page not find");
    }

    /**
     * Supports other formats like JSON, XML
     *
     * @return
     */
    @RequestMapping(value = ERROR_PATH)
    @ResponseBody
    public ResponseEntity error() {
        return ResultBuilder.buildFailed("page not find");
    }

    /**
     * Returns the path of the error page.
     *RunAsManager did not change Authentication object
     2018-02-27 16:52:38.179 DEBUG 15744 --- [ XNIO-2 task-10] o.s.security.web.FilterChainProxy        : /management/health reached end of additional filter chain; proceeding with original chain
     2018-02-27 16:52:38.185 DEBUG 15744 --- [ XNIO-2 task-10] o.s.s.w.a.ExceptionTranslationFilter     : Chain processed normally
     2018-02-27 16:52:38.185 DEBUG 15744 --- [ XNIO-2 task-10] s.s.w.c.SecurityContextPersistenceFilter : SecurityContextHolder now cleared, as request processing completed
     * @return the error path
     */
    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
}
