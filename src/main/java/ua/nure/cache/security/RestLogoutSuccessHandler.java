package ua.nure.cache.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

public class RestLogoutSuccessHandler implements LogoutSuccessHandler {
	@Override
	public void onLogoutSuccess(final HttpServletRequest httpServletRequest, final HttpServletResponse httpServletResponse, final Authentication authentication) throws IOException, ServletException {
		httpServletResponse.setStatus(HttpServletResponse.SC_OK);
		httpServletResponse.getWriter().flush();
	}
}
