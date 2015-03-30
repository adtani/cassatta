package org.cassatta.appbuilder.apps.ordermgmt;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

import org.cassatta.appbuilder.apps.system.User;

@Data
@Entity 
@Table (name = "ordermgmt_items")
public class Item {

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
	
	@Column(nullable = false, name = "OWNER_ID", updatable=false, insertable=false)
	private long ownerId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User owner;

}
