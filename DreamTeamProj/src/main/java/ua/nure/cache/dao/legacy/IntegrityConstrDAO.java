package ua.nure.cache.dao.legacy;

import java.util.List;

import ua.nure.cache.entity.Constraint;
import ua.nure.cache.entity.LinkConstraint;

public interface IntegrityConstrDAO {

	int insertConstraint(Constraint constr);

	boolean updateConstraint(Constraint constr);

	boolean deleteConstraint(int constrId);

	List<Constraint> getConstraint(int projectId);

	int insertLinkConstraint(LinkConstraint constr);

	boolean updateLinkConstraint(LinkConstraint constr);

	boolean deleteLinkConstraint(int constrId);

	List<LinkConstraint> getLinkConstraint(int projectId);
}
