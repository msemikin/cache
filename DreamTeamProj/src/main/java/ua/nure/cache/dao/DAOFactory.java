package ua.nure.cache.dao;

public interface DAOFactory {

    <T> DAO<T> getDAO(Class<T> classInstance);

    UserDAO getUserDAO();

    ElementDAO getElementDAO();

    InfReqDAO getInfReqDAO();

    <T> ProjectDependentEntityDAO<T> getProjectDependentDAO(final Class<T> classInstance);

    ProjectDAO getProjectDAO();
}
