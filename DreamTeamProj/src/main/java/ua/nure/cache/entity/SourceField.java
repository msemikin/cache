package ua.nure.cache.entity;

import javax.persistence.*;

@Entity
@Table(name = "sourcefield")
public class SourceField {

    @Id
    @Column(name = "field_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fieldId;

    @Column(name = "name")
    private String variable;

    @ManyToOne
    @JoinColumn(name = "attr_id")
    private Attribute attribute;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dep_id")
    private AlgDep algDep;

    public int getFieldId() {
        return fieldId;
    }

    public void setFieldId(int fieldId) {
        this.fieldId = fieldId;
    }

    public String getVariable() {
        return variable;
    }

    public void setVariable(String variable) {
        this.variable = variable;
    }

    public Attribute getAttribute() {
        return attribute;
    }

    public void setAttribute(Attribute attribute) {
        this.attribute = attribute;
    }

    public AlgDep getAlgDep() {
        return algDep;
    }

    public void setAlgDep(AlgDep algDep) {
        this.algDep = algDep;
    }

    @Override
    public boolean equals(Object obj) {
        SourceField o = (SourceField) obj;
        if (o.getVariable().equals(this.getVariable())) {
            return true;
        }
        return false;
    }
}
