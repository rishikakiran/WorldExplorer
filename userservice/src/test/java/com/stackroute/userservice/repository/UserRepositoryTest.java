package com.stackroute.userservice.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.userservice.model.User;


@RunWith(SpringRunner.class)
@Transactional
@AutoConfigureTestDatabase(replace= Replace.NONE)
@DataJpaTest
public class UserRepositoryTest {

	@Autowired
	private UserRepository userRepository;
	
	private User user;
	
	@Before
	public void setUp() throws Exception{
		 user=new User("rk","rishika","kiran","password",new Date());
	}
	
	@Test
	public void testRegisterUserSuccess(){
		
		userRepository.save(user); 
		Optional<User> savedUser=userRepository.findById(user.getUserId());
		assertThat(savedUser.equals(user));
	}

	@Test
	public void testFindByUserIdAndPassword(){
		
		userRepository.save(user); 
		Optional<User> savedUser=userRepository.findById(user.getUserId());
		User fetchedUser=userRepository.findByUserIdAndPassword(user.getUserId(), user.getPassword());
		assertThat(savedUser.equals(fetchedUser));
	}
}
