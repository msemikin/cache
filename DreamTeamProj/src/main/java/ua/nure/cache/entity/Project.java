package ua.nure.cache.entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@javax.persistence.Entity
@Table(name = "project")
public class Project {

	@Id
	@Column(name = "project_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
	@JoinColumn(name = "owner_id")
	private User owner;

	@Column(name = "title")
	@Size(max = 64)
	@NotNull
	private String title;

	@Column(name = "description")
	@NotNull
	@Size(max = 255)
	private String description;

	@Column(name = "is_ready")
	@NotNull
	private boolean isReady;

	@Column(name = "is_sent")
	@NotNull
	private boolean isSent;

	@Column(name = "edited")
	private Date edited;

	@OneToMany(mappedBy = "project")
	private Set<Actor> actors;

	@OneToMany(mappedBy = "project")
	private Set<AlgDep> algDeps;

	@OneToMany(mappedBy = "project")
	private Set<AttrConstraint> attrConstraints;

	@OneToMany(mappedBy = "project")
    private Set<Entity> entities;

	@OneToMany(mappedBy = "project")
	private Set<Diagram> diagrams;

	@OneToMany(mappedBy = "project")
	private Set<InformationalRequirement> informationalRequirements;

	@OneToMany(mappedBy = "project")
	private Set<Link> links;

	@OneToMany(mappedBy = "project")
	private Set<Report> reports;

	@OneToMany(mappedBy = "project")
	private Set<Statistic> statistics;

	@OneToMany(mappedBy = "project")
	private Set<LinkConstraint> linkConstraints;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isReady() {
		return isReady;
	}

	public void setReady(boolean ready) {
		isReady = ready;
	}

	public boolean isSent() {
		return isSent;
	}

	public void setSent(boolean sent) {
		isSent = sent;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(final String description) {
		this.description = description;
	}

	public Date getEdited() {
		return edited;
	}

	public void setEdited(final Date edited) {
		this.edited = edited;
	}

	public Set<Actor> getActors() {
		return actors;
	}

	public void setActors(Set<Actor> actors) {
		this.actors = actors;
	}

	public Set<AlgDep> getAlgDeps() {
		return algDeps;
	}

	public void setAlgDeps(Set<AlgDep> algDeps) {
		this.algDeps = algDeps;
	}

	public Set<AttrConstraint> getAttrConstraints() {
		return attrConstraints;
	}

	public void setAttrConstraints(Set<AttrConstraint> attrConstraints) {
		this.attrConstraints = attrConstraints;
	}

	public Set<Entity> getEntities() {
		return entities;
	}

	public void setEntities(Set<Entity> entities) {
		this.entities = entities;
	}

	public Set<Diagram> getDiagrams() {
		return diagrams;
	}

	public void setDiagrams(Set<Diagram> diagrams) {
		this.diagrams = diagrams;
	}

	public Set<InformationalRequirement> getInformationalRequirements() {
		return informationalRequirements;
	}

	public void setInformationalRequirements(Set<InformationalRequirement> informationalRequirements) {
		this.informationalRequirements = informationalRequirements;
	}

	public Set<Link> getLinks() {
		return links;
	}

	public void setLinks(Set<Link> links) {
		this.links = links;
	}

	public Set<Report> getReports() {
		return reports;
	}

	public void setReports(Set<Report> reports) {
		this.reports = reports;
	}

	public Set<Statistic> getStatistics() {
		return statistics;
	}

	public void setStatistics(Set<Statistic> statistics) {
		this.statistics = statistics;
	}

	public Set<LinkConstraint> getLinkConstraints() {
		return linkConstraints;
	}

	public void setLinkConstraints(Set<LinkConstraint> linkConstraints) {
		this.linkConstraints = linkConstraints;
	}
}
