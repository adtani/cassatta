package org.cassatta.appbuilder.apps.system;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity 
@Table (name = "user")
public class User extends Persistable {

	private String authorization;
	
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

   @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "user")
    private List<Role> roles;

}
