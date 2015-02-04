package com.springbootstrapper.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity 
@Table (name = "user")
public class User {

	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(nullable = false, name = "LOGIN")
	private String login;

	@Column(nullable = false, name = "NAME")
	private String name;
	
	@Column(nullable = false, name = "PASSWORD")
	private String password;
	
	@Column(nullable = false, name = "IS_ADMIN")
	private boolean isAdmin;
	
	@Column(nullable = false, name = "ACCESS_LEVEL")
	private int access;

	@Column(nullable = false, name = "ENTITY_TYPE")
	private String entityType;
	
    @OneToMany(cascade = CascadeType.DETACH, fetch = FetchType.LAZY, mappedBy = "user")
    private List<Role> roles;

}
