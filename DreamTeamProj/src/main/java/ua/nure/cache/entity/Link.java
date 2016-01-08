package ua.nure.cache.entity;

public class Link {
	private int linkId;
	
	private Element firstObjName = new Element();
	
	private Element seondObjName = new Element();
	
	private String linkType;
	
	private String comment;
	
	private int projectId;

	public int getLinkId() {
		return linkId;
	}

	public void setLinkId(int linkId) {
		this.linkId = linkId;
	}

	public Element getFirstObjName() {
		return firstObjName;
	}

	public void setFirstObjName(Element firstObjName) {
		this.firstObjName = firstObjName;
	}

	public Element getSeondObjName() {
		return seondObjName;
	}

	public void setSeondObjName(Element seondObjName) {
		this.seondObjName = seondObjName;
	}

	public String getLinkType() {
		return linkType;
	}

	public void setLinkType(String linkType) {
		this.linkType = linkType;
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
		sb.append(this.firstObjName).append("\"");
		sb.append(" и объекта \"");
		sb.append(this.seondObjName).append("\"");
		if (linkType.equals("1:M")) {
			sb.append(" справедливо, что для одного объекта \"");
			sb.append(this.firstObjName).append("\"");
			sb.append(" может существовать много объектов  \"");
			sb.append(this.seondObjName).append("\"");
			sb.append(", и наоборот, для одного объекта \"");
			sb.append(this.seondObjName).append("\"");
			sb.append(" может существовать только один объект   \"");
			sb.append(this.firstObjName).append("\"");
			sb.append(", т.е. связь типа «один-ко-многим»;");
		}
		else if (linkType.equals("1:1")) {
			sb.append(" справедливо, что для одного объекта \"");
			sb.append(this.firstObjName).append("\"");
			sb.append(" может существовать только один объект   \"");
			sb.append(this.seondObjName).append("\"");
			sb.append(", и наоборот, для одного объекта \"");
			sb.append(this.seondObjName).append("\"");
			sb.append(" может существовать только один объект   \"");
			sb.append(this.firstObjName).append("\"");
			sb.append(", т.е. связь типа «один-ко-одному»;");
		}
		else if (linkType.equals("M:1")) {
			sb.append(" справедливо, что для одного объекта \"");
			sb.append(this.seondObjName).append("\"");
			sb.append(" может существовать много объектов  \"");
			sb.append(this.firstObjName).append("\"");
			sb.append(", и наоборот, для одного объекта \"");
			sb.append(this.firstObjName).append("\"");
			sb.append(" может существовать только один объект   \"");
			sb.append(this.seondObjName).append("\"");
			sb.append(", т.е. связь типа «один-ко-многим»;");
		}
		else if (linkType.equals("M:M")) {
			sb.append(" справедливо, что для одного объекта \"");
			sb.append(this.firstObjName).append("\"");
			sb.append(" может существовать много объектов  \"");
			sb.append(this.seondObjName).append("\"");
			sb.append(", и наоборот, для одного объекта \"");
			sb.append(this.seondObjName).append("\"");
			sb.append(" может существовать много объектов  \"");
			sb.append(this.firstObjName).append("\"");
			sb.append(", т.е. связь типа «многие-ко-многим»;");
		}
		return sb.toString();
	}
}
