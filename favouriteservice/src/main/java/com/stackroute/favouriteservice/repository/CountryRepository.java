package com.stackroute.favouriteservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.favouriteservice.model.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {
	
	List<Country> findByUserId(String userId);
	Country findByNameAndUserId(String name, String userId);

}
