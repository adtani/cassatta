package com.springbootstrapper.profiles.salestracker;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

import org.springframework.data.rest.core.annotation.RestResource;

@Data
@Entity 
@Table (name = "salestracker_clients")
public class Client {
	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = false, name = "NAME")
	private String name;
	
	@Column(nullable = false, name = "INDUSTRY_ID", updatable=false, insertable=false)
	private long industryId;

	@ManyToOne(cascade = CascadeType.MERGE, targetEntity=Industry.class)
	private Industry industry;
	
	@Column(nullable = false, name = "REGION_ID", updatable=false, insertable=false)
	private long regionId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Region.class)
	private Region region;
	
}
