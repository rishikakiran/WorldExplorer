package com.stackroute.favouriteservice.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.favouriteservice.model.Country;
import com.stackroute.favouriteservice.service.CountryService;


@RunWith(SpringRunner.class)
@WebMvcTest(CountryController.class)
public class CountryControllerTest {

	
	@Autowired
	private transient MockMvc mvc;
	
	@MockBean
	private CountryService countryService;
	
	@InjectMocks
	private CountryController countryController;
	
	private transient Country country;
	
	private List<Country> countryList;
	
	@Before
	public void setUp(){
		MockitoAnnotations.initMocks(this);;
		countryList=new ArrayList<>(
				Arrays.asList((new Country(1,"india","delhi","Asia",1000000,"INR","tricolor","My Comment","rishu")),
						(new Country(2,"australia","delhi","Asia",1000000,"INR","tricolor","My Comment","rishu"))));
		country=countryList.get(0);
	}
	
	/*
	 * Test saveCountry() with correct data
	 */
	
	@Test
	public void testSaveCountrySuccess() throws Exception{
		String token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyaXNodSIsImlhdCI6MTU1MzU5NDQ0MSwiZXhwIjoxNTUzOTQwMDQxfQ.x3L3-tugvpVQwyyVBVM0XekGCZAZfTccZSlgzwzhfUc";
		country.setUserId(null);
		when(countryService.saveCountry(country)).thenReturn(true);
		mvc.perform(post("/api/v1/favouriteservice/country").header("authorization", "Bearer "+token).contentType(MediaType.APPLICATION_JSON).
				content(jsonToString(country))).andExpect(status().isCreated());
		country.setUserId("rishu");
		verify(countryService,times(1)).saveCountry(Mockito.any(Country.class));
		verifyNoMoreInteractions(countryService);
	}
	
	/*
	 * Test updateCountry() with correct data
	 */
	
	@Test
	public void testUpdateCountrySuccess() throws Exception{
		String token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyaXNodSIsImlhdCI6MTU1MzU5NDQ0MSwiZXhwIjoxNTUzOTQwMDQxfQ.x3L3-tugvpVQwyyVBVM0XekGCZAZfTccZSlgzwzhfUc";
		
		country.setComments("Added Comment");
		when(countryService.updateCountry(country)).thenReturn(countryList.get(0));
		when(countryService.saveCountry(country)).thenReturn(true);
		mvc.perform(put("/api/v1/favouriteservice/country").header("authorization", "Bearer "+token).contentType(MediaType.APPLICATION_JSON).
				content(jsonToString(country))).andExpect(status().isOk());
		
		verify(countryService,times(1)).updateCountry(Mockito.any(Country.class));
		verifyNoMoreInteractions(countryService);
	}
	
	/*
	 * Test delete mapping for countries
	 * verifying the deleteById method is service is called only once
	 */	
	
	@Test
	public void testDeleteCountry() throws Exception{
		String token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyaXNodSIsImlhdCI6MTU1MzU5NDQ0MSwiZXhwIjoxNTUzOTQwMDQxfQ.x3L3-tugvpVQwyyVBVM0XekGCZAZfTccZSlgzwzhfUc";
		
		when(countryService.deleteCountryById(country.getId())).thenReturn(true);
		mvc.perform(delete("/api/v1/favouriteservice/country/{id}",country.getId()).header("authorization", "Bearer "+token)).andExpect(status().isOk());
		
		verify(countryService,times(1)).deleteCountryById(country.getId());
		verifyNoMoreInteractions(countryService);
	}
	
	/*
	 * Test get mapping for countries
	 * verifying the getCountryById method is service is called only once
	 */	
	
	@Test
	public void testGetCountry() throws Exception{
		
		String token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyaXNodSIsImlhdCI6MTU1MzU5NDQ0MSwiZXhwIjoxNTUzOTQwMDQxfQ.x3L3-tugvpVQwyyVBVM0XekGCZAZfTccZSlgzwzhfUc";
		
		when(countryService.getCountryById(country.getId())).thenReturn(country);
		mvc.perform(get("/api/v1/favouriteservice/country/{id}",country.getId()).header("authorization", "Bearer "+token)).andExpect(status().isOk());
		
		verify(countryService,times(1)).getCountryById(country.getId());
		verifyNoMoreInteractions(countryService);
	}
	
	/*
	 * Test Get All movies fir a user
	 */
	@Test
	public void testGetAllMovies() throws Exception{
		String token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyaXNodSIsImlhdCI6MTU1MzU5NDQ0MSwiZXhwIjoxNTUzOTQwMDQxfQ.x3L3-tugvpVQwyyVBVM0XekGCZAZfTccZSlgzwzhfUc";
		
		when(countryService.getAllCountries("rishu")).thenReturn(countryList);
		mvc.perform(get("/api/v1/favouriteservice/country").header("authorization", "Bearer "+token)).
		andExpect(status().isOk());
		
		verify(countryService,times(1)).getAllCountries(country.getUserId());
		verifyNoMoreInteractions(countryService);
	}
	/*
	 * map a json string to an object
	 */
	private static String jsonToString(final Object obj) throws JsonProcessingException{
		String result;
		try{
			final ObjectMapper mapper=new ObjectMapper();
			final String jsonContent=mapper.writeValueAsString(obj);
			result=jsonContent;
		}
		catch(JsonProcessingException e){
			result="json processing error!";
		}		
		return result;
	}
}
