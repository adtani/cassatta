package com.springbootstrapper.profiles.taskmgmt;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

public class TaskMgmtRepositoryConfiguration {
 
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Task.class);
        config.exposeIdsFor(TaskView.class);
        config.exposeIdsFor(TaskFile.class);
        config.exposeIdsFor(TaskComment.class);
    }

}