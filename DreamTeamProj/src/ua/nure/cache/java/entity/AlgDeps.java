package ua.nure.cache.java.entity;

import java.util.ArrayList;
import java.util.List;


public class AlgDeps {
	
	private int id;
	
	private Objekt resultField;
	
	private List<SourceField> sourceFields = new ArrayList<SourceField>();
	
	private String formula;
	
	@Override
	public boolean equals(Object obj) {
		AlgDeps o = (AlgDeps) obj;
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

	public Objekt getResultField() {
		return resultField;
	}

	public void setResultField(Objekt resultField) {
		this.resultField = resultField;
	}

	public List<SourceField> getSourceFields() {
		return sourceFields;
	}

	public void setSourceFields(List<SourceField> sourceFields) {
		this.sourceFields = sourceFields;
	}

	public String getFormula() {
		return formula;
	}

	public void setFormula(String formula) {
		this.formula = formula;
	}
	
	
}
