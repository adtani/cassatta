package org.cassatta.appbuilder.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.AbstractBeanFactory;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {

    private final AbstractBeanFactory beanFactory;

    private final Map<String,String> cache = new ConcurrentHashMap<String, String>();

    @Autowired
    protected AppConfig(AbstractBeanFactory beanFactory) {
        this.beanFactory = beanFactory;
        System.out.println("#######################################################################");
        System.out.println("AppConfig v1.0 Initialized with beanFactory!");
		System.out.println("app.version"+" = " +getProperty("1.0.0"));
		System.out.println("spring.datasource.url"+" = " +getProperty("spring.datasource.url"));
		System.out.println("spring.datasource.username"+" = " +getProperty("spring.datasource.username"));
		System.out.println("spring.datasource.password"+" = " +getProperty("spring.datasource.password"));
		System.out.println("spring.datasource.driverClassName"+" = " +getProperty("spring.datasource.driverClassName"));
		System.out.println("logging.file"+" = " +getProperty("logging.file"));
		System.out.println("filevault.root"+" = " +getProperty("filevault.root"));        
        System.out.println("#######################################################################");
    }

    public  String getProperty(String key) {
        if(cache.containsKey(key)){
            return cache.get(key);
        }

        String foundProp = null;
        try {
            foundProp = beanFactory.resolveEmbeddedValue("${" + key.trim() + "}");
            cache.put(key,foundProp);
        } catch (IllegalArgumentException ex) {
           // ok - property was not found
        }

        return foundProp;
    }
}