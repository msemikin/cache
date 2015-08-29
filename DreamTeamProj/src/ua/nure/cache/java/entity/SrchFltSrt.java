package ua.nure.cache.java.entity;

import java.util.ArrayList;
import java.util.List;

public class SrchFltSrt {

	private int id;

	private List<Objekt> object = new ArrayList<Objekt>();

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

	public List<Objekt> getObject() {
		return object;
	}

	public void setObject(List<Objekt> object) {
		this.object = object;
	}

}
