package ua.nure.cache.entity;

import javax.persistence.*;

@javax.persistence.Entity
@Table(name = "attrconstraint")
public class AttrConstraint {

	@Id
	@Column(name = "constraint_id")
	private int id;

	@ManyToOne
	@JoinColumn(name = "attr_id")
	private Attribute object;

	@Column(name = "comment")
	private String comment;

	@Column(name = "name")
	private String name;

	@ManyToOne
	private Project project;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Attribute getAttribute() {
		return object;
	}

	public void setObject(Attribute object) {
		this.object = object;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
}
