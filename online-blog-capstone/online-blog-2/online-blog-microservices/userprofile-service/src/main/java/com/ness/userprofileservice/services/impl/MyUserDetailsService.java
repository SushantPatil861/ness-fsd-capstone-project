package com.ness.userprofileservice.services.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ness.userprofileservice.dtos.MyUserDetails;
import com.ness.userprofileservice.entities.UserProfileEntity;
import com.ness.userprofileservice.repositories.UserProfileRepository;




@Service
public class MyUserDetailsService implements UserDetailsService {
	
	private final UserProfileRepository userRepo;

	public MyUserDetailsService(UserProfileRepository userRepo) {
		this.userRepo = userRepo;
	}

  	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		 UserProfileEntity user = userRepo.findUserProfileByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User with Id" + username + "dont exist"));
	       
		 MyUserDetails desired=new MyUserDetails(user);
	        System.out.println("desired : " + desired.getUsername() + " " + desired.getPassword() + " " + desired.getAuthorities() );
	        return desired;
	}
	
	
}