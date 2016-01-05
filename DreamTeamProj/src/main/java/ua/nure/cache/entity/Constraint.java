package ua.nure.cache.entity;

public class Constraint {
	private int projectId;
	
	private int id;
	
	private AddObj object;
	
	private String comment = new String();
	
	private String name = new String();

	public AddObj getObject() {
		return object;
	}

	public void setObject(AddObj object) {
		this.object = object;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
