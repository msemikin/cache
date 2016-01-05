package ua.nure.cache.service;

import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.dao.StudentDAO;
import ua.nure.cache.entity.Student;

public class StudentService {

	public void registerStudent(Student student) {
		StudentDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getStudentDAO();
		dao.insertStudent(student);
	}
	
	public boolean loginStudent(Student student) {
		StudentDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getStudentDAO();
		Student dbData = dao.getStudentByEmail(student.getEmail());
		if (dbData == null) {
			return false;
		}
		return dbData.getPassword().equals(dbData.getPassword());
	}
}
