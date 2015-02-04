package com.springbootstrapper.profiles.taskmgmt;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springbootstrapper.domain.User;

@Data
@Entity 
@Table (name = "taskmgmt_tasks")
public class Task {

	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = true, name = "ENTITY_TYPE")
	private String entityType;
	
	@Column(nullable = false, name = "TITLE")
	private String title;

	@Column(nullable = false, name = "SUMMARY")
	private String summary;
	
	@Column(nullable = false, name = "STATUS")
	private String status;
	
	@Column(nullable = false, name = "PRIORITY")
	private int priority;

	@Column(name = "DUE_DATE")
	private Date dueDate;

	@Column(nullable = false, name = "OWNER_ID", updatable=false, insertable=false)
	private long ownerId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User owner;

	@Column(nullable = false, name = "ASSIGNEE_ID", updatable=false, insertable=false)
	private long assigneeId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User assignee;
	
	@Column(nullable = true, name = "PARENT_ID", updatable=false, insertable=false)
	private Long parentId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Task.class)
	@JsonBackReference
	private Task parent;

	@Column(nullable = true, name = "PARENTAGE")
	private String parentage;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent")
    private List<Task> subTasks;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "task")
    private List<TaskFile> files;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "task")
    private List<TaskComment> comments;

}
