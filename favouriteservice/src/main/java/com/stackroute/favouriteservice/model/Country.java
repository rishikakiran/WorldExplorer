package com.stackroute.favouriteservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "country")
public class Country {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "capital")
	private String capital;
	
	@Column(name ="region")
	private String region;
	
	@Column(name= "population")
	private int population;
	
	@Column(name ="currency")
	private String currency;
	
	@Column( name ="flag")
	private String flag;
	
	@Column(name ="comments")
	private String comments;
	
	@Column(name = "userId")
	private String userId;
	
	public Country(){
		
	}

	public Country(int id, String name, String capital, String region, int population, String currency, String flag,
			String comments, String userId) {
		super();
		this.id = id;
		this.name = name;
		this.capital = capital;
		this.region = region;
		this.population = population;
		this.currency = currency;
		this.flag = flag;
		this.comments = comments;
		this.userId = userId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCapital() {
		return capital;
	}

	public void setCapital(String capital) {
		this.capital = capital;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public int getPopulation() {
		return population;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Country [id=" + id + ", name=" + name + ", capital=" + capital + ", region=" + region + ", population="
				+ population + ", currency=" + currency + ", flag=" + flag + ", comments=" + comments + ", userId="
				+ userId + "]";
	}
	
}
