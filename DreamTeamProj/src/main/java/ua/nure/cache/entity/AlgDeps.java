package ua.nure.cache.entity;

import java.util.ArrayList;
import java.util.List;


public class AlgDeps {
	
	private int id;
	
	private int projectId;
	
	private String name;
	
	private AddObj resultField;
	
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

	public AddObj getResultField() {
		return resultField;
	}

	public void setResultField(AddObj resultField) {
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

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
