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
				"	<header class=\"top-header\">\r\n" + 
				"		<nav class=\"top-nav\">\r\n" + 
				"\r\n" + 
				"			<li><input id=\"modal-registrati\" class=\"registrati button\"\r\n" + 
				"					type=\"button\" value=\"Registrati\"></li>\r\n" + 
				"\r\n" + 
				"			<!--LOGO-->\r\n" + 
				"			<li class=\"logo\"><a href=\"/index.html\"><img class=\"img-logo\"\r\n" + 
				"					src=\"https://i.ibb.co/RDLFZ4c/prova06.png\" alt=\"\"></a></li>\r\n" + 
				"\r\n" + 
				"			<!--REGISTRA LOGIN-->\r\n" + 
				"			<div class=\"top-reg-log\">\r\n" + 
				"				<li><input id=\"modal-login\" class=\"login button\" type=\"button\"\r\n" + 
				"					value=\"Login\"></li>\r\n" + 
				"				<li>\r\n" + 
				"				<form method=\"get\" action=\"/logout\">\r\n" + 
				"				<button class=\"login button\" type=\"submit\">Logout\r\n" + 
				"				</form>	\r\n" + 
				"				</li>\r\n" + 
				"			</div>\r\n" + 
				"		</nav>\r\n" + 
				"	</header>" +
				"<div class='marginLR'>"
				+ "<h3>Accesso eseguito</h3><br>"
				+ "<h4>Benvenuto in Not Eat Yet</h4><br>"
				+ "<a href='/index.html'>Vai alla Home</a>"
				+ "</div>"
				+ "<!--FIXME-->\r\n" + 
				"		<footer>\r\n" + 
				"			<div class=\"torna-home marginLR\">\r\n" + 
				"				<a href='/index.html'>&#9664; Torna alla Home</a>\r\n" + 
				"			</div>\r\n" + 
				"			<div class=\"clas footer-content\">\r\n" + 
				"				<div class=\"footer-section about\"></div>\r\n" + 
				"				<div class=\"footer-section links\"></div>\r\n" + 
				"				<div class=\"footer-section contact\"></div>\r\n" + 
				"		\r\n" + 
				"			</div>\r\n" + 
				"			<div class=\"footer-bottom\">© 2020 All Rights Reserved\r\n" + 
				"				NotEatYet.com</div>\r\n" + 
				"		</footer>\r\n" + 
				"			<!--fine fixme-->\r\n" + 
				"	</body>\r\n" + 
				"</html>";
	}
}
