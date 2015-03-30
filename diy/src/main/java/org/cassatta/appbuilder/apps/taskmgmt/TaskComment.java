package org.cassatta.appbuilder.apps.taskmgmt;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.cassatta.appbuilder.apps.system.BaseEntity;
import org.cassatta.appbuilder.apps.system.User;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity 
@Table (name = "taskmgmt_taskcomments")
public class TaskComment  extends BaseEntity{
	
	@Column(nullable = false, name = "TITLE")
	private String title;

	@Column(nullable = false, name = "TEXT")
	private String text;
	
	@Column(nullable = false, name = "STATUS")
	private String status;
	
	@Column(nullable = false, name = "ASSIGNEE_ID", updatable=false, insertable=false)
	private long assigneeId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User assignee;

	@Column(nullable = true, name = "TASK_ID", updatable=false, insertable=false)
	private Long taskId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Task.class)
	@JsonBackReference(value="task")
	private Task task;

}
