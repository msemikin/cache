package ua.nure.cache.service;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.utils.PdfConverter;

import java.io.IOException;

@Service
@Transactional
public class DocumentServiceImpl implements DocumentService {
    private static Logger logger = Logger.getLogger(DocumentServiceImpl.class);
    public void generateDocument(int projectId) {
        new PdfConverter().convertToPdf();
//        Project project = factory.getDAO(Project.class).read(projectId);
//        if (project==null) {
//            System.out.println("The project is null");
//            logger.info("The project is null");
//            return;
//        }
//        System.out.println("Here 1");
//        WordGenerator generator = new WordGenerator(factory,project);
//        try {
//            generator.generateDoc("noname");
//        } catch (IOException | InvalidFormatException e) {
//            e.printStackTrace();
//        }
    }
}
