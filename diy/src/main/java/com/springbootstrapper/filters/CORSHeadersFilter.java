package com.springbootstrapper.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.springbootstrapper.config.AppConfig;

@Component
public class CORSHeadersFilter implements Filter {
	
	@Autowired
	private AppConfig config;

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse) res;
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Expose-Headers", "Location");
		
		//Diagnostics Filters ...
		response.setHeader("app.version",config.getProperty("1.0.0"));
		response.setHeader("spring.datasource.url",config.getProperty("spring.datasource.url"));
		response.setHeader("spring.datasource.username",config.getProperty("spring.datasource.username"));
		response.setHeader("spring.datasource.password",config.getProperty("spring.datasource.password"));
		response.setHeader("spring.datasource.driverClassName",config.getProperty("spring.datasource.driverClassName"));
		response.setHeader("logging.file",config.getProperty("logging.file"));
		response.setHeader("filevault.root",config.getProperty("filevault.root"));
		chain.doFilter(req, res);
	}

	public void init(FilterConfig filterConfig) {}

	public void destroy() {}

}