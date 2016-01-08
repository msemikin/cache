package ua.nure.cache.dao.legacy.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import ua.nure.cache.constants.DBQueries;
import ua.nure.cache.dao.legacy.StudentDAO;
import ua.nure.cache.entity.User;
import ua.nure.cache.mapper.Mapper;

public class MysqlStudentDAO implements StudentDAO {

	@Override
	public void insertStudent(User user) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertStudent(con, user);
			if (result > 0) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
	}

	private int insertStudent(Connection con, User user)
			throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_STUDENT,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, user.getFullname());
			pstmt.setString(2, user.getEmail());
			pstmt.setString(3, user.getPassword());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public User getStudentByEmail(String email) {
		User result = null;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = getStudentByEmail(con, email);
			if (result != null) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result;
	}

	private User getStudentByEmail(Connection con, String email) throws SQLException {
		PreparedStatement pstmt = null;
		User user = null;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_STUDENT);
			pstmt.setString(1, email);
			ResultSet rs = pstmt.executeQuery();
			user = Mapper.unmapStudent(rs);
			MysqlDAOFactory.closeStatement(pstmt);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return user;
	}
}
