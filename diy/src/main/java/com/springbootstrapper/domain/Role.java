package com.springbootstrapper.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Data
@Entity 
@Table (name = "user_roles")
public class Role {

	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(nullable = false, name = "ROLE_ID")
	private int roleId;

	@Column(nullable = false, name = "ROLE_NAME")
	private String roleName;
	
	@Column(nullable = false, name = "ENTITY_TYPE")
	private String entityType;

	@Column(nullable = false, name = "USER_ID", updatable=false, insertable=false)
	private long userId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	@JsonBackReference
	private User user;
	
}
