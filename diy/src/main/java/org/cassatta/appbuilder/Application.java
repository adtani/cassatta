package org.cassatta.appbuilder;

import org.cassatta.appbuilder.apps.system.RepositoryConfiguration;
import org.cassatta.appbuilder.config.AppJpaRepository;
import org.cassatta.appbuilder.config.AppMongoRepository;
import org.cassatta.appbuilder.filters.AuthenticationInterceptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


@Configuration	
@ComponentScan
@EnableJpaRepositories(basePackages="org.cassatta.appbuilder", includeFilters=@Filter(AppJpaRepository.class))
@EnableMongoRepositories(basePackages="org.cassatta.appbuilder", includeFilters=@Filter(AppMongoRepository.class))
@Import(RepositoryConfiguration.class)
@EnableAutoConfiguration(exclude = {ErrorMvcAutoConfiguration.class})
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	@Bean
	public WebMvcConfigurerAdapter myAdapter(){
		return new MyWebMvcConfigurerAdapter();
	}

	class MyWebMvcConfigurerAdapter extends WebMvcConfigurerAdapter {

		@Override
		public void addInterceptors(InterceptorRegistry registry) {
			registry.addInterceptor(new AuthenticationInterceptor());
			super.addInterceptors(registry);
		}
		
	}

}

