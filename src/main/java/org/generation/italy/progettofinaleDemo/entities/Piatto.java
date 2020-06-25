package org.generation.italy.progettofinaleDemo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="piatti")
public class Piatto {
//ciao
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String nome;
	private double prezzo;
	private String ingredienti;
	private String categoria;
	
	// (cascade = CascadeType.ALL)
	
	@ManyToOne
	@JoinColumn(name = "id_ristorante")
	@JsonIgnoreProperties("piatti")
	private Ristorante ristorante;

	

	public Piatto(int id, String nome, double prezzo, String ingredienti, String categoria, Ristorante ristorante) {
		super();
		this.id = id;
		this.nome = nome;
		this.prezzo = prezzo;
		this.ingredienti = ingredienti;
		this.categoria = categoria;
		this.ristorante = ristorante;
	}

	public Piatto() {
		super();
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

	public double getPrezzo() {
		return prezzo;
	}

	public void setPrezzo(double prezzo) {
		this.prezzo = prezzo;
	}

	public String getIngredienti() {
		return ingredienti;
	}

	public void setIngredienti(String ingredienti) {
		this.ingredienti = ingredienti;
	}
	
	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public Ristorante getRistorante() {
		return ristorante;
	}

	public void setRistorante(Ristorante ristorante) {
		this.ristorante = ristorante;
	}
	
	
	
}
