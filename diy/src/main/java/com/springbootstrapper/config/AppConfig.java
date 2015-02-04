package com.springbootstrapper.config;

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