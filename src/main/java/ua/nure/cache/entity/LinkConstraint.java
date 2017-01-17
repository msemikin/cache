package ua.nure.cache.entity;


import javax.persistence.*;
import java.io.Serializable;

@javax.persistence.Entity
@Table(name = "linkconstraint")
public class LinkConstraint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "constr_id")
	private int id;

	@ManyToOne
	@JoinColumn(name = "first_element")
	private Entity firstEntity;

	@ManyToOne
	@JoinColumn(name = "second_element")
	private Entity secondEntity;

	@JoinColumn(name = "comment")
	private String comment;

	@JoinColumn(name = "name")
	private String name;

	@ManyToOne
	private Project project;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Entity getFirstEntity() {
		return firstEntity;
	}

	public void setFirstEntity(Entity firstEntity) {
		this.firstEntity = firstEntity;
	}

	public Entity getSecondEntity() {
		return secondEntity;
	}

	public void setSecondEntity(Entity secondEntity) {
		this.secondEntity = secondEntity;
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
