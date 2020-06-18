package org.generation.italy.progettofinaleDemo;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.StringReader;

import javax.sql.DataSource;

import org.apache.ibatis.jdbc.ScriptRunner;
import org.generation.italy.progettofinaleDemo.auth.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ProgettofinaleDemoApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ProgettofinaleDemoApplication.class, args);
	}

	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@Autowired
	private DataSource datasource;
	
	@Autowired
	private UtenteRepository utenteRepository;
	
	@Override
	public void run(String... args) throws Exception {
	    String script = "C:\\Users\\106846\\Desktop\\Java Spring\\not-eat-yet\\src\\main\\resources\\data.sql";
	    
	    if(!utenteRepository.findByUsername("admin").isPresent()) {
	    	// using spring boot injected DataSource to get the connection
	    	String ris = "";
	    	String line = null;
	    	ScriptRunner scriptRunner = new ScriptRunner(datasource.getConnection());
	    	FileReader query = new FileReader(script);
	    	BufferedReader br = new BufferedReader(query);
	    	while((line = br.readLine()) != null) {
	    		ris += line;
	    	}
	    	
	    	br.close();
	    	
	    	String password = passwordEncoder.encode("admin");
	    	
	    	ris = ris.replace("psw", password);
	    	scriptRunner.runScript(new StringReader(ris));
	    }
	    
	}
	
}
