package org.cassatta.appbuilder.apps.system;

import java.net.URI;

import org.cassatta.appbuilder.apps.taskmgmt.TaskMgmtRepositoryConfiguration;
import org.cassatta.appbuilder.filters.AuthenticationInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Configuration
public class RepositoryConfiguration extends RepositoryRestMvcConfiguration {
 
    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    	config.exposeIdsFor(Persistable.class);
    	config.exposeIdsFor(BaseEntity.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Role.class);
        config.setBaseUri(URI.create("/rest"));
        
        //Add repository configurations for individual profiles...
        new TaskMgmtRepositoryConfiguration().configureRepositoryRestConfiguration(config);
    }

	@Override
	public RequestMappingHandlerMapping repositoryExporterHandlerMapping() {
		RequestMappingHandlerMapping mappings = super.repositoryExporterHandlerMapping();
		mappings.setInterceptors(new Object[]{new AuthenticationInterceptor()});
		return mappings;
	}
 
}