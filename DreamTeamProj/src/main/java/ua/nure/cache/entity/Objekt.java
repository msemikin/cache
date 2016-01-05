package ua.nure.cache.entity;

import java.util.ArrayList;
import java.util.List;

public class Objekt extends Obj {

	private List<Attribute> attrs = new ArrayList<Attribute>();

	public List<Attribute> getAttrs() {
		return attrs;
	}

	public void setAttrs(List<Attribute> attrs) {
		this.attrs = attrs;
	}

	@Override
	public String toString() {
		return this.getName();
	}
}
