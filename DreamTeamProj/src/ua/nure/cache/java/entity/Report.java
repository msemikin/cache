package ua.nure.cache.java.entity;

import java.util.ArrayList;
import java.util.List;

public class Report {

	private int id;
	
	private String name;
	
	private List<Objekt> objects = new ArrayList<Objekt>();
	
	@Override
	public boolean equals(Object obj) {
		Report stat = (Report)obj;
		if (stat.getId() == this.id) {
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

	public List<Objekt> getObjects() {
		return objects;
	}

	public void setObjects(List<Objekt> objects) {
		this.objects = objects;
	}
}
