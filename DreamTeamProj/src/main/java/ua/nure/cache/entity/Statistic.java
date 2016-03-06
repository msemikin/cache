package ua.nure.cache.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@javax.persistence.Entity
@Table(name = "statistic")
public class Statistic {

	@Id
	@Column(name = "statistic_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "name")
	private String name;

	@Column(name = "project_id")
	private int projectId;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "stattoattr", joinColumns = {
			@JoinColumn(name = "statistic_id", nullable = false, updatable = false) },
			inverseJoinColumns = {
					@JoinColumn(name = "attr_id", nullable = false, updatable = false)
			})
	private Set<Entity> entities = new HashSet<>();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public Set<Entity> getEntities() {
		return entities;
	}

	public void setEntities(Set<Entity> entities) {
		this.entities = entities;
	}

	@Override
	public boolean equals(Object obj) {
		Statistic stat = (Statistic) obj;
		if (stat.getId() == this.id) {
			return true;
		} else {
			return false;
		}
	}

}
