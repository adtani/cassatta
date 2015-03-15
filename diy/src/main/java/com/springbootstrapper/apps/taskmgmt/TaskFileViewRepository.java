package com.springbootstrapper.apps.taskmgmt;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.config.AppJpaRepository;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "org.taskmgmt.taskfilesview", path = "org.taskmgmt.taskfilesview")
public interface TaskFileViewRepository extends PagingAndSortingRepository<TaskFileView, Long> {

}
