package org.cassatta.appbuilder.controllers;

import org.cassatta.appbuilder.config.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class DefaultLandingPageController {

	@Autowired
	private AppConfig config;

	@RequestMapping()
	public String defaultMapping() {
		return "/index.html";
	}
}
