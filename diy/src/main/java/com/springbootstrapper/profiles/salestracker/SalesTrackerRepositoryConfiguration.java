package com.springbootstrapper.profiles.salestracker;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

public class SalesTrackerRepositoryConfiguration {
 
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Industry.class);
        config.exposeIdsFor(Client.class);
        config.exposeIdsFor(Lead.class);
        config.exposeIdsFor(LeadContact.class);        
        config.exposeIdsFor(Region.class);
        config.exposeIdsFor(SalesUser.class);
    }
}