package com.stackroute.favouriteservice.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.favouriteservice.model.Country;

@AutoConfigureTestDatabase(replace = Replace.NONE)
@RunWith(SpringRunner.class)
@DataJpaTest
@Transactional
public class CountryRepositoryTest {

	/*
	 * Setter Autowiring of Repository
	 */
	private CountryRepository countryRepository;

	@Autowired
	public void setCountryRepository(CountryRepository countryRepository) {
		this.countryRepository = countryRepository;
	}
	
	private transient Country country;
	
	public CountryRepositoryTest(){
		
	}
	
	@Before
	public void setUp(){
		country=new Country(0,"india","delhi","Asia",1000000,"INR","tricolor","","rishu");
	}
	
	@After
	public void tearDown(){
	}
	
	@Test
	public void testSaveCountry() {
		Country savedCountry=countryRepository.save(country);
		Country fetchedCountry=countryRepository.getOne(savedCountry.getId());
		Assertions.assertThat(savedCountry.getName()).isEqualTo(fetchedCountry.getName());
	}
	
	@Test
	public void testUpdateCountry() {
		Country savedCountry=countryRepository.save(country);
		Country updatedCountry=countryRepository.getOne(savedCountry.getId());
		updatedCountry.setComments("I added");
		countryRepository.save(updatedCountry);
		updatedCountry=countryRepository.getOne(savedCountry.getId());
		Assertions.assertThat(updatedCountry.getComments()).isEqualTo("I added");
	}
	
	@Test
	public void testDeleteMovieById(){
		Country savedCountry=countryRepository.save(country);
		countryRepository.deleteById(savedCountry.getId());
		Assertions.assertThat(Optional.empty()).isEqualTo(countryRepository.findById(savedCountry.getId()));
	}
	
	@Test
	public void testGetMovieById(){
		Country savedCountry=countryRepository.save(country);
		Country fetchedCountry=countryRepository.getOne(savedCountry.getId());
		Assertions.assertThat(savedCountry).isEqualTo(fetchedCountry);
	}
	
	@Test
	public void testGetListUsingUserId(){
		countryRepository.save(country);
		Country country2=new Country(0,"india","delhi","Asia",1000000,"INR","tricolor","","kk");
		countryRepository.save(country2);
		List<Country> fetchedList=countryRepository.findByUserId("kk");
		Assertions.assertThat(fetchedList.get(0).getName()).isEqualTo(country2.getName());
	}
}
