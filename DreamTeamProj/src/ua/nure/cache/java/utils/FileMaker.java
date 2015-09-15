package ua.nure.cache.java.utils;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.tomcat.util.codec.binary.Base64;

public class FileMaker {
	public void createNewFile(String byteArr, String newFile) {
        try {            
            byte[] imageByteArray = decodeImage(byteArr);
            FileOutputStream imageOutFile = new FileOutputStream(
            		newFile);
            imageOutFile.write(imageByteArray);
            imageOutFile.close();
        } catch (FileNotFoundException e) {
            System.out.println("Image not found" + e);
        } catch (IOException ioe) {
            System.out.println("Exception while reading the Image " + ioe);
        }
	}
	
	public byte[] decodeImage(String imageDataString) {
        return Base64.decodeBase64(imageDataString);
    }
	
	public String encodeImage(byte[] imageByteArray) {
        return Base64.encodeBase64URLSafeString(imageByteArray);
    }
	
}
