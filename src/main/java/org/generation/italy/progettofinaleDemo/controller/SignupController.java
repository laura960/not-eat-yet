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
		return "<!DOCTYPE html>\n" + 
				"<html lang=\"en\">\n" + 
				"<head>\n" + 
				"<meta charset=\"UTF-8\">\n" + 
				"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" + 
				"<title>NotEatYet</title>\n" + 
				"<script src=\"/js/jquery-3.5.1.min.js\"></script>\n" + 
				"<script src=\"/js/main2.js\"></script>\n" + 
				"<link rel=\"stylesheet\" href=\"/css/style.css\">\n" + 
				"\n" + 
				"<!-- jQuery Modal -->\n" + 
				"<script\n" + 
				"	src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js\"></script>\n" + 
				"\n" + 
				"</head>\n" + 
				"<body>\n" + 
				"	<header class=\"top-header\">\n" + 
				"		<nav class=\"top-nav\">\n" + 
				"\n" + 
				"			<!--SEARCH-->\n" + 
				"			<li class=\"search\"><input class=\"search\" type=\"text\"\n" + 
				"				placeholder=\"Search...\" /></li>\n" + 
				"\n" + 
				"			<!--LOGO-->\n" + 
				"			<li class=\"logo\"><a href=\"/index.html\"><img class=\"img-logo\"\n" + 
				"					src=\"https://i.ibb.co/RDLFZ4c/prova06.png\" alt=\"\"></a></li>\n" + 
				"\n" + 
				"			<!--REGISTRA LOGIN-->\n" + 
				"			<div class=\"top-reg-log\">\n" + 
				"				<li><input id=\"modal-registrati\" class=\"registrati button\"\n" + 
				"					type=\"button\" value=\"Registrati\"></li>\n" + 
				"				<li><input id=\"modal-login\" class=\"login button\" type=\"button\"\n" + 
				"					value=\"Login\"></li>\n" + 
				"				<li>\n" + 
				"				<form method=\"get\" action=\"/logout\">\n" + 
				"				<button class=\"login button\" type=\"submit\">Logout\n" + 
				"				</form>	\n" + 
				"				</li>\n" + 
				"			</div>\n" + 
				"		</nav>\n" + 
				"	</header>"
				+ "<h3>Accesso eseguito</h3>"
				+ "<h4>Benvenuto in Not Eat Yet</h4>"
				+ "<a href='/index.html'>Torna alla Home</a>"
				+ "<!--FIXME-->\n" + 
				"	<footer>\n" + 
				"		<div class=\"clas footer-content\">\n" + 
				"			<div class=\"footer-section about\"></div>\n" + 
				"			<div class=\"footer-section links\"></div>\n" + 
				"			<div class=\"footer-section contact\"></div>\n" + 
				"\n" + 
				"		</div>\n" + 
				"		<div class=\"footer-bottom\">© 2020 All Rights Reserved\n" + 
				"			NotEatYet.com</div>\n" + 
				"	</footer>\n" + 
				"	<!--fine fixme-->\n" + 
				"</body>\n" + 
				"</html>";
	}
}
