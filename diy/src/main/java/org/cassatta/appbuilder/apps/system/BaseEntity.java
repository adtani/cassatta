package org.cassatta.appbuilder.apps.system;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseEntity extends Persistable {
	
	@Column(nullable = false, name = "OWNER_ID", updatable=false, insertable=false)
	private long ownerId;
	
	@ManyToOne(cascade = CascadeType.DETACH, targetEntity=User.class)
	private User owner;

	public long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(long ownerId) {
		this.ownerId = ownerId;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	
}
