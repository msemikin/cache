package ua.nure.cache.entity;


public class Obj {
	
	private int id;
	
	private String name;
	
	private int projectId;
	
	@Override
	public boolean equals(Object obj) {
		Objekt objekt = (Objekt) obj;
		if (objekt.getId() == this.getId() && objekt.getId()!=0 && this.getId() !=0  
				|| objekt.getName().equals(this.getName()) )  {
			return true;
		}
		else {
			return false;
		}
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

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
}
