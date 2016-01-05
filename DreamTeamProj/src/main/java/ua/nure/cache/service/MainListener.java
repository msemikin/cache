//package ua.nure.cache.service;
//
//import javax.servlet.ServletContextEvent;
//import javax.servlet.ServletContextListener;
//import javax.servlet.annotation.WebListener;
//
//@WebListener
//public class MainListener implements ServletContextListener {
//
//    public MainListener() {
//    }
//
//    public void contextDestroyed(ServletContextEvent arg0)  {
//    }
//
//    public void contextInitialized(ServletContextEvent arg0)  {
//    	try {
//    		Class.forName("Controller");
//    	} catch (ClassNotFoundException ex) {
//    		throw new IllegalStateException(" Cannot initialize Command Container");
//    	}
//    }
//
//}
