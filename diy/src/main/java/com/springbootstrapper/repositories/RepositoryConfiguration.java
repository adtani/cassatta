package com.springbootstrapper.repositories;

import java.net.URI;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import com.springbootstrapper.domain.User;
import com.springbootstrapper.filters.AuthenticationInterceptor;
import com.springbootstrapper.profiles.salestracker.SalesTrackerRepositoryConfiguration;
import com.springbootstrapper.profiles.taskmgmt.TaskMgmtRepositoryConfiguration;

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