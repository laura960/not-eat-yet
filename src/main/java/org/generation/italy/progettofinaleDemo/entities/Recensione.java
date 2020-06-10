package org.generation.italy.progettofinaleDemo.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "recensioni")
public class Recensione {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String titolo;
	private String comment;
	private int rating;
	
	@ManyToOne
	@JoinColumn(name = "id_ristorante")
	@JsonIgnoreProperties("recensioni")
	private Ristorante ristorante;

	public Recensione(int id, String titolo, String comment, int rating, Ristorante ristorante) {
		super();
		this.id = id;
		this.titolo = titolo;
		this.comment = comment;
		this.rating = rating;
		this.ristorante = ristorante;
	}

	public Recensione() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitolo() {
		return titolo;
	}

	public void setTitolo(String titolo) {
		this.titolo = titolo;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Ristorante getRistorante() {
		return ristorante;
	}

	public void setRistorante(Ristorante ristorante) {
		this.ristorante = ristorante;
	}
	
	
	
	
	
	
	
}
