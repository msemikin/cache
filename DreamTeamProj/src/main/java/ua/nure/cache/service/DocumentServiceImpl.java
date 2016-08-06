package ua.nure.cache.service;

import org.apache.log4j.Logger;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.nure.cache.entity.Project;
import ua.nure.cache.repository.ProjectRepository;
import ua.nure.cache.utils.WordGenerator;

import java.io.IOException;

@Service
public class DocumentServiceImpl implements DocumentService {

    private static Logger logger = Logger.getLogger(DocumentServiceImpl.class);
    private final ProjectRepository projectRepository;

    @Autowired
    public DocumentServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public void generateDocument(int projectId) {
        Project project = projectRepository.findOne(projectId);
        if (project==null) {
            System.out.println("The project is null");
            logger.info("The project is null");
            return;
        }
        WordGenerator generator = new WordGenerator(project);
        try {
            generator.generateDoc();
        } catch (IOException | InvalidFormatException e) {
            e.printStackTrace();
        }
    }
}
