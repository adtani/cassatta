package com.springbootstrapper.apps.taskmgmt;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.apps.system.User;

@RepositoryRestResource(collectionResourceRel = "org.taskmgmt.tasks", path = "org.taskmgmt.tasks")
public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {

	List<Task> findByStatus(@Param("status") String status);
	List<Task> findByOwnerId(@Param("ownerId") long ownerId);
	List<Task> findByAssigneeId(@Param("assigneeId") long assigneeId);
	List<Task> findByOwnerIdAndStatusNot(@Param("ownerId") long ownerId,@Param("status") String status);
	List<Task> findByAssigneeIdAndStatusNot(@Param("assigneeId") long assigneeId,@Param("status") String status);	
}
