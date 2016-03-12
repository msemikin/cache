package ua.nure.cache.service;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.entity.Project;
import ua.nure.cache.utils.WordGenerator;

import java.io.IOException;

@Service
@Transactional
public class DocumentServiceImpl implements DocumentService {
    @Autowired
    private DAOFactory factory;

    public void generateDocument() {
        Project project = factory.getDAO(Project.class).read(3);
        WordGenerator generator = new WordGenerator(factory,project);
        try {
            generator.generateDoc("noname");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
    }
}
