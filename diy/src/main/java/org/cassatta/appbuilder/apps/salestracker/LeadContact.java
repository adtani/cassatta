package org.cassatta.appbuilder.apps.salestracker;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity 
@Table (name = "salestracker_lead_contacts")
public class LeadContact {

	@Id
	@Column(nullable = false, name = "ID")	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = false, name = "LEAD_ID", updatable=false, insertable=false)	
	private long leadId;

	@OneToOne(cascade = CascadeType.DETACH, targetEntity=Lead.class)
	private Lead lead;
	
	@Column(nullable = false, name = "CONTACT_ID", updatable=false, insertable=false)	
	private long contactId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=SalesUser.class)
	private SalesUser contact;
}
