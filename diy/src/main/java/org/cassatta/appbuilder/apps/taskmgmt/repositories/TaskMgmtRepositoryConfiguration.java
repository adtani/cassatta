package org.cassatta.appbuilder.apps.taskmgmt.repositories;

import org.cassatta.appbuilder.apps.taskmgmt.Task;
import org.cassatta.appbuilder.apps.taskmgmt.TaskComment;
import org.cassatta.appbuilder.apps.taskmgmt.TaskCommentView;
import org.cassatta.appbuilder.apps.taskmgmt.TaskFile;
import org.cassatta.appbuilder.apps.taskmgmt.TaskFileView;
import org.cassatta.appbuilder.apps.taskmgmt.TaskView;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

public class TaskMgmtRepositoryConfiguration {
 
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Task.class);
        config.exposeIdsFor(TaskView.class);
        config.exposeIdsFor(TaskFile.class);
        config.exposeIdsFor(TaskFileView.class);
        config.exposeIdsFor(TaskComment.class);
        config.exposeIdsFor(TaskCommentView.class);
    }

}