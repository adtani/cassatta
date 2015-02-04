package com.springbootstrapper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.springbootstrapper.filters.AuthenticationInterceptor;
import com.springbootstrapper.repositories.RepositoryConfiguration;


@Configuration
@ComponentScan
@EnableJpaRepositories
@Import(RepositoryConfiguration.class)
@EnableAutoConfiguration
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

