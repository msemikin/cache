package ua.nure.cache.dao;

import ua.nure.cache.entity.Student;

public interface StudentDAO {

	void insertStudent(Student user);
	
	Student getStudentByEmail(String email);
}
