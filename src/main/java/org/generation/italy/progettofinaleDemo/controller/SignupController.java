package org.generation.italy.progettofinaleDemo.controller;

import org.generation.italy.progettofinaleDemo.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/signup")
public class SignupController {
	@Autowired
	private AuthService authService;

	@PostMapping
	public String signup(@RequestParam String email, @RequestParam String username, @RequestParam String password, @RequestParam String ruolo) {
		authService.signup(email, username, password, ruolo);
		return "<!DOCTYPE html>" + 
				"<html lang=\"en\">" + 
				"<head>" + 
				"<meta charset=\"UTF-8\">" + 
				"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" + 
				"<title>NotEatYet</title>" + 
				"<script src=\"/js/jquery-3.5.1.min.js\"></script>" + 
				"<script src=\"/js/main2.js\"></script>" + 
				"<link rel=\"stylesheet\" href=\"/css/style.css\">" + 
				"</head>" + 
				"<body>" + 
				"	<header class=\"top-header\">" + 
				"		<nav class=\"top-nav\">" + 
				"			<li><input id=\"modal-registrati\" class=\"registrati button\"" + 
				"					type=\"button\" value=\"Registrati\"></li>" + 
				"			<!--LOGO-->" + 
				"			<li class=\"logo\"><a href=\"/index.html\"><img class=\"img-logo\"" + 
				"					src=\"https://i.ibb.co/RDLFZ4c/prova06.png\" alt=\"\"></a></li>" + 
				"			<!--REGISTRA LOGIN-->" + 
				"			<div class=\"top-reg-log\">" + 
				"				<li><input id=\"modal-login\" class=\"login button\" type=\"button\"" + 
				"					value=\"Login\"></li>" + 
				"				<li>" + 
				"				<form method=\"get\" action=\"/logout\">" + 
				"				<button class=\"login button\" type=\"submit\">Logout" + 
				"				</form>" + 
				"				</li>" + 
				"			</div>" + 
				"		</nav>" + 
				"	</header>" +
				"<div class='marginLR'>" +
				"<h3>Registrazione eseguita con successo</h3><br>" +
				"<h4>Benvenuto in Not Eat Yet</h4><br>" +
				"<a href='/index.html'>Vai alla Home</a>" +
				"</div>" +
				"		<footer>" + 
				"			<div class=\"torna-home marginLR\">" + 
				"				<a href='/index.html'>&#9664; Torna alla Home</a>" + 
				"			</div>" + 
				"			<div class=\"clas footer-content\">" + 
				"				<div class=\"footer-section about\"></div>" + 
				"				<div class=\"footer-section links\"></div>" + 
				"				<div class=\"footer-section contact\"></div>" + 
				"			</div>" + 
				"			<div class=\"footer-bottom\">© 2020 All Rights Reserved" + 
				"				NotEatYet.com</div>" + 
				"		</footer>" + 
				"	</body>" + 
				"</html>";
	}
}
