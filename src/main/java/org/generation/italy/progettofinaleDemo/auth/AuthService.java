package org.generation.italy.progettofinaleDemo.auth;

import java.util.Optional;

import org.generation.italy.progettofinaleDemo.security.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService implements UserDetailsService {

	private UtenteRepository dao;

	private PasswordEncoder passwordEncoder;

	@Autowired
	public AuthService(UtenteRepository dao, PasswordEncoder passwordEncoder) {
		this.dao = dao;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<? extends UserDetails> user = dao.findByUsername(username);

		if (user.isPresent())
			return user.get();

		throw new UsernameNotFoundException("Nessun utente col username: " + username);
	}

	public void signup(String email, String username, String password, String ruolo) {
		Utente newUtente = new Utente();
		newUtente.setEmail(email);
		newUtente.setUsername(username);
		newUtente.setPassword(passwordEncoder.encode(password));
		if(ruolo.equalsIgnoreCase("user")) {
			newUtente.setRuolo(Roles.USER);
		} else if (ruolo.equalsIgnoreCase("ristorante")) {
			newUtente.setRuolo(Roles.RISTORANTE);
		} else if (ruolo.equalsIgnoreCase("admin")) {
			newUtente.setRuolo(Roles.ADMIN);
		}
		
		try {			
			dao.save(newUtente);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
