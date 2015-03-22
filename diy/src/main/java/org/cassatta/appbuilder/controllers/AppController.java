package org.cassatta.appbuilder.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.cassatta.appbuilder.apps.system.User;
import org.cassatta.appbuilder.apps.system.UserRepository;
import org.cassatta.appbuilder.config.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping(value="/app")
public class AppController {
    
	@Autowired
	private AppConfig config;
	
	@Autowired
	private HttpSession session;
	
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/login")
    @ResponseBody
    public User login(@RequestParam String login, @RequestParam String password) {
    	session.invalidate();
    	List<User> usersByLogin = userRepository.findByLogin(login);
    	if(usersByLogin.size()>0){
    		User user = usersByLogin.get(0);
			if(user.getPassword().equals(password)){
		    	session.setAttribute("user", user);
		    	System.out.println(user.getLogin()+" signed in with authorization "+session.getId());
		    	user.setAuthorization(session.getId());
    			return user;
    		}
    	}
		return null;
    }

    @RequestMapping("/logout")
    @ResponseBody
    public void logout() {
    	session.invalidate();
    }

    @RequestMapping(value="/users", method=RequestMethod.GET)
    @ResponseBody
    public Iterable<User> users() {
    	return userRepository.findByLogin("admin@test.com");
    }
    
    @RequestMapping(value="/users", method=RequestMethod.POST)
    @ResponseBody
    public Iterable<User> saveUser(@RequestBody User user) {
    	List<User> users = new ArrayList<User>();
    	users.add(user);
    	return userRepository.save(users);
    }

    
    @RequestMapping(value="/json", method=RequestMethod.POST)
    @ResponseBody
    public String postJSON(@RequestBody String json) {
    	ObjectMapper mapper = new ObjectMapper();
    	try {
			JsonNode node = mapper.readTree(json);
			return "Returning JsonNode As String : "+node.toString();
		} catch (JsonProcessingException e) {
			return e.toString();
		} catch (IOException e) {
			return e.toString();
		}
    }
    
}
