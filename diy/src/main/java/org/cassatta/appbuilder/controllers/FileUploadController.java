package org.cassatta.appbuilder.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.cassatta.appbuilder.config.AppConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
 
/**
 * Handles requests for the application file upload requests
 */
@Controller
public class FileUploadController {
	
	@Autowired
	private AppConfig config;
 
    private static final Logger logger = LoggerFactory
            .getLogger(FileUploadController.class);
 
    /**
     * Upload single file using Spring Controller
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public @ResponseBody
    String uploadFileHandler(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
            	String name = file.getOriginalFilename();
                byte[] bytes = file.getBytes();
 
                // Creating the directory to store file
                String vault = config.getProperty("filevault.root");
				File dir = initializeTargetDir(vault);
 
                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + name);

                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
 
                logger.info("Server File Location="
                        + serverFile.getAbsolutePath());
 
                String filePath = getFilePath(vault, serverFile);
				return "{\"success\":\"true\", \"name\":\""+name+"\", \"path\":\""+filePath+"\"}";
            } catch (Exception e) {
            	e.printStackTrace();
                return "{\"success\":\"false\", \"message:"+e.getMessage()+"!\"}";
            }
        } else {
            return "{\"success\":\"false\", \"message:empty file!\"}";
        }
    }

	private File initializeTargetDir(String vault) {
		Calendar cal = Calendar.getInstance();
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/HH/mm/ss");
	    String timestamp = sdf.format(cal.getTime());
	    timestamp = timestamp.replaceAll("\\/", "\\"+File.separator);
		File dir = new File(vault + File.separator + "uploaded.files"+File.separator+timestamp);
		if (!dir.exists())
		    dir.mkdirs();
		return dir;
	}

	private String getFilePath(String vault, File dir) {
		String filePath = dir.getAbsolutePath().replace(new File(vault).getAbsolutePath(), "");
		return filePath.replaceAll("\\\\", "/");
	}

    /**
     * Upload multiple file using Spring Controller
     */
    @RequestMapping(value = "/uploadx", method = RequestMethod.POST)
    public @ResponseBody
    String uploadMultipleFileHandler(@RequestParam("file") MultipartFile[] files) {
 
        String message = "[";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            String name = file.getOriginalFilename();
            try {
                byte[] bytes = file.getBytes();
 
                // Creating the directory to store file
                String vault = config.getProperty("filevault.root");
				File dir = initializeTargetDir(vault);
 
                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
 
                logger.info("Server File Location="
                        + serverFile.getAbsolutePath());
 
                String filePath = getFilePath(vault, serverFile);
				message += "{\"success\":\"true\", \"name\":\""+name+"\", \"path\":\""+filePath+"\"}";
                
				if(i<files.length-1){
					message += ",";
				}
            } catch (Exception e) {
            	e.printStackTrace();
                return "{\"success\":\"false\", \"message:"+e.getMessage()+"!\"}";
            }
        }
        message += "]";
        return message;
    }
    

}