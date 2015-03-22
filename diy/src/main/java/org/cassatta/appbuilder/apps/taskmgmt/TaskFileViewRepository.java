package org.cassatta.appbuilder.apps.taskmgmt;

import org.cassatta.appbuilder.config.AppJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "org.taskmgmt.taskfilesview", path = "org.taskmgmt.taskfilesview")
public interface TaskFileViewRepository extends PagingAndSortingRepository<TaskFileView, Long> {

}
