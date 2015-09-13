package ua.nure.cache.java.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.util.Units;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;

import ua.nure.cache.java.dao.mysql.MysqlIntegrConstrDAO;
import ua.nure.cache.java.dao.mysql.MysqlProjectDAO;
import ua.nure.cache.java.entity.AlgDeps;
import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.Constraint;
import ua.nure.cache.java.entity.LinkConstr;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Report;
import ua.nure.cache.java.entity.SourceField;
import ua.nure.cache.java.entity.SrchFltSrt;
import ua.nure.cache.java.entity.Statistic;

public class WordGenerator {

	private static int projectId = 0;
	
	private static XWPFDocument document;

	public static void generateDoc() throws IOException, InvalidFormatException {
		document = new XWPFDocument();
		FileOutputStream out = new FileOutputStream(new File(
				"createparagraph.docx"));
		generateTitle(
				"1 АНАЛИЗ И КОНЦЕПТАЛЬНОЕ МОДЕЛИРОВАНИЕ ПРЕДМЕТНОЙ ОБЛАСТИ");
		insertSmallTitle( "1.1 Анализ предметной области");
		insertContent( "Здесь можно вставить текст того документа, "
				+ "на основании которого проводился анализ.");
		insertSmallTitle(
				"1.2 Концептуальное моделирование предметной области");
		insertContent(
				"Основным компонентами концептуальной модели являются:");
		createHyphenatedList(Arrays.asList(
				"описание функциональной структуры системы;",
				"описание объектов предметной области и связей между ними;",
				"описание информационных потребностей пользователей;",
				"описание существующего документооборота;",
				"описание алгоритмических зависимостей;",
				"описание ограничений целостности;",
				"описание лингвистических отношений."));
		createJustifyiedList(
				
				Arrays.asList(
						"Проведем концептуальное моделирование нашей предметной области.",
						"Пользователями системы являются:", ""));
		// Actors List from the diagram
		createJustifyiedList(
				
				Arrays.asList(
						"Пользователи могут выполнять в системе следующие функции:",
						""));
		createHyphenatedList( Arrays.asList(
				"секретари -  фиксируют результаты обучения студентов;"
						.toUpperCase(), "актер – его функция.".toUpperCase()));
		// Functions of the actor;
		createJustifyiedList(
				
				Arrays.asList(
						"На рисунке 1.1 приведена Use-case  диаграмма системы, "
								+ "которая отражает функции пользователей в системе, "
								+ "что можно рассматривать как ее функциональную структуру.",
						""));
		insertImage(""); //test image
		generateTitle("Рисунок 1.1 - Use-case  диаграмма системы");
		createJustifyiedList( Arrays.asList("","<здесь могут быть более развернутые пояснения по диаграмме>",
				"","Проведем описание объектов предметной области и связей между ними. Основными объектами предметной области являются:"));
		//Objects
		createHyphenatedList(getObjektNames(document));
		//Objects avec attributes 
		insertObjWithAttr(document);
		
		createJustifyiedList( Arrays.asList("","На рисунке 1.2 приведена схема взаимодействия объектов системы.",
				""));
		insertImage("");//test image
		generateTitle("Рисунок 1.2 -  Схема взаимосвязи объектов предметной области");
		createJustifyiedList( Arrays.asList("","Между объектами существуют следующие связи: ",
				""));
		
		insertIntegrConstr();
		//SrchFiltSorts etc
		createJustifyiedList( Arrays.asList("","Информационными потребностями пользователей "
				+ "являются потребности в сортировке, "
				+ "поиске, фильтрации информации и получении статистики, а именно:",
				"а) сортировка информации о следующих объектах по их атрибутам: "));
		insertSorts();
		createJustifyiedList( Arrays.asList("б) поиск информации о следующих объектах по их атрибутам:"));
		insertSearches();
		createJustifyiedList( Arrays.asList("в) фильтрация информации о следующих объектах по их атрибутам: "));
		insertFilters();
		//Statistic
		
		createJustifyiedList( Arrays.asList("У пользователей существует потребность "
				+ "получения разного рода статистики, а именно:"));
		insertStat();
		//Отчет
		createJustifyiedList( Arrays.asList("","В предметной области для работы необходимы ряд документов, например: "));
		insertReport();
		
		//AlgDeps
		createJustifyiedList( Arrays.asList("","При представлении информации пользователю некоторые порции "
				+ "информации требуют математической (или алгоритмической) обработки. "
				+ "Таким образом, в предметной области существуют следующие алгоритмические зависимости:"));
		insertAlgDeps();
		
		createJustifyiedList( Arrays.asList("","При рассмотрении атрибутов объектов "
				+ "из предметной области можно выделить следующие ограничения, "
				+ "которые накладываются предметной областью (ограничения целостности). ",
				"Следующие ограничения описывают требования уникальности, а именно:"));
		insertAttrConstr();
		
		createJustifyiedList( Arrays.asList("","Следующие ограничения описывают требования,"
				+ " которые касаются связей между объектами предметной области, а именно:"));
		
		//сюда вставить ссылки
		
		createJustifyiedList( Arrays.asList("","В данной предметной области существует "
				+ "ряд наименований объектов, которые специфичны для данной предметной области и могут "
				+ "быть отнесены к терминологии, которая должна быть учтена при составлении интерфейса приложения,"
				+ " а именно: ", "Здесь вставляются описания терминов типа", "- объект объект – это определение; ","",
				"Кроме того, данная предметная область требует существенного облегчения некоторых процессов работы с информацией, "
				+ "что можно решить путем автоматизации такого рода деятельности.","<здесь Вы должны вставить описание задачи автоматизации>"));
		
		document.write(out);
		out.close();
		System.out.println("createparagraph.docx written successfully");
	}

