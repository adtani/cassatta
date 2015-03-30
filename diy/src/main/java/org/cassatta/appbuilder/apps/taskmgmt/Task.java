package org.cassatta.appbuilder.apps.taskmgmt;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

import org.cassatta.appbuilder.apps.system.BaseEntity;
import org.cassatta.appbuilder.apps.system.User;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@Entity 
@Table (name = "taskmgmt_tasks")
public class Task extends BaseEntity {
	
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

	@Column(nullable = false, name = "ASSIGNEE_ID", updatable=false, insertable=false)
	private long assigneeId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User assignee;
	
	@Column(nullable = true, name = "PARENT_ID", updatable=false, insertable=false)
	private Long parentId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Task.class)
	@JsonBackReference(value="parent")
	private Task parent;

	@Column(nullable = true, name = "PARENTAGE")
	private String parentage;

    @OneToMany(mappedBy = "parent",  cascade=CascadeType.REMOVE)
    private List<Task> subTasks;

    @OneToMany(mappedBy = "task",  cascade=CascadeType.REMOVE)
    private List<TaskFile> files;

    @OneToMany(mappedBy = "task", cascade=CascadeType.REMOVE)
    private List<TaskComment> comments;

}
