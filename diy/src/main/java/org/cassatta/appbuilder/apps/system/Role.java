package org.cassatta.appbuilder.apps.system;

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

@Data
@Entity 
@Table (name = "user_roles")
public class Role extends Persistable{

	@Column(nullable = false, name = "ROLE_NAME")
	private String roleName;
	
	@Column(nullable = false, name = "USER_ID", updatable=false, insertable=false)
	private long userId;

	@ManyToOne(cascade = CascadeType.REMOVE, targetEntity=User.class)
	@JsonBackReference
	private User user;
	
}
