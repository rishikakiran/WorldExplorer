package com.stackroute.favouriteservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.favouriteservice.exceptions.CountryAlreadyExistsException;
import com.stackroute.favouriteservice.exceptions.CountryNotFoundException;
import com.stackroute.favouriteservice.model.Country;
import com.stackroute.favouriteservice.repository.CountryRepository;

@Service
public class CountryServiceImpl implements CountryService {
	
	private CountryRepository countryRepo;
	
	@Autowired
	public CountryServiceImpl(final CountryRepository countryRepo) {
		this.countryRepo=countryRepo;
	}
	
	/*
	*	Saving a country
	*	If country does already exist throws CountryAlreadyExistsException
	*/

	@Override
	public boolean saveCountry(final Country country) throws CountryAlreadyExistsException {
		Country getCountry=countryRepo.findByNameAndUserId(country.getName(),country.getUserId());
		if(getCountry!=null)
		{
			throw new CountryAlreadyExistsException("Cannot add to your favorites, Country Already Exists!");
		}
		countryRepo.save(country);
		return true;
	}
	
	/*
	*	Updating a country
	*	Add comments to the country
	*	If country does not exist throws CountryNotFoundException
	*/
	@Override
	public Country updateCountry(final Country country) throws CountryNotFoundException {
		
		Optional<Country> getCountry=countryRepo.findById(country.getId());
		if(!getCountry.isPresent())
		{
			throw new CountryNotFoundException("Cannot update your favorites, Country Not Exists!");
		}
		Country result=getCountry.get();
		result.setComments(country.getComments());
		countryRepo.save(result);
		return result;
	}
	
	/*
	*	Request for deleting a country
	*	If country does not exist throws CountryNotFoundException
	*/

	@Override
	public boolean deleteCountryById(final int id) throws CountryNotFoundException {
		Optional<Country> getCountry=countryRepo.findById(id);
		if(!getCountry.isPresent())
		{
			throw new CountryNotFoundException("Cannot delete from your favorites, Country Not Exists!");
		}
		countryRepo.deleteById(id);
		return true;
	}
	
	/*
	 * list all the countries added 
	 */

	@Override
	public List<Country> getAllCountries(String userId) {
		
		return countryRepo.findByUserId(userId);
	}

	/*
	*	Get Request for fetching a country with country Id
	*	If country does not exist throws CountryNotFoundException
	*/
	@Override
	public Country getCountryById(final int id) throws CountryNotFoundException {

		Optional<Country> getCountry=countryRepo.findById(id);
		if(!getCountry.isPresent())
		{
			throw new CountryNotFoundException("Cannot fetch country from your favorites, Country Not Exists!");
		}
		return getCountry.get();
	}


}
