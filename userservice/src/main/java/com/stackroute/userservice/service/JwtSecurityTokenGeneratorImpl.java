package com.stackroute.userservice.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import com.stackroute.userservice.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtSecurityTokenGeneratorImpl implements SecurityTokenGenerator{

	@Override
	public Map<String, String> generateToken(User user) {

		String jwtToken="";
		
		/*
		 * Create Jwt Token
		 * SUBJECT: userId
		 * ISSUE TIME : current time
		 * EXPIRATION TIME: 4 day later
		 * ALGORITHM : HS256 KEY=secretkey
		 */
		jwtToken=Jwts.builder().setSubject(user.getUserId()).setIssuedAt(new Date()).
				setExpiration(new Date(System.currentTimeMillis()+TimeUnit.DAYS.toMillis(4))).
				signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		
		Map<String, String> mapToken=new HashMap<String, String>();
		mapToken.put("token",jwtToken);
		mapToken.put("message","User Logged In Successfully");
		return mapToken;
	}

}
