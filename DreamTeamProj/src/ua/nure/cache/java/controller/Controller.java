package ua.nure.cache.java.controller;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import ua.nure.cache.java.constants.DiagrTypes;
import ua.nure.cache.java.service.Server;

public class Controller {
	private static Logger log = Logger.getLogger(Controller.class);

	private static Map<String, Method> methods = new HashMap<String, Method>();

	private static Map<String, String> shtoto = new HashMap<String, String>();
	static {
		try {
			Class<?> cardManager = Server.class;
			Class<?> request = HttpServletRequest.class;
			Class<?> response = HttpServletResponse.class;
			shtoto.put("/diagrams/usecase", DiagrTypes.USE_CASE);
			shtoto.put("/diagrams/object_relations",
					DiagrTypes.OBJECT_RELATIONAL);
			shtoto.put("/diagrams/er", DiagrTypes.ER);
			shtoto.put("/diagrams/er/new", DiagrTypes.ER);
			shtoto.put("/diagrams/object_relations/new",
					DiagrTypes.OBJECT_RELATIONAL);
			shtoto.put("/diagrams/usecase/new", DiagrTypes.USE_CASE);
			shtoto.put("/informational_requirements/sorts/new", "sort");
			shtoto.put("/informational_requirements/searches/new", "search");
			shtoto.put("/informational_requirements/filters/new", "filter");

			methods.put("/objects/all", cardManager.getDeclaredMethod(
					"getAllObjects", request, response));
			methods.put("/statistics/all", cardManager.getDeclaredMethod(
					"getAllStatistics", request, response));
			methods.put("/reports/all", cardManager.getDeclaredMethod(
					"getAllReports", request, response));
			methods.put("/diagrams/usecase", cardManager.getDeclaredMethod(
					"getDiagramByType", String.class, request, response));
			methods.put("/diagrams/object_relations", cardManager
					.getDeclaredMethod("getDiagramByType", String.class,
							request, response));
			methods.put("/diagrams/er", cardManager.getDeclaredMethod(
					"getDiagramByType", String.class, request, response));
			methods.put("/informational_requirements/searches/all", cardManager
					.getDeclaredMethod("getInformReqSorts", request, response));
			methods.put("/informational_requirements/sorts/all", cardManager
					.getDeclaredMethod("getInformReqSearches", request,
							response));
			methods.put("/informational_requirements/filters/all",
					cardManager.getDeclaredMethod("getInformReqFilters",
							request, response));
			methods.put("/algorithmic_dependencies/all", cardManager
					.getDeclaredMethod("getAlgorithmicDep", request, response));
			methods.put("/objects/byId", cardManager.getDeclaredMethod(
					"getObjById", request, response));
			methods.put("/objects/new", cardManager.getDeclaredMethod(
					"insertObject", request, response));
			methods.put("/attribute/new", cardManager.getDeclaredMethod(
					"insertAttribute", request, response));
			methods.put("/statistics/new", cardManager.getDeclaredMethod(
					"insertStatistics", request, response));
			methods.put("/reports/new", cardManager.getDeclaredMethod(
					"insertReports", request, response));
			methods.put("/diagrams/usecase/new", cardManager.getDeclaredMethod(
					"insertDiagram", String.class, request, response));
			methods.put("/diagrams/object_relations/new", cardManager
					.getDeclaredMethod("insertDiagram", String.class, request,
							response));
			methods.put("/diagrams/er/new", cardManager.getDeclaredMethod(
					"insertDiagram", String.class, request, response));
			methods.put("/informational_requirements/searches/new", cardManager
					.getDeclaredMethod("insertSrchFltSrt", String.class,
							request, response));
			methods.put("/informational_requirements/filters/new", cardManager
					.getDeclaredMethod("insertSrchFltSrt", String.class,
							request, response));
			methods.put("/informational_requirements/sorts/new", cardManager
					.getDeclaredMethod("insertSrchFltSrt", String.class,
							request, response));
			methods.put("/algorithmic_dependencies/new", cardManager
					.getDeclaredMethod("insertAlgDeps",
							request, response)); 
			methods.put("/objects/delete", cardManager.getDeclaredMethod(
					"deleteObject", request, response));
			methods.put("/attribute/delete", cardManager.getDeclaredMethod(
					"deleteAttribute", request, response));
			methods.put("/statistics/delete", cardManager.getDeclaredMethod(
					"deleteStatistic", request, response));
			methods.put("/reports/delete", cardManager.getDeclaredMethod(
					"deleteReport", request, response));
			methods.put("/diagrams/usecase/delete", cardManager.getDeclaredMethod(
					"deleteDiagram", request, response));
			methods.put("/diagrams/object_relations/delete", cardManager.getDeclaredMethod(
					"deleteDiagram", request, response));
			methods.put("/diagrams/er/delete", cardManager.getDeclaredMethod(
					"deleteDiagram", request, response));
			methods.put("/informational_requirements/sorts/delete", cardManager
					.getDeclaredMethod("deleteSort", 
							request, response));
			methods.put("/informational_requirements/searches/delete", cardManager
					.getDeclaredMethod("deleteSearch", 
							request, response));
			methods.put("/informational_requirements/filters/delete", cardManager
					.getDeclaredMethod("deleteFilter", 
							request, response));
			methods.put("/algorithmic_dependencies/delete", cardManager
					.getDeclaredMethod("deleteAlgDep", 
							request, response));

			methods.put("/objects/update", cardManager.getDeclaredMethod(
					"updateObject", request, response));
			methods.put("/attribute/update", cardManager.getDeclaredMethod(
					"updateAttribute", request, response));
			methods.put("/statistics/update", cardManager.getDeclaredMethod(
					"updateStatistic", request, response));
			methods.put("/reports/update", cardManager.getDeclaredMethod(
					"updateReport", request, response));
			methods.put("/diagrams/usecase/update", cardManager.getDeclaredMethod(
					"updateDiagram", request, response));
			methods.put("/diagrams/object_relations/update", cardManager.getDeclaredMethod(
					"updateDiagram", request, response));
			methods.put("/diagrams/er/update", cardManager.getDeclaredMethod(
					"updateDiagram", request, response));
			methods.put("/informational_requirements/sorts/update", cardManager
					.getDeclaredMethod("updateSort", 
							request, response));
			methods.put("/informational_requirements/searches/update", cardManager
					.getDeclaredMethod("updateSearch", 
							request, response));
			methods.put("/informational_requirements/filters/update", cardManager
					.getDeclaredMethod("updateFilter", 
							request, response));
			methods.put("/algorithmic_dependencies/update", cardManager
					.getDeclaredMethod("updateAlgDep", 
							request, response));
			methods.put("/integrity_constraints/attributes/new", cardManager.getDeclaredMethod(
					"insertAttrConstr", request, response));
			methods.put("/integrity_constraints/attributes/update", cardManager.getDeclaredMethod(
					"updateAttrConstr", request, response));
			methods.put("/integrity_constraints/attributes/delete", cardManager.getDeclaredMethod(
					"deleteAttrConstr", request, response));
			methods.put("/integrity_constraints/attributes/all", cardManager.getDeclaredMethod(
					"findAttrConstr", request, response));
			
			methods.put("/integrity_constraints/links/new", cardManager.getDeclaredMethod(
					"insertLinkConstr", request, response));
			methods.put("/integrity_constraints/links/update", cardManager.getDeclaredMethod(
					"updateLinkConstr", request, response));
			methods.put("/integrity_constraints/links/delete", cardManager.getDeclaredMethod(
					"deleteLinkConstr", request, response));
			methods.put("/integrity_constraints/links/all", cardManager.getDeclaredMethod(
					"findLinkConstr", request, response));
			
			

		} catch (Exception e) {
			System.out.println(e.getMessage());
			log.error(e);
		}
	}

	private static Method get(String commandName) {
		if (commandName == null || !methods.containsKey(commandName)) {
			return null;
		}
		return methods.get(commandName);
	}

	private static void routeDiagrTypes(Method m, String url,
			HttpServletRequest request, HttpServletResponse response) {
		try {
			m.invoke(m.getDeclaringClass().newInstance(), shtoto.get(url),
					request, response);
		} catch (IllegalAccessException | IllegalArgumentException
				| InvocationTargetException | InstantiationException e) {
			log.error(e.getMessage());
		}
	}

	public static void routeIt(String url, HttpServletRequest request,
			HttpServletResponse response) {
		Method m = get(url);
		System.out.println(url);
		if (m == null) {
			return;
		}
		if (m.getName().equals("getDiagramByType")
				|| m.getName().equals("insertDiagram")
				|| m.getName().equals("insertSrchFltSrt")) {
			routeDiagrTypes(m, url, request, response);
			return;
		}
		try {
			m.invoke(m.getDeclaringClass().newInstance(), request, response);
		} catch (IllegalAccessException | IllegalArgumentException
				| InvocationTargetException | InstantiationException e) {
			log.error(e.getMessage());
		}
	}

}
