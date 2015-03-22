package org.cassatta.appbuilder.apps.taskmgmt;

import java.util.List;

import org.cassatta.appbuilder.config.AppJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "org.taskmgmt.taskcommentsview", path = "org.taskmgmt.taskcommentsview")
public interface TaskCommentViewRepository extends PagingAndSortingRepository<TaskCommentView, Long> {

	List<TaskCommentView> findByStatus(@Param("status") String status);
	List<TaskCommentView> findByOwnerId(@Param("ownerId") long ownerId);
	List<TaskCommentView> findByAssigneeId(@Param("assigneeId") long assigneeId);
	List<TaskCommentView> findByOwnerIdAndStatusNot(@Param("ownerId") long ownerId,@Param("status") String status);
	List<TaskCommentView> findByAssigneeIdAndStatusNot(@Param("assigneeId") long assigneeId,@Param("status") String status);	

}
