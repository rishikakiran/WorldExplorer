package com.stackroute.favouriteservice.service;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.stackroute.favouriteservice.exceptions.CountryAlreadyExistsException;
import com.stackroute.favouriteservice.exceptions.CountryNotFoundException;
import com.stackroute.favouriteservice.model.Country;
import com.stackroute.favouriteservice.repository.CountryRepository;

public class CountryServiceImplTest {
	
	@Mock
	private CountryRepository countryRepository;
	
	@InjectMocks
	private CountryServiceImpl countryService;
	
	private transient Country country;
	
	transient Optional<Country> options;
	
	@Before
	public void setUpMocks(){
		MockitoAnnotations.initMocks(this);
		country=new Country(1,"india","delhi","Asia",1000000,"INR","tricolor","","rishu");
		options=Optional.of(country);
	}
	
	@After
	public void tearDown(){
		
	}
	
	@Test
	public void testMockCreation(){
		
		assertNotNull("JpaRepository creation fails!",countryRepository);
	}
	
	
	/*
	 * Test save country for success
	 */
	@Test
	public void testSaveCountrySuccess() throws CountryAlreadyExistsException{
		Mockito.when(countryRepository.save(country)).thenReturn(country);
		boolean flag=countryService.saveCountry(country);
		Assert.assertTrue(flag);
		Mockito.verify(countryRepository,Mockito.times(1)).save(country);
		Mockito.verify(countryRepository,Mockito.times(1)).findByNameAndUserId(country.getName(), country.getUserId());
	}
	
	/*
	 * Test save country for failure
	 */
	@Test(expected = CountryAlreadyExistsException.class)
	public void testSaveCountryFailure() throws CountryAlreadyExistsException{
		Mockito.when(countryRepository.findByNameAndUserId(country.getName(),country.getUserId())).thenReturn(country);
		Mockito.when(countryRepository.save(country)).thenReturn(country);
		boolean flag=countryService.saveCountry(country);
		Assert.assertFalse(flag);
		Mockito.verify(countryRepository,Mockito.times(1)).findByNameAndUserId(country.getName(), country.getUserId());
		Mockito.verifyZeroInteractions(countryRepository);
	}

	/*
	 * Test update country for success
	 */
	@Test
	public void testUpdateCountrySuccess() throws CountryNotFoundException{
		Mockito.when(countryRepository.findById(country.getId())).thenReturn(options);
		Mockito.when(countryRepository.save(country)).thenReturn(country);
		Country updateCountry=new Country(country.getId(),"india","delhi","Asia",1000000,"INR","tricolor","My Comment","rishu");
		
		Country updatedCountry=countryService.updateCountry(updateCountry);
		country.setComments(updateCountry.getComments());
		Assertions.assertThat(updateCountry.getComments()).isEqualTo(updatedCountry.getComments());
		Mockito.verify(countryRepository,Mockito.times(1)).save(country);
		Mockito.verify(countryRepository,Mockito.times(1)).findById(country.getId());
	}
	
	/*
	 * Test update country for failure
	 */
	@Test(expected = CountryNotFoundException.class)
	public void testUpdateCountryFailure() throws CountryNotFoundException{
		Mockito.when(countryRepository.findById(country.getId())).thenReturn(Optional.empty());
		Mockito.when(countryRepository.save(country)).thenReturn(country);
		Country updateCountry=new Country(country.getId(),"india","delhi","Asia",1000000,"INR","tricolor","My Comment","rishu");
		
		Country updatedCountry=countryService.updateCountry(updateCountry);
		country.setComments(updateCountry.getComments());
		Assertions.assertThat(updateCountry.getComments()).isEqualTo(updatedCountry.getComments());
		Mockito.verify(countryRepository,Mockito.times(1)).findById(country.getId());
		Mockito.verifyNoMoreInteractions(countryRepository);
	}
	
	/*
	 * Test delete country by id
	 * verifying the delete and findById method is service is called only once
	 */	
	
	@Test
	public void testDeleteCountryByIdSuccess() throws CountryNotFoundException{
		Mockito.when(countryRepository.findById(1)).thenReturn(options);
		Mockito.doNothing().when(countryRepository).deleteById(1);
		final boolean flag=countryService.deleteCountryById(country.getId());
		assertTrue("deleting movie failed!",flag);
		verify(countryRepository,times(1)).findById(country.getId());
		verify(countryRepository,times(1)).deleteById(country.getId());
		Mockito.verifyNoMoreInteractions(countryRepository);
	}
	/*
	 * Test get country by id for success
	 */	
	@Test
	public void testGetCountryByIdSuccess() throws CountryNotFoundException{
		when(countryRepository.findById(country.getId())).thenReturn(options);
		Country cont=countryService.getCountryById(country.getId());
		Assertions.assertThat(cont.getName()).isEqualTo(country.getName());
		verify(countryRepository,times(1)).findById(country.getId());
	}
	/*
	 * Test get country by id for failure
	 */	
	@Test(expected = CountryNotFoundException.class)
	public void testGetCountryByIdFailure() throws CountryNotFoundException{
		when(countryRepository.findById(country.getId())).thenReturn(Optional.empty());
		Country cont=countryService.getCountryById(country.getId());
		verify(countryRepository,times(1)).findById(country.getId());
	}
	
	/*
	 * Test get movies according to userId
	 */
	@Test
	public void testGetAllMoviesSuccess(){
		List<Country> fetchedList=new ArrayList<>(
				Arrays.asList((new Country(1,"india","delhi","Asia",1000000,"INR","tricolor","My Comment","kirtee")),
						(new Country(2,"australia","delhi","Asia",1000000,"INR","tricolor","My Comment","kirtee"))));
		when(countryRepository.findByUserId("kirtee")).thenReturn(fetchedList);
		List<Country> countryList=countryService.getAllCountries("kirtee");
		Assertions.assertThat(countryList.get(0).getName()).isEqualTo(fetchedList.get(0).getName());
		verify(countryRepository,times(1)).findByUserId("kirtee");
	}
}
