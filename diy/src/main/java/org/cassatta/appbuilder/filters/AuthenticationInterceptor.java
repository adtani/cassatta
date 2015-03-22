package org.cassatta.appbuilder.filters;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AuthenticationInterceptor extends HandlerInterceptorAdapter {
	
    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
    	if(request.getRequestURL().indexOf("/rest")!=-1){
    		if(request.getHeader("authorization")==null || (!request.getSession().getId().equals(request.getHeader("authorization")))){
    			response.setStatus(HttpStatus.FORBIDDEN.value());
        		return false;
    		}
    	}
    	return true;
    }
 
}