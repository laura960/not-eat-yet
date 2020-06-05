package org.generation.italy.progettofinaleDemo.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="ristoranti")
public class Ristorante {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String nome;
	
	@Column(name = "ragionesociale")
	private String ragioneSociale;
	
	@Column(name = "piva")
	private String pIva;
	private String regione;
	private String via;
	
	@Column(name = "ncivico")
	private int nCivico;
	
	private String categoria;
	
	@OneToMany
	@JoinColumn(name="id_piatti")
	private List<Piatto> piatti;
	

	public Ristorante() {
		super();
	}

	public Ristorante(int id, String nome, String ragioneSociale, String pIva, String regione, String via, int nCivico,
			String categoria, List<Piatto> piatti) {
		super();
		this.id = id;
		this.nome = nome;
		this.ragioneSociale = ragioneSociale;
		this.pIva = pIva;
		this.regione = regione;
		this.via = via;
		this.nCivico = nCivico;
		this.categoria = categoria;
		this.piatti = piatti;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getRagioneSociale() {
		return ragioneSociale;
	}

	public void setRagioneSociale(String ragioneSociale) {
		this.ragioneSociale = ragioneSociale;
	}

	public String getpIva() {
		return pIva;
	}

	public void setpIva(String pIva) {
		this.pIva = pIva;
	}

	public String getRegione() {
		return regione;
	}

	public void setRegione(String regione) {
		this.regione = regione;
	}

	public String getVia() {
		return via;
	}

	public void setVia(String via) {
		this.via = via;
	}

	public int getnCivico() {
		return nCivico;
	}

	public void setnCivico(int nCivico) {
		this.nCivico = nCivico;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public List<Piatto> getPiatti() {
		return piatti;
	}

	public void setPiatti(List<Piatto> piatti) {
		this.piatti = piatti;
	}
	
	
	
}
