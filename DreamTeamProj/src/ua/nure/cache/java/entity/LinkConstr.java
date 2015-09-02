package ua.nure.cache.java.entity;

public class LinkConstr {

	private int projectId;
	
	private int id;
	
	private Obj firstObj;
	
	private Obj secondObj;
	
	private String comment;
	
	public Obj getFirstObject() {
		return firstObj;
	}

	public void setFirstObject(Obj object) {
		this.firstObj = object;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Obj getSecondObj() {
		return secondObj;
	}

	public void setSecondObj(Obj secondObj) {
		this.secondObj = secondObj;
	}
}
