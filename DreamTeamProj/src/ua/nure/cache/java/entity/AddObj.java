package ua.nure.cache.java.entity;

import java.util.List;

public class AddObj extends Objekt {
	
	private Attribute attr;

	@Override
	public List<Attribute> getAttrs() {
		return null;
	}

	public Attribute getAttr() {
		return attr;
	}

	public void setAttr(Attribute attr) {
		this.attr = attr;
	}
}
