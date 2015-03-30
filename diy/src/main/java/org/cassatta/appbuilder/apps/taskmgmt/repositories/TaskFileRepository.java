package org.cassatta.appbuilder.apps.taskmgmt.repositories;

import org.cassatta.appbuilder.apps.taskmgmt.TaskFile;
import org.cassatta.appbuilder.config.AppJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "org.taskmgmt.taskfiles", path = "org.taskmgmt.taskfiles")
public interface TaskFileRepository extends PagingAndSortingRepository<TaskFile, Long> {

}
