package ua.nure.cache.dao;

import ua.nure.cache.entity.Entity;
public interface DAOFactory {

    <T> DAO<T> getDAO(Class<T> classInstance);

    UserDAO getUserDAO();

    InfReqDAO getInfReqDAO();

    <T> ProjectDependentEntityDAO<T> getProjectDependentDAO(final Class<T> classInstance);

    ProjectDAO getProjectDAO();

    EntitiesDAO getEntityDAO();
}
