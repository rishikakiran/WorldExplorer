package com.stackroute.favouriteservice.service;

import java.util.List;

import com.stackroute.favouriteservice.exceptions.CountryAlreadyExistsException;
import com.stackroute.favouriteservice.exceptions.CountryNotFoundException;
import com.stackroute.favouriteservice.model.Country;

public interface CountryService {
	
	public boolean saveCountry(final Country country) throws CountryAlreadyExistsException;
	
	public Country updateCountry(final Country country) throws CountryNotFoundException;
	
	public boolean deleteCountryById(final int id) throws CountryNotFoundException;
	
	public  Country getCountryById(final int id) throws CountryNotFoundException;
	
	public List<Country> getAllCountries(String userId);

}
