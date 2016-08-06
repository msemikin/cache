package ua.nure.cache.entity;

import javax.persistence.*;
import javax.sound.midi.MidiDevice;
import java.io.Serializable;
import java.util.Set;

@javax.persistence.Entity
@Table(name = "inforeq")
public class InformationalRequirement {

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
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

	@ManyToMany()
	@JoinTable(name = "inforeq_attr",
			joinColumns = @JoinColumn(name = "inforeq_id"),
			inverseJoinColumns = @JoinColumn(name = "attr_id"))
	private Set<Attribute> attributes;

	@Column(name = "type")
	private Type type;

	@ManyToOne
	private Project project;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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
