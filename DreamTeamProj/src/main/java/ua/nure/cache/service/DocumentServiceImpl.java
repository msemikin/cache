package ua.nure.cache.service;

import org.apache.log4j.Logger;
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
    private static Logger logger = Logger.getLogger(DocumentServiceImpl.class);
    public void generateDocument(int projectId) {
        Project project = factory.getDAO(Project.class).read(projectId);
        if (project==null) {
            System.out.println("The project is null");
            logger.info("The project is null");
            return;
        }
        WordGenerator generator = new WordGenerator(factory,project);
        try {
            generator.generateDoc();
        } catch (IOException | InvalidFormatException e) {
            e.printStackTrace();
        }
    }
}
