package com.ness.userprofileservice.services.impl;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ness.userprofileservice.aspects.ToLog;
import com.ness.userprofileservice.dtos.UserProfileDto;
import com.ness.userprofileservice.entities.UserProfileEntity;
import com.ness.userprofileservice.exceptions.OperationNotAllowedException;
import com.ness.userprofileservice.exceptions.UserAlreadyExistsException;
import com.ness.userprofileservice.exceptions.UserNotFoundException;
import com.ness.userprofileservice.mapstructs.UserProfileMapperImpl;
import com.ness.userprofileservice.repositories.UserProfileRepository;
import com.ness.userprofileservice.services.UserProfileService;

import jakarta.transaction.Transactional;

@Service
public class UserProfileServiceImpl implements UserProfileService{
	
	
	private final UserProfileRepository repository;
	private final UserProfileMapperImpl usermapper;
	private final PasswordEncoder passwordEncoder;

	
	public UserProfileServiceImpl(UserProfileRepository repository, UserProfileMapperImpl usermapper, PasswordEncoder passwordEncoder) {
		this.repository = repository;
		this.usermapper = usermapper;
		this.passwordEncoder=passwordEncoder;
	}

	@Override
    @Transactional()
    public UserProfileDto registerUser(UserProfileDto user) throws UserAlreadyExistsException {
	       Optional<UserProfileEntity> userent = repository.findUserProfileByUserNameOrEmail(user.getUsername(), user.getEmail());
	       
	       if(userent.isEmpty()) {
				UserProfileEntity userProfileEntity = usermapper.toUserProfileEntity(user);
				userProfileEntity.setPassword(passwordEncoder.encode(user.getPassword()));
				UserProfileEntity savedEntity =  repository.save(userProfileEntity);
				return usermapper.toUserProfileDto(savedEntity);
	       }else {
	    	   throw new UserAlreadyExistsException("User with username or email id alredy exists");
	       }     
    }

	@Override
    @Transactional()
	public UserProfileDto updateUser(Long userId, UserProfileDto user) throws UserNotFoundException, OperationNotAllowedException {
    	UserProfileEntity userent = repository.findById(userId).orElseThrow(() -> new UserNotFoundException("User Not Found"));
	    if(!userent.getUsername().equals(user.getUsername()) && !userent.getEmail().equals(user.getEmail())) {
	    	throw new OperationNotAllowedException("You cannot modify username and email details of an user");
	    }
		UserProfileEntity userProfileEntity = usermapper.toUserProfileEntity(user);
		UserProfileEntity savedEntity =  repository.save(userProfileEntity);
		return usermapper.toUserProfileDto(savedEntity); 
    }

    

	@Override
    @Transactional()
    public void deleteUser(Long userId) throws UserNotFoundException {
    	repository.findById(userId).orElseThrow(() -> new UserNotFoundException("User Not Found"));
		repository.deleteById(userId);	
    }
    

	@Override
    @Transactional()
    public UserProfileDto getUserById(Long userId) throws UserNotFoundException {
    	UserProfileEntity user = repository.findById(userId).orElseThrow(() -> new UserNotFoundException("user not found"));
    	return usermapper.toUserProfileDto(user);
    }
    
	@Override
    @Transactional()
    public boolean VerifyIfEmailAlreadyExists(String email) {
    	Optional<UserProfileEntity> useropt = repository.findUserProfileByEmail(email);
    	return useropt.isPresent();
    }

	@Override
    @Transactional()
	public boolean VerifyIfUsernameAlreadyExists(String username) {
    	Optional<UserProfileEntity> useropt = repository.findUserProfileByUsername(username);
    	return useropt.isPresent();
	}


	@Override
    @Transactional()
	public UserProfileDto fetchByUsername(String username) throws UserNotFoundException {
		UserProfileEntity user = repository.findUserProfileByUsername(username).orElseThrow(() -> new UserNotFoundException("user not found"));
		return usermapper.toUserProfileDto(user);
   	}
	
	
	@ToLog
	@Override
    @Transactional()
    public void addFollower(Long userId, Long toFollowId) throws UserNotFoundException {
    	UserProfileEntity user = repository.findById(userId).orElseThrow(() -> new UserNotFoundException("user not found"));
    	UserProfileEntity toFollow = repository.findById(toFollowId).orElseThrow(() -> new UserNotFoundException("user profile to follow is not found"));
        user.addFollower(toFollow);
        repository.save(user);
    }
    
	@Override
    @Transactional()
    public void unfollow(Long userId, Long toUnFollowId) throws UserNotFoundException {      
        UserProfileEntity user = repository.findById(userId).orElseThrow(() -> new UserNotFoundException("user not found"));
    	UserProfileEntity toUnFollow = repository.findById(toUnFollowId).orElseThrow(() -> new UserNotFoundException("user profile to unfollow is not found"));
        user.removeFollower(toUnFollow);
        repository.save(user);
    }
	
	@Override
    @Transactional()
    public Set<UserProfileDto> getFollowers(Long userId) throws UserNotFoundException {
    	UserProfileEntity user =  repository.findById(userId).orElseThrow(() -> new UserNotFoundException("user not found"));
    	return user.getFollowers().stream().map(item->usermapper.toUserProfileDto(item)).collect(Collectors.toSet());    			
    }
	
	
	@Override
    @Transactional()
    public Set<UserProfileDto> getFollowing(Long userId) throws UserNotFoundException {
        UserProfileEntity user =  repository.findById(userId).orElseThrow(() -> new UserNotFoundException("user not found"));
    	return user.getFollowing().stream().map(item->usermapper.toUserProfileDto(item)).collect(Collectors.toSet());    			
    }


}
