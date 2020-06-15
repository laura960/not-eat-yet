package org.generation.italy.progettofinaleDemo.security;

import org.generation.italy.progettofinaleDemo.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter { 
	
	private final PasswordEncoder passwordEncoder;
	private final AuthService authService;

	@Autowired
	public ApplicationSecurityConfig(PasswordEncoder passwordEncoder, AuthService authService) {
		this.passwordEncoder = passwordEncoder;
		this.authService = authService;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
				.authorizeRequests()
				.antMatchers("/", "/index.html", "/css/**", "/js/**", "/signup.html", "/signup", "/login", "/forbidden.html", "/fail.html", "/loggedout.html").permitAll() 
				.antMatchers(HttpMethod.POST, "/signup.html").permitAll()
				.antMatchers(HttpMethod.GET,"/piatti", "/piatti/*", "/ristoranti/*", "/ristoranti", "/recensioni", "/recensioni/*", "/risposte", "/risposte/*").permitAll()
				.antMatchers("/elencoristoranti.html", "/elencopizzeria.html", "/elencosushi.html","/elencokebab.html","/elencoetnico.html").permitAll()
				.antMatchers("/aggiungi_recensione.html").hasAnyRole(Roles.ADMIN, Roles.USER)
				.antMatchers(HttpMethod.POST,"/recensioni").hasAnyRole(Roles.ADMIN, Roles.USER)
				.antMatchers("/aggiungi_piatto.html", "/modifica_piatto.html").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE)
				.antMatchers(HttpMethod.POST, "/piatti").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE)
				.antMatchers("/elimina_piatto.html").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE)
				.antMatchers(HttpMethod.DELETE, "/piatti/*").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE)
				.antMatchers(HttpMethod.PUT, "/piatti/*").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE)
				.antMatchers(HttpMethod.POST, "/risposte").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE)
				.antMatchers(HttpMethod.PUT, "/risposte").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE)
				.antMatchers(HttpMethod.DELETE, "/risposte/*").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE)
				.antMatchers("/aggiungi_ristorante.html").hasAnyRole(Roles.ADMIN)
				.antMatchers(HttpMethod.POST, "/ristoranti").hasAnyRole(Roles.ADMIN)
				.antMatchers("/modifica_ristorante.html").hasAnyRole(Roles.ADMIN)
				.antMatchers(HttpMethod.PUT, "/ristoranti/*").hasAnyRole(Roles.ADMIN)
				.antMatchers("/elimina_ristorante.html").hasAnyRole(Roles.ADMIN)
				.antMatchers(HttpMethod.DELETE, "/ristoranti/*").hasAnyRole(Roles.ADMIN)
				
				
//				.antMatchers("/account.html").hasAnyRole(Roles.ADMIN, Roles.USER)
//				.antMatchers("/accountmanager/**").hasAnyRole(Roles.ADMIN) // solo gli admin accedono a /management/**
				
				.anyRequest().authenticated()
				.and()
				.exceptionHandling()
				.accessDeniedPage("/forbidden.html")
				.and()
				
				.formLogin()
				.loginPage("/login.html")
				.loginProcessingUrl("/login")
				.permitAll()
				.defaultSuccessUrl("/index.html", true)
				.failureUrl("/fail.html")
				.passwordParameter("password")
				.usernameParameter("username")
				.and()
				.rememberMe()
				.rememberMeParameter("remember-me")
				
				.and()
				.logout().logoutUrl("/logout")
				.clearAuthentication(true)
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
				.logoutSuccessUrl("/loggedout.html")
				;
				
	}

	@Bean 
	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder);
		provider.setUserDetailsService(authService);
		return provider;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(daoAuthenticationProvider());
	}

}