	public static void main(String[] args) {
		try {
			generateDoc();
		} catch (IOException | InvalidFormatException e) {
			e.printStackTrace();
		}
	}

	public static void generateTitle(String text) {
		XWPFParagraph paragraph = document.createParagraph();
		paragraph.setAlignment(ParagraphAlignment.CENTER);
		paragraph.setSpacingAfter(0);
		paragraph.setSpacingBefore(0);
		XWPFRun run = paragraph.createRun();
		run.setFontFamily("Times New Roman");
		run.setFontSize(14);
		run.setText(text);
	}

	public static void insertSmallTitle(String text) {
		XWPFParagraph paragraph = document.createParagraph();
		paragraph.setAlignment(ParagraphAlignment.BOTH);
		paragraph.setSpacingAfter(0);
		paragraph.setSpacingBefore(0);
		paragraph.setIndentationFirstLine(710);
		XWPFRun run = paragraph.createRun();
		run.setFontFamily("Times New Roman");
		run.setFontSize(14);
		run.setText(text);
	}

	public static void insertContent(String text) {
		XWPFParagraph paragraph = document.createParagraph();
		paragraph.setAlignment(ParagraphAlignment.BOTH);
		paragraph.setSpacingAfter(0);
		paragraph.setSpacingBefore(0);
		paragraph.setIndentationFirstLine(710);
		XWPFRun run = paragraph.createRun();
		run.setFontFamily("Times New Roman");
		run.setFontSize(14);
		run.setText(text);
	}

	public static void createNumericList(
			List<String> items) {
		for (int i = 1; i <= items.size(); i++) {
			XWPFParagraph paragraph = document.createParagraph();
			paragraph.setAlignment(ParagraphAlignment.BOTH);
			paragraph.setSpacingAfter(0);
			paragraph.setSpacingBefore(0);
			paragraph.setIndentationFirstLine(0);
			XWPFRun run = paragraph.createRun();
			run.setFontFamily("Times New Roman");
			run.setFontSize(14);
			run.setText(i + ") " + items.get(i - 1));
		}
	}
	public static void createNumericList(
			List<String> items , int intendation) {
		for (int i = 1; i <= items.size(); i++) {
			XWPFParagraph paragraph = document.createParagraph();
			paragraph.setAlignment(ParagraphAlignment.BOTH);
			paragraph.setSpacingAfter(0);
			paragraph.setSpacingBefore(0);
			paragraph.setIndentationFirstLine(intendation);
			XWPFRun run = paragraph.createRun();
			run.setFontFamily("Times New Roman");
			run.setFontSize(14);
			run.setText(i + ") " + items.get(i - 1));
		}
	}
	public static void createHyphenatedList(
			List<String> items) {
		for (int i = 1; i <= items.size(); i++) {
			XWPFParagraph paragraph = document.createParagraph();
			paragraph.setAlignment(ParagraphAlignment.BOTH);
			paragraph.setSpacingAfter(0);
			paragraph.setSpacingBefore(0);
			paragraph.setIndentationFirstLine(0);
			XWPFRun run = paragraph.createRun();
			run.setFontFamily("Times New Roman");
			run.setFontSize(14);
			run.setText("— " + items.get(i - 1));
		}
	}

