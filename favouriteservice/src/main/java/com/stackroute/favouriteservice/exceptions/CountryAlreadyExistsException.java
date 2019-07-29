package com.stackroute.favouriteservice.exceptions;

@SuppressWarnings("serial")
public class CountryAlreadyExistsException extends Exception {
	
	public CountryAlreadyExistsException(String message) {
		super(message);
	}
}
