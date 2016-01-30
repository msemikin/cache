package ua.nure.cache.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "element")
public class Element {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "element_id")
	private int id;

	@Column(name = "name")
	private String name;

	@Column(name = "project_id")
	private int projectId;

	@OneToMany(mappedBy = "element")
	private Set<Attribute> attrs = new HashSet<>();

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

	public Set<Attribute> getAttrs() {
		return attrs;
	}

	public void setAttrs(Set<Attribute> attrs) {
		this.attrs = attrs;
	}
}
