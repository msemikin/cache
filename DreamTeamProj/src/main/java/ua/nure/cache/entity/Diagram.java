package ua.nure.cache.entity;

import javax.persistence.*;

@Entity
@Table(name = "diagram")
public class Diagram {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "diagram_id")
	private int id;

	@Column(name = "diagram")
	private String diagram;

	@Column(name = "type")
	private String type;

	@Column(name = "project_id")
	private int projectId;

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

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
}