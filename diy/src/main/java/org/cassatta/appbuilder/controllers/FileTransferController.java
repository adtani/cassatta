package org.cassatta.appbuilder.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.cassatta.appbuilder.config.AppConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
 
/**
 * Handles requests for the application file upload requests
 */
@Controller
public class FileTransferController {
	
	@Autowired
	private AppConfig config;
 
    private static final Logger logger = LoggerFactory
            .getLogger(FileTransferController.class);
    
    private static final int BUFFER_SIZE = 4096;
    
    @RequestMapping(value = "/uploaded.files/**", method = RequestMethod.GET)
    public void downloadFile(HttpServletRequest request,
            HttpServletResponse response) throws IOException {
 
        // get absolute path of the application
        ServletContext context = request.getServletContext();
		File fileVaultRoot = new File(config.getProperty("filevault.root"));
 
        // construct the complete absolute path of the file
		String decodedURL = URLDecoder.decode(request.getRequestURL().toString(), "UTF-8");
        String fullPath = decodedURL.substring(decodedURL.indexOf("uploaded.files"));      
        File downloadFile = new File(fileVaultRoot, fullPath);
        FileInputStream inputStream = new FileInputStream(downloadFile);
         
        // get MIME type of the file
        String mimeType = context.getMimeType(fullPath);
        if (mimeType == null) {
            // set to binary type if MIME mapping not found
            mimeType = "application/octet-stream";
        }
 
        // set content attributes for the response
        response.setContentType(mimeType);
        response.setContentLength((int) downloadFile.length());
 
        // set headers for the response
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"",
                downloadFile.getName());
        response.setHeader(headerKey, headerValue);
 
        // get output stream of the response
        OutputStream outStream = response.getOutputStream();
 
        byte[] buffer = new byte[BUFFER_SIZE];
        int bytesRead = -1;
 
        // write bytes read from the input stream into the output stream
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, bytesRead);
        }
 
        inputStream.close();
        outStream.close();
    }
 
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