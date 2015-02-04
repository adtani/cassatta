package com.springbootstrapper.filters;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AuthenticationInterceptor extends HandlerInterceptorAdapter {
	 
    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
//    	if(request.getRequestURL().indexOf("/rest")!=-1  && request.getHeader("authorized")==null){
//    		response.sendRedirect("/login");
//    		return false;
//    	}else{
//    		return true;
//    	}
    	response.setHeader("", "");
    	return true;
    }
 
}