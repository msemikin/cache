package ua.nure.cache.java.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Report;
import ua.nure.cache.java.entity.SrchFltSrt;
import ua.nure.cache.java.entity.Statistic;

public class Mapper {

	public static List<Objekt> unmapProjObj(ResultSet rs) throws SQLException {
		List<Objekt> obj = new ArrayList<Objekt>();
		while (rs.next()) {
			Objekt objekt = new Objekt();
			objekt.setId(rs.getInt(1));
			objekt.setName(rs.getString(2));
			Attribute attr = new Attribute();
			attr.setId(rs.getInt(3));
			attr.setName(rs.getString(4));
			if (obj.contains(objekt)) {
				obj.get(obj.lastIndexOf(objekt)).getAttrs().add(attr);
			}
			else {
				objekt.getAttrs().add(attr);
				obj.add(objekt);
			}
		}
		return obj;
	}

	
	public static List<Statistic> unmapProjStat(ResultSet rs) throws SQLException {
		List<Statistic> statLst = new ArrayList<Statistic>();
		while (rs.next()) {
			Statistic stat = new Statistic();
			stat.setId(rs.getInt(1));
			stat.setName(rs.getString(2));
			Objekt objekt = new Objekt();
			Attribute attr = new Attribute();
			objekt.setName(rs.getString(3));
			attr.setId(rs.getInt(4));
			attr.setName(rs.getString(5));
			
			if (statLst.contains(stat)) {
				Statistic stItem = statLst.get(statLst.lastIndexOf(stat));
				if (stItem.getObjects().contains(objekt)) {
					stItem.getObjects().get(stItem.getObjects().lastIndexOf(objekt)).getAttrs().add(attr);
					statLst.set(statLst.lastIndexOf(stat), stItem);
				}
				else {
					objekt.getAttrs().add(attr);
					stItem.getObjects().add(objekt);
					statLst.set(statLst.lastIndexOf(stat), stItem);
				}
			}
			else {
				objekt.getAttrs().add(attr);
				stat.getObjects().add(objekt);
				statLst.add(stat);
			}
		}
		return statLst;
	}

	public static List<Report> unmapReportProj(ResultSet rs) throws SQLException {
		List<Report> statLst = new ArrayList<Report>();
		while (rs.next()) {
			Report stat = new Report();
			stat.setId(rs.getInt(1));
			stat.setName(rs.getString(2));
			Objekt objekt = new Objekt();
			Attribute attr = new Attribute();
			objekt.setId(rs.getInt(3));
			objekt.setName(rs.getString(4));
			attr.setId(rs.getInt(5));
			attr.setName(rs.getString(6));
			
			if (statLst.contains(stat)) {
				Report stItem = statLst.get(statLst.lastIndexOf(stat));
				if (stItem.getObjects().contains(objekt)) {
					stItem.getObjects().get(stItem.getObjects().lastIndexOf(objekt)).getAttrs().add(attr);
					statLst.set(statLst.lastIndexOf(stat), stItem);
				}
				else {
					objekt.getAttrs().add(attr);
					stItem.getObjects().add(objekt);
					statLst.set(statLst.lastIndexOf(stat), stItem);
				}
			}
			else {
				objekt.getAttrs().add(attr);
				stat.getObjects().add(objekt);
				statLst.add(stat);
			}
		}
		return statLst;
	}


	public static List<SrchFltSrt> unmapSrchFltSrt(ResultSet rs) throws SQLException {
		List<SrchFltSrt> statLst = new ArrayList<SrchFltSrt>();
		while (rs.next()) {
			SrchFltSrt o = new SrchFltSrt();
			Objekt objekt = new Objekt();
			Attribute attr = new Attribute();
			o.setId(rs.getInt(1));
			objekt.setId(rs.getInt(2));
			objekt.setName(rs.getString(3));
			attr.setId(rs.getInt(4));
			attr.setName(rs.getString(5));
			
			if (statLst.contains(o)) {
				if (statLst.get(statLst.lastIndexOf(o)).getObject().contains(objekt)){
					int index = statLst.get(statLst.lastIndexOf(o)).getObject().lastIndexOf(objekt);
					statLst.get(statLst.lastIndexOf(o)).getObject().get(index).getAttrs().add(attr);
				}
				else {
					objekt.getAttrs().add(attr);
					statLst.get(statLst.lastIndexOf(o)).getObject().add(objekt);
				}
			}
			else {
				objekt.getAttrs().add(attr);
				o.getObject().add(objekt);
				statLst.add(o);
			}
		}
		return statLst;
	}
	


	

}
