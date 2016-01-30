package ua.nure.cache.entity;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "algdeps")
public class AlgDep {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dep_id")
	private int id;

	@Column(name = "project_id")
	private int projectId;

	@Column(name = "name")
	private String name;

	@ManyToOne
	@JoinColumn(name = "element_id")
	private Attribute resultField;

	@OneToMany(mappedBy = "algDep")
	private List<SourceField> sourceFields = new ArrayList<>();

	@Column(name = "formula")
	private String formula;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Attribute getResultField() {
		return resultField;
	}

	public void setResultField(Attribute resultField) {
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

	@Override
	public boolean equals(Object obj) {
		AlgDep o = (AlgDep) obj;
		if (o.getId() == this.getId()) {
			return true;
		}
		return false;
	}

}
