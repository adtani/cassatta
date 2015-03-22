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

import org.cassatta.appbuilder.apps.system.User;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity 
@Table (name = "taskmgmt_taskcommentsview")
public class TaskCommentView {

	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = true, name = "ENTITY_TYPE")
	private String entityType;
	
	@Column(nullable = false, name = "TITLE")
	private String title;

	@Column(nullable = false, name = "TEXT")
	private String text;
	
	@Column(nullable = false, name = "STATUS")
	private String status;
	
	@Column(name = "CREATE_DATE")
	private Date createDate;
	
	@Column(name = "UPDATE_DATE")
	private Date updateDate;

	@Column(nullable = false, name = "OWNER_ID", updatable=false, insertable=false)
	private long ownerId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User owner;
	
	@Column(nullable = false, name = "ASSIGNEE_ID", updatable=false, insertable=false)
	private long assigneeId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User assignee;

	@Column(nullable = true, name = "TASK_ID", updatable=false, insertable=false)
	private Long taskId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Task.class)
	@JsonBackReference
	private Task task;

	//Extra Fields ...
	@Column(nullable = false, name = "TASK_TITLE")
	private String taskTitle;
	
	@Column(nullable = false, name = "OWNER_NAME")
	private String ownerName;
	
	@Column(nullable = false, name = "ASSIGNEE_NAME")
	private String assigneeName;
	
}
