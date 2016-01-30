package ua.nure.cache.entity;

import javax.persistence.*;

@Entity
@Table(name = "link")
public class Link {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "link_id")
	private int linkId;

	@ManyToOne
	@JoinColumn(name = "first_el_id")
	private Element firstElement;

	@ManyToOne
	@JoinColumn(name = "second_el_id")
	private Element secondElement;

	@Column(name = "type")
	private String type;

	@Column(name = "comment")
	private String comment;

	@Column(name = "project_id")
	private int projectId;

	public int getLinkId() {
		return linkId;
	}

	public void setLinkId(int linkId) {
		this.linkId = linkId;
	}

	public Element getFirstElement() {
		return firstElement;
	}

	public void setFirstElement(Element firstElement) {
		this.firstElement = firstElement;
	}

	public Element getSecondElement() {
		return secondElement;
	}

	public void setSecondElement(Element secondElement) {
		this.secondElement = secondElement;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String returnDesr() {
		StringBuilder sb = new StringBuilder();
		sb.append("для связи объекта \"");
		sb.append(this.firstElement).append("\"");
		sb.append(" и объекта \"");
		sb.append(this.secondElement).append("\"");
		if (type.equals("1:M")) {
			sb.append(" справедливо, что для одного объекта \"");
			sb.append(this.firstElement).append("\"");
			sb.append(" может существовать много объектов  \"");
			sb.append(this.secondElement).append("\"");
			sb.append(", и наоборот, для одного объекта \"");
			sb.append(this.secondElement).append("\"");
			sb.append(" может существовать только один объект   \"");
			sb.append(this.firstElement).append("\"");
			sb.append(", т.е. связь типа «один-ко-многим»;");
		}
		else if (type.equals("1:1")) {
			sb.append(" справедливо, что для одного объекта \"");
			sb.append(this.firstElement).append("\"");
			sb.append(" может существовать только один объект   \"");
			sb.append(this.secondElement).append("\"");
			sb.append(", и наоборот, для одного объекта \"");
			sb.append(this.secondElement).append("\"");
			sb.append(" может существовать только один объект   \"");
			sb.append(this.firstElement).append("\"");
			sb.append(", т.е. связь типа «один-ко-одному»;");
		}
		else if (type.equals("M:1")) {
			sb.append(" справедливо, что для одного объекта \"");
			sb.append(this.secondElement).append("\"");
			sb.append(" может существовать много объектов  \"");
			sb.append(this.firstElement).append("\"");
			sb.append(", и наоборот, для одного объекта \"");
			sb.append(this.firstElement).append("\"");
			sb.append(" может существовать только один объект   \"");
			sb.append(this.secondElement).append("\"");
			sb.append(", т.е. связь типа «один-ко-многим»;");
		}
		else if (type.equals("M:M")) {
			sb.append(" справедливо, что для одного объекта \"");
			sb.append(this.firstElement).append("\"");
			sb.append(" может существовать много объектов  \"");
			sb.append(this.secondElement).append("\"");
			sb.append(", и наоборот, для одного объекта \"");
			sb.append(this.secondElement).append("\"");
			sb.append(" может существовать много объектов  \"");
			sb.append(this.firstElement).append("\"");
			sb.append(", т.е. связь типа «многие-ко-многим»;");
		}
		return sb.toString();
	}
}