	public static void createJustifyiedList(
			List<String> items) {
		for (int i = 1; i <= items.size(); i++) {
			XWPFParagraph paragraph = document.createParagraph();
			paragraph.setAlignment(ParagraphAlignment.BOTH);
			paragraph.setSpacingAfter(0);
			paragraph.setSpacingBefore(0);
			paragraph.setIndentationFirstLine(710);
			XWPFRun run = paragraph.createRun();
			run.setFontFamily("Times New Roman");
			run.setFontSize(14);
			run.setText(items.get(i - 1));
		}
	}

	public static void insertImage(String imgName)
			throws InvalidFormatException, IOException {
		XWPFParagraph title = document.createParagraph();
		XWPFRun run = title.createRun();
		title.setAlignment(ParagraphAlignment.LEFT);
		String imgFile = "testImage.jpg";
		FileInputStream is = new FileInputStream(imgFile);
		run.addBreak();
		run.addPicture(is, XWPFDocument.PICTURE_TYPE_JPEG, imgFile,
				Units.toEMU(424), Units.toEMU(236));
	}
	public static List<Objekt> getObj() {
		return new MysqlProjectDAO().findProcectObj(projectId);
	}
	public static List<String> getObjektNames(XWPFDocument document) {
		List<Objekt> objs = getObj();
		List<String> names = new ArrayList<String>();
		for (Objekt obj : objs) {
			names.add(obj.getName());
		}
		return names;
	}
	
	public static void insertObjWithAttr(XWPFDocument document) {
		List<Objekt> objs = getObj();
		List<String> names = new ArrayList<String>();
		for (Objekt obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("Объект \"");
			sb.append(obj.getName());
			sb.append("\" имеет следующие атрибуты: ");
			for (Attribute attr : obj.getAttrs()) {
				sb.append("\"" );
				sb.append(attr.getName());
				sb.append("\"; " );
			}
			names.add(sb.toString());
		}
		createJustifyiedList(names);
	}
	
	public static List<LinkConstr> getLinkConstrs () {
		return new MysqlIntegrConstrDAO().getLinkConstraint(projectId);
	}
	
	public static void insertIntegrConstr() {
		List<LinkConstr> objs = getLinkConstrs();
		List<String> names = new ArrayList<String>();
		for (LinkConstr obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("—Между \"");
			sb.append(obj.getFirstObject().getName());
			sb.append("\" и \"");
			sb.append(obj.getSecondObj().getName());
			sb.append("\" связь \"");
			sb.append(obj.getComment());
			sb.append("\" ");
			names.add(sb.toString());
		}
		createJustifyiedList(names);
	}
	
	public static List<SrchFltSrt> getSorts() {
		return new MysqlProjectDAO().findSorts(projectId);
	}
	
	public static List<SrchFltSrt> getSearches() {
		return new MysqlProjectDAO().findSearches(projectId);
	}
	
	public static List<SrchFltSrt> getFilters() {
		return new MysqlProjectDAO().findFilters(projectId);
	}
	
	public static void insertSorts() {
		List<SrchFltSrt> objs = getSorts();
		List<String> names = new ArrayList<String>();
		for (SrchFltSrt obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("Объект \"");
			sb.append(obj.getObject().getName());
			sb.append("\" по атрибутам: ");
			for (Attribute attr : obj.getObject().getAttrs()) {
				sb.append("\"" );
				sb.append(attr.getName());
				sb.append("\"; " );
			}
			names.add(sb.toString());
		}
		createNumericList(names, 1420);
	}
	
