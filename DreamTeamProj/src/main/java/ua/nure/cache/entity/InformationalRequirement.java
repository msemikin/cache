package ua.nure.cache.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "inforeq")
public class InformationalRequirement {

	@Id
	@Column(name = "inforeq_id")
	private int id;

	@Column(name = "project_id")
	private int projectId;

	@OneToMany(mappedBy = "informationalRequirement")
	private Set<Attribute> attributes;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public Set<Attribute> getAttributes() {
		return attributes;
	}

	public void setAttributes(Set<Attribute> attributes) {
		this.attributes = attributes;
	}

	@Override
	public boolean equals(Object obj) {
		InformationalRequirement o = (InformationalRequirement) obj;
		if (o.getId() == this.getId()) {
			return true;
		}
		return false;
	}

}
