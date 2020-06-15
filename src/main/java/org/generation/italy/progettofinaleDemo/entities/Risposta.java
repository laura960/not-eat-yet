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
@Table(name = "risposte")
public class Risposta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String comment;
	
	@ManyToOne
	@JoinColumn(name = "id_recensione")
	@JsonIgnoreProperties("risposte")
	private Recensione recensione;


	public Risposta() {
		super();
	}

	public Risposta(int id, String comment, Recensione recensione) {
		super();
		this.id = id;
		this.comment = comment;
		this.recensione = recensione;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Override
	public String toString() {
		return "Risposta [id=" + id + ", comment=" + comment + "]";
	}

	public Recensione getRecensione() {
		return recensione;
	}

	public void setRecensione(Recensione recensione) {
		this.recensione = recensione;
	}
	
	
}
