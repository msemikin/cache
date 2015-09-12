package ua.nure.cache.java.dao;

import java.util.List;

import ua.nure.cache.java.entity.Constraint;
import ua.nure.cache.java.entity.LinkConstr;

public interface IntegrityConstrDAO {

	int insertConstraint(Constraint constr);

	boolean updateConstraint(Constraint constr);

	boolean deleteConstraint(int constrId);

	List<Constraint> getConstraint(int projectId);

	int insertLinkConstraint(LinkConstr constr);

	boolean updateLinkConstraint(LinkConstr constr);

	boolean deleteLinkConstraint(int constrId);

	List<LinkConstr> getLinkConstraint(int projectId);
}
