package org.cassatta.appbuilder.apps.salestracker;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "salestracker_leads")
public class Lead {

	@Id
	@Column(nullable = false, name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(nullable = false, name = "CURRENT_REVENUES")
	private BigDecimal currentRevenues;

	@Column(nullable = false, name = "POTENTIAL_REVENUES")
	private BigDecimal potentialRevenues;
	
	@Column(nullable = false, name = "USER_ID", updatable=false, insertable=false)
	private long userId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=SalesUser.class)
	private SalesUser user;
	
	@Column(nullable = false, name = "CLIENT_ID", updatable=false, insertable=false)
	private long clientId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Client.class)
	private Client client;

	@Column(nullable = false, name = "PROSPECT_CLIENT_NAME")
	private String prospectClient;
	
	@Column(nullable = false, name = "PROSPECT_INDUSTRY_ID", updatable=false, insertable=false)
	private long prospectIndustryId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Industry.class)
	private Industry prospectIndustry;
	
	@Column(nullable = false, name = "PROSPECT_REGION_ID", updatable=false, insertable=false)
	private long prospectRegionId;

	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=Region.class)
	private Region prospectRegion;

}
