package org.cassatta.appbuilder.apps.salestracker;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity 
@Table (name = "salestracker_industries")
public class Industry {
	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = false, name = "NAME")
	private String name;
	
	@Column(nullable = false, name = "INDUSTRY_CONTACT_ID", updatable=false, insertable=false)
	private long contactId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=SalesUser.class)
	private SalesUser industryContact;

}
