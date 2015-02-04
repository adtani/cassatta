package com.springbootstrapper.profiles.taskmgmt;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "taskfiles", path = "taskfiles")
public interface TaskFileRepository extends PagingAndSortingRepository<TaskFile, Long> {

}