	public static void insertSearches() {
		List<SrchFltSrt> objs = getSearches();
		List<String> names = new ArrayList<String>();
		for (SrchFltSrt obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("Объект \"");
			sb.append(obj.getObject().getName());
			sb.append("\" по атрибутам: ");
			for (Attribute attr : obj.getObject().getAttrs()) {
				sb.append("\"" );
				sb.append(attr.getName());
				sb.append("\"; " );
			}
			names.add(sb.toString());
		}
		createNumericList(names, 1420);
	}
	
	public static void insertFilters() {
		List<SrchFltSrt> objs = getFilters();
		List<String> names = new ArrayList<String>();
		for (SrchFltSrt obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("Объект \"");
			sb.append(obj.getObject().getName());
			sb.append("\" по атрибутам: ");
			for (Attribute attr : obj.getObject().getAttrs()) {
				sb.append("\"" );
				sb.append(attr.getName());
				sb.append("\"; " );
			}
			names.add(sb.toString());
		}
		createNumericList(names, 1420);
	}
	public static List<Statistic> getStats() {
		return new MysqlProjectDAO().findProjStat(projectId);
	}
	
	public static void insertStat() {
		List<Statistic> objs = getStats();
		List<String> names = new ArrayList<String>();
		for (Statistic obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("Статистика \"");
			sb.append(obj.getName());
			sb.append("\", которая содержит следующую информацию: ");
			for (Objekt o : obj.getObjects()) {
				sb.append("атрибуты: ");
				for (Attribute a : o.getAttrs()) {
					sb.append("\"");
					sb.append(a.getName());
					sb.append("\";");
				}
				sb.append("из объекта \"");
				sb.append(o.getName());
				sb.append("\";");
			}
			names.add(sb.toString());
		}
		createHyphenatedList(names);
	}
	public static List<Report> getReports() {
		return new MysqlProjectDAO().findProjReport(projectId);
	}
	
	public static void insertReport() {
		List<Report> objs = getReports();
		List<String> names = new ArrayList<String>();
		for (Report obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("Документ \"");
			sb.append(obj.getName());
			sb.append("\", который содержит следующую информацию: ");
			for (Objekt o : obj.getObjects()) {
				sb.append("атрибуты: ");
				for (Attribute a : o.getAttrs()) {
					sb.append("\"");
					sb.append(a.getName());
					sb.append("\";");
				}
				sb.append("из объекта \"");
				sb.append(o.getName());
				sb.append("\";");
			}
			names.add(sb.toString());
		}
		createHyphenatedList(names);
	}
	
	public static List<AlgDeps> getAlgDeps() {
		return new MysqlProjectDAO().findAlgDeps(projectId);
	}
	
	public static void insertAlgDeps() {
		List<AlgDeps> objs = getAlgDeps();
		List<String> names = new ArrayList<String>();
		for (AlgDeps obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("Атрибут \"");
			sb.append(obj.getResultField().getAttr().getName());
			sb.append("\", который вычисляется на основании следующих атрибутов по формуле: ");
			sb.append(obj.getFormula());
			sb.append(" где ");
			for (SourceField sf : obj.getSourceFields()) {
				sb.append(sf.getVariable());
				sb.append(" - \"");
				sb.append(sf.getObject().getAttr().getName());
				sb.append("\" из \"");
				sb.append(sf.getObject().getName());
				sb.append("\"; ");
			}
			names.add(sb.toString());
		}
		createHyphenatedList(names);
	}
	public static void insertAttrConstr() {
		List<Constraint> objs = new MysqlIntegrConstrDAO().getConstraint(projectId);
		List<String> names = new ArrayList<String>();
		for (Constraint obj : objs) {
			StringBuilder sb = new StringBuilder();
			sb.append("Для объекта  \"");
			sb.append(obj.getObject().getName());
			sb.append("\", атрибут  \"");
			sb.append(obj.getObject().getAttr().getName());
			sb.append("\" является уникальным");
			names.add(sb.toString());
		}
		createHyphenatedList(names);
	}
}
