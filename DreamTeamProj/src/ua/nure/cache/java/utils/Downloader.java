package ua.nure.cache.java.utils;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
/**
 * Allows to download pdf-file
 * @author Yohan
 *
 */
public class Downloader {

	private static ByteArrayOutputStream baos = new ByteArrayOutputStream();

	private static Logger log = Logger.getLogger(Downloader.class);

	public void anotherDownloadMethod(String fileName,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/docx");
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Cache-Control", "max-age=0");
		response.setHeader("Content-disposition", "attachment; " + "filename="
				+ fileName);
		try {
			baos = convertPDFToByteArrayOutputStream(fileName);
			OutputStream os = response.getOutputStream();
			baos.writeTo(os);
			os.flush();
		} catch (Exception e1) {
			log.error(e1);
		}
	}

	private static ByteArrayOutputStream convertPDFToByteArrayOutputStream(
			String fileName) {

		InputStream inputStream = null;

		try {
			inputStream = new FileInputStream(fileName);

			byte[] buffer = new byte[1024];
			baos = new ByteArrayOutputStream();

			int bytesRead;
			while ((bytesRead = inputStream.read(buffer)) != -1) {
				baos.write(buffer, 0, bytesRead);
			}

		} catch (FileNotFoundException e) {
			log.error(e);
		} catch (IOException e) {
			log.error(e);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					log.error(e);
				}
			}
		}
		return baos;
	}
}
