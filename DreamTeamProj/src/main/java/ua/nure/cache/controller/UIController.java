package ua.nure.cache.controller;

import fr.opensagres.xdocreport.converter.*;
import fr.opensagres.xdocreport.core.XDocReportException;
import fr.opensagres.xdocreport.core.document.DocumentKind;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.converter.pdf.PdfConverter;
import org.apache.poi.xwpf.converter.pdf.PdfOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URL;

@Controller
public class UIController {
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public void upload(@RequestParam("file") MultipartFile file) throws IOException {

        byte[] bytes;
        if (!file.isEmpty()) {
            bytes = file.getBytes();
        }

        System.out.println(String.format("receive %s from %s", file.getOriginalFilename()));
    }

    public static void main(String[] args) throws IOException,XDocReportException {
            convertDocxToPdf("DreamTeamProj/report.docx");
    }

    static void convertDocxToPdf(String fileName) throws XDocReportException {
        try {
            InputStream in = new FileInputStream(new File(fileName));
            IXDocReport report = XDocReportRegistry.getRegistry().loadReport(
                    in, TemplateEngineKind.Velocity);
            IContext context = report.createContext();
            OutputStream out = new FileOutputStream(new File(
                    "report.pdf"));
            Options options = Options.getTo(ConverterTypeTo.PDF).via(
                    ConverterTypeVia.XWPF);
            report.convert(context, options, out);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (XDocReportException e) {
            e.printStackTrace();
        }
    }

}
