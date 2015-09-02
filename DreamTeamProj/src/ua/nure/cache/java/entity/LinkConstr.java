package ua.nure.cache.java.entity;

public class LinkConstr {

	private int projectId;
	
	private int id;
	
	private Obj firstObject;
	
	private Obj secondObject;
	
	private String comment;
	
	public Obj getFirstObject() {
		return firstObject;
	}

	public void setFirstObject(Obj object) {
		this.firstObject = object;
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
		return secondObject;
	}

	public void setSecondObj(Obj secondObj) {
		this.secondObject = secondObj;
	}
}
