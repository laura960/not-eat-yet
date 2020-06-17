package org.generation.italy.progettofinaleDemo;

import java.io.BufferedReader;
import java.io.FileReader;

import javax.sql.DataSource;

import org.apache.ibatis.jdbc.ScriptRunner;
import org.generation.italy.progettofinaleDemo.auth.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProgettofinaleDemoApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ProgettofinaleDemoApplication.class, args);
	}

	@Autowired
	private DataSource datasource;
	
	@Autowired
	private UtenteRepository utenteRepository;
	
	@Override
	public void run(String... args) throws Exception {
	    String script = "C:\\Users\\106846\\Desktop\\Java Spring\\not-eat-yet\\src\\main\\resources\\data.sql";
	    
	    if(!utenteRepository.findByUsername("admin").isPresent()) {
	    	// using spring boot injected DataSource to get the connection
	    	ScriptRunner scriptRunner = new ScriptRunner(datasource.getConnection());
	    	scriptRunner.runScript(new BufferedReader(new FileReader(script)));
	    	// utenteRepository.findByUsername("admin")
	    }
	    
	}
	
}
