package ua.nure.cache.java.entity;


public class SrchFltSrt {

	private int id;
	
	private int projectId;

	private Objekt object;

	@Override
	public boolean equals(Object obj) {
		SrchFltSrt o = (SrchFltSrt) obj;
		if (o.getId() == this.getId()) {
			return true;
		}
		return false;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Objekt getObject() {
		return object;
	}

	public void setObject(Objekt object) {
		this.object = object;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

}
