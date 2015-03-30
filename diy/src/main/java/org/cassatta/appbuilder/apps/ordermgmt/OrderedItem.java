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
import org.cassatta.appbuilder.apps.taskmgmt.Task;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity 
@Table (name = "ordermgmt_ordereditems")
public class OrderedItem {

	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = true, name = "ENTITY_TYPE")
	private String entityType;
	
	@Column(nullable = false, name = "QUANTITY")
	private int quantity;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Item.class)
	private Item item;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Order.class)
	@JsonBackReference
	private Order order;
	
	@Column(nullable = false, name = "OWNER_ID", updatable=false, insertable=false)
	private long ownerId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User owner;

}
