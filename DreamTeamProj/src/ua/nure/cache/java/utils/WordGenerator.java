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

import ua.nure.cache.java.dao.mysql.MysqlProjectDAO;
import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.Objekt;

public class WordGenerator {

	public static void generateDoc() throws IOException, InvalidFormatException {
		XWPFDocument document = new XWPFDocument();
		FileOutputStream out = new FileOutputStream(new File(
				"createparagraph.docx"));
		generateTitle(document,
				"1 АНАЛИЗ И КОНЦЕПТАЛЬНОЕ МОДЕЛИРОВАНИЕ ПРЕДМЕТНОЙ ОБЛАСТИ");
		insertSmallTitle(document, "1.1 Анализ предметной области");
		insertContent(document, "Здесь можно вставить текст того документа, "
				+ "на основании которого проводился анализ.");
		insertSmallTitle(document,
				"1.2 Концептуальное моделирование предметной области");
		insertContent(document,
				"Основным компонентами концептуальной модели являются:");
		createHyphenatedList(document, Arrays.asList(
				"описание функциональной структуры системы;",
				"описание объектов предметной области и связей между ними;",
				"описание информационных потребностей пользователей;",
				"описание существующего документооборота;",
				"описание алгоритмических зависимостей;",
				"описание ограничений целостности;",
				"описание лингвистических отношений."));
		createJustifyiedList(
				document,
				Arrays.asList(
						"Проведем концептуальное моделирование нашей предметной области.",
						"Пользователями системы являются:", ""));
		// Actors List from the diagram
		createJustifyiedList(
				document,
				Arrays.asList(
						"Пользователи могут выполнять в системе следующие функции:",
						""));
		createHyphenatedList(document, Arrays.asList(
				"секретари -  фиксируют результаты обучения студентов;"
						.toUpperCase(), "актер – его функция.".toUpperCase()));
		// Functions of the actor;
		createJustifyiedList(
				document,
				Arrays.asList(
						"На рисунке 1.1 приведена Use-case  диаграмма системы, "
								+ "которая отражает функции пользователей в системе, "
								+ "что можно рассматривать как ее функциональную структуру.",
						""));
		insertImage(document, ""); //test image
		generateTitle(document,"Рисунок 1.1 - Use-case  диаграмма системы");
		createJustifyiedList(document, Arrays.asList("","<здесь могут быть более развернутые пояснения по диаграмме>",
				"","Проведем описание объектов предметной области и связей между ними. Основными объектами предметной области являются:"));
		//Objects
		createHyphenatedList(document,getObjektNames(document,0));
		//Objects avec attributes 
		insertObjWithAttr(document,0);
		
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

	public static void generateTitle(XWPFDocument document, String text) {
		XWPFParagraph paragraph = document.createParagraph();
		paragraph.setAlignment(ParagraphAlignment.CENTER);
		paragraph.setSpacingAfter(0);
		paragraph.setSpacingBefore(0);
		XWPFRun run = paragraph.createRun();
		run.setFontFamily("Times New Roman");
		run.setFontSize(14);
		run.setText(text);
	}

	public static void insertSmallTitle(XWPFDocument document, String text) {
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

	public static void insertContent(XWPFDocument document, String text) {
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

	public static void createNumericList(XWPFDocument document,
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

	public static void createHyphenatedList(XWPFDocument document,
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

	public static void createJustifyiedList(XWPFDocument document,
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

	public static void insertImage(XWPFDocument document, String imgName)
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
	public static List<Objekt> getObj(int projectId) {
		return new MysqlProjectDAO().findProcectObj(projectId);
	}
	public static List<String> getObjektNames(XWPFDocument document, int projectId) {
		List<Objekt> objs = getObj(projectId);
		List<String> names = new ArrayList<String>();
		for (Objekt obj : objs) {
			names.add(obj.getName());
		}
		return names;
	}
	
	public static void insertObjWithAttr(XWPFDocument document, int projectId) {
		List<Objekt> objs = getObj(projectId);
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
		createJustifyiedList(document,names);
	}

}
