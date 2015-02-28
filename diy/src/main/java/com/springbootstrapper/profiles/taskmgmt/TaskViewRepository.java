package com.springbootstrapper.profiles.taskmgmt;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.domain.User;

@RepositoryRestResource(collectionResourceRel = "org.taskmgmt.tasksview", path = "org.taskmgmt.tasksview")
public interface TaskViewRepository extends PagingAndSortingRepository<TaskView, Long> {

	List<TaskView> findByStatus(@Param("status") String status);
	List<TaskView> findByOwnerId(@Param("ownerId") long ownerId);
	List<TaskView> findByAssigneeId(@Param("assigneeId") long assigneeId);
	List<Task> findByOwnerIdAndStatusNot(@Param("ownerId") long ownerId,@Param("status") String status);
	List<Task> findByAssigneeIdAndStatusNot(@Param("assigneeId") long assigneeId,@Param("status") String status);
}
