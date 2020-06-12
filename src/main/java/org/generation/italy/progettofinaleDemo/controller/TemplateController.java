package org.generation.italy.progettofinaleDemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class TemplateController {

	@GetMapping("/login")
	public String getLoginView() {
		return "login";
	}
	
//	@GetMapping("/recensioni")
//	public String getRecensioni() {
//		return "recensioni";
//	}
	
	
}
