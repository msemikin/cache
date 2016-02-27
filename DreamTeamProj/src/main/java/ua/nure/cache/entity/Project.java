package ua.nure.cache.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "project")
public class Project {

	@Id
	@Column(name = "project_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id")
	private User owner;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "is_ready")
	private boolean isReady;

	@Column(name = "is_sent")
	private boolean isSent;

	@Column(name = "edited")
	private Date edited;

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
}
