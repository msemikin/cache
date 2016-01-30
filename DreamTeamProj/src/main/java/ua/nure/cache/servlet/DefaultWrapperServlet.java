package ua.nure.cache.servlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class DefaultWrapperServlet extends HttpServlet
{
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException
    {
        RequestDispatcher rd = getServletContext().getNamedDispatcher("default");

        HttpServletRequest wrapped = new HttpServletRequestWrapper(req) {
            public String getServletPath() { return ""; }
        };

        rd.forward(wrapped, resp);
    }
}
