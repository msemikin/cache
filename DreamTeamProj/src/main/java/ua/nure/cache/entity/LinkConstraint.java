package ua.nure.cache.entity;


import javax.persistence.*;

@javax.persistence.Entity
@Table(name = "linkconstraint")
public class LinkConstraint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "constraint_id")
	private int id;

	@Column(name = "project_id")
	private int projectId;

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
}
