package org.cassatta.appbuilder.apps.system;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Persistable implements org.springframework.data.domain.Persistable<Serializable>{
	
	private static final long serialVersionUID = 2229705071355654148L;

	@Column(nullable = false, name = "ID")	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false, name = "ENTITY_TYPE")
	private String entityType;
	
	@Column(nullable = false, name = "CREATE_TIMESTAMP")
	private Date createTimestamp;

	@Column(nullable = false, name = "UPDATE_TIMESTAMP")
	private Date updateTimestamp;
	
	
    public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public Date getCreateTimestamp() {
		return createTimestamp;
	}

	public void setCreateTimestamp(Date createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	public Date getUpdateTimestamp() {
		return updateTimestamp;
	}

	public void setUpdateTimestamp(Date updateTimestamp) {
		this.updateTimestamp = updateTimestamp;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public boolean isNew() {
        return null == getId();
    }
}
