package com.springbootstrapper.repositories;

import java.net.URI;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import com.springbootstrapper.apps.salestracker.SalesTrackerRepositoryConfiguration;
import com.springbootstrapper.apps.system.User;
import com.springbootstrapper.apps.taskmgmt.TaskMgmtRepositoryConfiguration;
import com.springbootstrapper.filters.AuthenticationInterceptor;

@Configuration
public class RepositoryConfiguration extends RepositoryRestMvcConfiguration {
 
    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(User.class);
        config.setBaseUri(URI.create("/rest"));
        //Add repository configurations for individual profiles...
        new TaskMgmtRepositoryConfiguration().configureRepositoryRestConfiguration(config);
        new SalesTrackerRepositoryConfiguration().configureRepositoryRestConfiguration(config);
    }

	@Override
	public RequestMappingHandlerMapping repositoryExporterHandlerMapping() {
		RequestMappingHandlerMapping mappings = super.repositoryExporterHandlerMapping();
		mappings.setInterceptors(new Object[]{new AuthenticationInterceptor()});
		return mappings;
	}
 
}