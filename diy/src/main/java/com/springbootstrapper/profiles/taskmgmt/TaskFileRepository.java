package com.springbootstrapper.profiles.taskmgmt;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "org.taskmgmt.taskfiles", path = "org.taskmgmt.taskfiles")
public interface TaskFileRepository extends PagingAndSortingRepository<TaskFile, Long> {

}
