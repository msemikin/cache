package ua.nure.cache.dao.legacy;

import ua.nure.cache.entity.User;

public interface StudentDAO {

	void insertStudent(User user);
	
	User getStudentByEmail(String email);
}
