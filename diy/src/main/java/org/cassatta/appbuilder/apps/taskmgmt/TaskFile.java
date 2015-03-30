package org.cassatta.appbuilder.apps.taskmgmt;

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
@Table (name = "taskmgmt_taskfiles")
public class TaskFile  extends BaseEntity{

	@Column(nullable = false, name = "NAME")
	private String name;

	@Column(nullable = false, name = "PATH")
	private String path;
	
	@Column(nullable = true, name = "TASK_ID", updatable=false, insertable=false)
	private Long taskId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Task.class)
	@JsonBackReference(value="task")
	private Task task;

}
