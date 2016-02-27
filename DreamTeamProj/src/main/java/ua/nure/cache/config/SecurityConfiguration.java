package ua.nure.cache.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.*;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import ua.nure.cache.filters.CsrfHeaderFilter;
import ua.nure.cache.security.*;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Pattern;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new RestAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new SimpleUrlAuthenticationFailureHandler();
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new RestLogoutSuccessHandler();
    }

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())
                .and()
                    .authorizeRequests()
                    .antMatchers("/web/**", "/account/**/register", "/index.html", "/login").permitAll()
                    .antMatchers(HttpMethod.OPTIONS).permitAll()
                    .anyRequest().authenticated()
                .and().formLogin()
                    .successHandler(authenticationSuccessHandler())
                    .failureHandler(authenticationFailureHandler())
                    .loginPage("/login")
                    .usernameParameter("email").passwordParameter("password")
                .and()
                    .logout().logoutUrl("/logout").logoutSuccessHandler(logoutSuccessHandler())
                .and().csrf().disable();
//                .and()
//					.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
//					.csrf().csrfTokenRepository(csrfTokenRepository())
//					.requireCsrfProtectionMatcher(this::checkNeedCsrf);
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

    private boolean checkNeedCsrf(final HttpServletRequest request) {
        Pattern allowedMethods = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS)$");
        RegexRequestMatcher apiMatcher = new RegexRequestMatcher(
                        "(/account/.*/register)" +
                        "|(/login)|(/logout)", null);

        // No CSRF due to allowedMethod
        if(allowedMethods.matcher(request.getMethod()).matches())
            return false;

        // No CSRF due to api call
        if(apiMatcher.matches(request))
            return false;

        // CSRF for everything else that is not an API call or an allowedMethod
        return true;
    }

    @Bean
    	public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

}