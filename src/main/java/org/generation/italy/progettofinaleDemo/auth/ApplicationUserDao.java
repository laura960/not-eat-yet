package org.generation.italy.progettofinaleDemo.auth;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;

public class ApplicationUserDao implements UserDAO{

	@Override
	public Optional<? extends UserDetails> findByUsername(String username) {
		// TODO Auto-generated method stub
		return null;
	}

}
