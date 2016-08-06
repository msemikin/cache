package ua.nure.cache.entity;

import javax.persistence.*;
import java.io.Serializable;

@javax.persistence.Entity
@Table(name = "diagram")
public class Diagram {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "diagram_id")
	private int id;

	@Column(name = "JSON")
	private String diagram;

	@Column(name = "type")
	private String type;

	@ManyToOne
	private Project project;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDiagram() {
		return diagram;
	}

	public void setDiagram(String diagram) {
		this.diagram = diagram;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
}