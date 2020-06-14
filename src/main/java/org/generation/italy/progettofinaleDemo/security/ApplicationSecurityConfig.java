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
// Configurazione base di SpringSecurity, andiamo a definirne uno nostro
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter { 
	
	// Oggetto che serve per criptografare le password
	private final PasswordEncoder passwordEncoder;
	// Il servizio che ci fornisce gli utenti
	private final AuthService authService;

	@Autowired
	public ApplicationSecurityConfig(PasswordEncoder passwordEncoder, AuthService authService) {
		this.passwordEncoder = passwordEncoder;
		this.authService = authService;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable() // Andate a vedere cos'è il csrf, in poche parole, la disabilito se mi serve
		// utilizzare l'app anche come sistema rest per applicazioni "esterne"
				.authorizeRequests()
				.antMatchers("/", "index.html", "/css/**", "/js/**", "/signup.html", "/signup", "/login", "/forbidden.html").permitAll() 
				.antMatchers(HttpMethod.POST, "/signup.html").permitAll()
				.antMatchers(HttpMethod.GET,"/piatti", "/piatti/*", "/ristoranti/*", "/ristoranti", "/recensioni", "/recensioni/*").permitAll()
				.antMatchers("/elencoristoranti.html", "/elencopizzeria.html", "/elencosushi.html","/elencokebab.html","/elencoetnico.html").permitAll()
				.antMatchers(HttpMethod.POST,"/aggiungi_recensione.html").hasAnyRole(Roles.ADMIN, Roles.RISTORANTE, Roles.USER)
				.antMatchers(HttpMethod.POST, "/aggiungi_piatto.html").hasAnyRole(Roles.ADMIN)
				.antMatchers(HttpMethod.DELETE, "elimina_piatto.html").hasAnyRole(Roles.ADMIN)
				.antMatchers(HttpMethod.PUT, "modifica_piatto.html").hasAnyRole(Roles.ADMIN)
				.antMatchers(HttpMethod.POST, "/aggiungi_ristorante.html").hasAnyRole(Roles.ADMIN)
				.antMatchers(HttpMethod.PUT, "modifica_ristorante.html").hasAnyRole(Roles.ADMIN)
				
				
				.antMatchers("/account.html").hasAnyRole(Roles.ADMIN, Roles.USER)
				.antMatchers("/accountmanager/**").hasAnyRole(Roles.ADMIN) // solo gli admin accedono a /management/**
				.anyRequest().authenticated() // tutte le (altre) richieste richiedono authenticazione
				.and()
				.exceptionHandling()
				.accessDeniedPage("/forbidden.html")
				.and()
				
				.formLogin()
				.loginPage("/login.html") // indirizzo a cui arriveranno le richieste login
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
				// configuriamo anche la pagina per il logout
				.logout().logoutUrl("/logout")
				.logoutSuccessUrl("/loggedout.html")// indirizzo per fare logout
				.clearAuthentication(true)
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
				
				.logoutSuccessUrl("/")
				;
				
	}

	@Bean 
	// questo oggetto servirà a spring security per andare a cercare gli utenti da un service
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
