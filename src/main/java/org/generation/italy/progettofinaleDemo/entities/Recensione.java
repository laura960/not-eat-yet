package org.generation.italy.progettofinaleDemo.entities;

import java.util.List;

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
	
	@Column(name = "nomeutente")
	private String nomeUtente;
	
	@ManyToOne
	@JoinColumn(name = "id_ristorante")
	@JsonIgnoreProperties("recensioni")
	private Ristorante ristorante;
	
	@OneToMany(cascade = {CascadeType.ALL}, mappedBy = "recensione")
	@JsonIgnoreProperties("recensione")
	private List<Risposta> risposte;

	public Recensione(int id, String titolo, String comment, int rating, String nomeUtente, Ristorante ristorante,
			List<Risposta> risposte) {
		super();
		this.id = id;
		this.titolo = titolo;
		this.comment = comment;
		this.rating = rating;
		this.nomeUtente = nomeUtente;
		this.ristorante = ristorante;
		this.risposte = risposte;
	}

	public String getNomeUtente() {
		return nomeUtente;
	}

	public void setNomeUtente(String nomeUtente) {
		this.nomeUtente = nomeUtente;
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

	public List<Risposta> getRisposte() {
		return risposte;
	}

	public void setRisposte(List<Risposta> risposte) {
		this.risposte = risposte;
	}
}