package com.springbootstrapper.profiles.taskmgmt;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springbootstrapper.domain.User;

@Data
@Entity 
@Table (name = "taskmgmt_taskfilesview")
public class TaskFileView {

	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = true, name = "ENTITY_TYPE")
	private String entityType;
	
	@Column(nullable = false, name = "NAME")
	private String name;

	@Column(nullable = false, name = "PATH")
	private String path;
	
	@Column(nullable = false, name = "OWNER_ID", updatable=false, insertable=false)
	private long ownerId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User owner;
	
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

}