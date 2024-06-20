package com.ness.userprofileservice.dtos;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ness.userprofileservice.entities.UserProfileEntity;

public class MyUserDetails implements UserDetails {
	
    private static final Logger LOG = LoggerFactory.getLogger(MyUserDetails.class);


	private static final long serialVersionUID = 1L;
	private UserProfileEntity user;
	
	 public MyUserDetails(UserProfileEntity user) {
	        LOG.info("user injected to my userdetails: '{}'", user);

	        this.user = user;
	    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		
		Set<SimpleGrantedAuthority> roles = new HashSet<SimpleGrantedAuthority>();	
		roles.add(new SimpleGrantedAuthority("ROLE_user"));
		if(user.getIsAdmin()) roles.add(new SimpleGrantedAuthority("ROLE_admin"));
		return roles;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}

}
