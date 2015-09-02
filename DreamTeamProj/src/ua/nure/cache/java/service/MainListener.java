package ua.nure.cache.java.service;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MainListener implements ServletContextListener {

    public MainListener() {
    }

    public void contextDestroyed(ServletContextEvent arg0)  { 
    }

    public void contextInitialized(ServletContextEvent arg0)  { 
    	try {
    		Class.forName("ua.nure.cache.java.controller.Controller");
    	} catch (ClassNotFoundException ex) {
    		throw new IllegalStateException(" Cannot initialize Command Container");
    	}
    }
	
}
