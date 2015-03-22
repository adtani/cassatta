package org.cassatta.appbuilder.apps.taskmgmt;

import java.util.List;

import org.cassatta.appbuilder.apps.system.User;
import org.cassatta.appbuilder.config.AppJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "org.taskmgmt.taskcomments", path = "org.taskmgmt.taskcomments")
public interface TaskCommentRepository extends PagingAndSortingRepository<TaskComment, Long> {

	List<TaskComment> findByStatus(@Param("status") String status);
	List<TaskComment> findByOwnerId(@Param("ownerId") long ownerId);
	List<TaskComment> findByAssigneeId(@Param("assigneeId") long assigneeId);
	List<TaskComment> findByOwnerIdAndStatusNot(@Param("ownerId") long ownerId,@Param("status") String status);
	List<TaskComment> findByAssigneeIdAndStatusNot(@Param("assigneeId") long assigneeId,@Param("status") String status);	
}
