package org.generation.italy.progettofinaleDemo.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="categoria_ristorante")
public class CategoriaRistorante {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String nome;
	
	@OneToMany
	@JoinColumn(name="id_cat_ristoranti")
	private List<Ristorante> ristoranti;
	
	

	public CategoriaRistorante(int id, String nome, List<Ristorante> ristoranti) {
		super();
		this.id = id;
		this.nome = nome;
		this.ristoranti = ristoranti;
	}

	public CategoriaRistorante() {
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

	public List<Ristorante> getRistoranti() {
		return ristoranti;
	}

	public void setRistoranti(List<Ristorante> ristoranti) {
		this.ristoranti = ristoranti;
	}
	
}
