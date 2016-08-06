package ua.nure.cache.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.stereotype.Component;

@Component
public class HibernateAwareObjectMapper extends ObjectMapper {

    public HibernateAwareObjectMapper() {
        Hibernate5Module hbm = new Hibernate5Module();
        hbm.configure(Hibernate5Module.Feature.FORCE_LAZY_LOADING, true);
        registerModule(hbm);
        configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

}
