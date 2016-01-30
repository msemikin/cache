package ua.nure.cache.entity;

import javax.persistence.*;
import javax.sound.midi.MidiDevice;
import java.util.Set;

@Entity
@Table(name = "inforeq")
public class InformationalRequirement {

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public static enum Type {
		SEARCH,
		FILTER,
		SORT
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "inforeq_id")
	private int id;

	@Column(name = "project_id")
	private int projectId;

	@ManyToMany()
	@JoinTable(name = "inforeq_attr",
			joinColumns = @JoinColumn(name = "inforeq_id"),
			inverseJoinColumns = @JoinColumn(name = "attr_id"))
	private Set<Attribute> attributes;

	@Column(name = "type")
	private Type type;

	public InformationalRequirement() {}

	public InformationalRequirement(int id, int projectId, Set<Attribute> attributes, Type type) {
		this.id = id;
		this.projectId = projectId;
		this.attributes = attributes;
		this.type = type;
	}

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
