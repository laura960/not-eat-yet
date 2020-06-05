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
@Table(name="categoria_piatti")
public class CategoriaPiatti {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String nome;
	
	@OneToMany
	@JoinColumn(name="id_piatti")
	private List<Piatto> piatti;
	
	public CategoriaPiatti(int id, String nome, List<Piatto> piatti) {
		super();
		this.id = id;
		this.nome = nome;
		this.piatti = piatti;
	}

	public CategoriaPiatti() {
		super();
	}

	public List<Piatto> getPiatti() {
		return piatti;
	}

	public void setPiatti(List<Piatto> piatti) {
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
}
