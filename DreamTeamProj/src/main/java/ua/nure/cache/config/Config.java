package ua.nure.cache.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.Resource;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.resource.PathResourceResolver;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.dao.hibernate.HibernateDAOFactory;
import ua.nure.cache.service.AccountService;
import ua.nure.cache.service.CustomUserDetailsService;

import java.io.IOException;
import java.util.List;

@Configuration
@ComponentScan(basePackages = { "ua.nure.cache" })
@Import({ HibernateConfig.class, SecurityConfiguration.class })
@EnableWebMvc
public class Config extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/web/static/**").addResourceLocations("/WEB-INF/static/");
        registry.addResourceHandler("/web/states/**").addResourceLocations("/WEB-INF/static/states/");
        registry.addResourceHandler("/web/templates/**").addResourceLocations("/WEB-INF/static/templates/");

        registry.addResourceHandler("/web/**").addResourceLocations("/WEB-INF/static/index.html")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath,
                                                   Resource location) throws IOException {
                        return location.exists() && location.isReadable() ? location
                                : null;
                    }
                });
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(converter());
        super.configureMessageConverters(converters);
    }

    @Bean
    MappingJackson2HttpMessageConverter converter() {
        return new MappingJackson2HttpMessageConverter();
    }
}
