package ua.nure.cache.java.entity;

import java.util.ArrayList;
import java.util.List;

public class Project {

	private int projectId;
	
	private List<Objekt> objects = new ArrayList<Objekt>();
	
	private List<Report> reports = new ArrayList<Report>();
	
	private Diagram diagram;

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public List<Objekt> getObjects() {
		return objects;
	}

	public void setObjects(List<Objekt> objects) {
		this.objects = objects;
	}

	public List<Report> getReports() {
		return reports;
	}

	public void setReports(List<Report> reports) {
		this.reports = reports;
	}

	public Diagram getDiagram() {
		return diagram;
	}

	public void setDiagram(Diagram diagram) {
		this.diagram = diagram;
	}
}
