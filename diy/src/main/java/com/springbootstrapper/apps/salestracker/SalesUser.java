package com.springbootstrapper.apps.salestracker;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity 
@Table (name = "salestracker_salesusers")
public class SalesUser {

	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = false, name = "FIRST_NAME")
	private String firstName;

	@Column(nullable = false, name = "LAST_NAME")
	private String lastName;

}
