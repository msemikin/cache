package ua.nure.cache.dao.hibernate;

import org.apache.xmlbeans.impl.xb.xsdschema.RestrictionDocument;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.InfReqDAO;
import ua.nure.cache.entity.InformationalRequirement;

import java.util.List;

public class HibernateInfReqDAO extends HibernateDAO<InformationalRequirement>
    implements InfReqDAO {

    public HibernateInfReqDAO(final SessionFactory sessionFactory) {
        super(InformationalRequirement.class, sessionFactory);
    }

    @Override
    public List<InformationalRequirement> getProjectSearches(final int projectId) {
        return this.getProjectInfReqs(projectId, InformationalRequirement.Type.SEARCH);
    }

    @Override
    public List<InformationalRequirement> getProjectSorts(final int projectId) {
        return this.getProjectInfReqs(projectId, InformationalRequirement.Type.SORT);
    }

    @Override
    public List<InformationalRequirement> getProjectFilters(final int projectId) {
        return this.getProjectInfReqs(projectId, InformationalRequirement.Type.FILTER);
    }

    private List<InformationalRequirement> getProjectInfReqs(final int projectId, InformationalRequirement.Type type) {
        return (List<InformationalRequirement>) this.getSession()
                .createCriteria(InformationalRequirement.class)
                .add(Restrictions.eq("projectId", projectId))
                .add(Restrictions.eq("type", type))
                .list();
    }
}
