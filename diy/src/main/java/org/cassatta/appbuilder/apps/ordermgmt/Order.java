package org.cassatta.appbuilder.apps.ordermgmt;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.cassatta.appbuilder.apps.system.User;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity 
@Table (name = "ordermgmt_orders")
public class Order {

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
	
	@Column(name = "ORDER_DATE")
	private Date orderDate;

	@Column(nullable = false, name = "OWNER_ID", updatable=false, insertable=false)
	private long ownerId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User owner;

    @OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE)
    private List<OrderedItem> items;

}
