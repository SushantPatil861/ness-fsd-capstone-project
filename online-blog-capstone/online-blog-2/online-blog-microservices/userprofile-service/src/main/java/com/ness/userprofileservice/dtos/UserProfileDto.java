package com.ness.userprofileservice.dtos;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(Include.NON_NULL)
public class UserProfileDto {
	
	private Long id; 
	@NotBlank(message="user name cannot be blank")
	@Size(message = "user name cannot be blank should be atleast 5 characters", min = 5)
	private String username;
	@Size(message = "First name cannot be blank and should be atleast 5 characters", min = 5)
	private String firstName;
	private String lastName;
	@NotBlank(message="password should be supplied")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	@NotBlank(message = "Email should be provided")
	@Email(message = "Enter a valid email")
	private String email;
	private boolean isAdmin; 
	private String biography;
	private String imageUrl;
	private Set<UserProfileDto> followers;
	private Set<UserProfileDto> following;
	
	
	
	public UserProfileDto(Long id,
			@NotBlank(message = "user name cannot be blank") @Size(message = "user name cannot be blank should be atleast 5 characters", min = 5) String username,
			@Size(message = "First name cannot be blank and should be atleast 5 characters", min = 5) String firstName,
			String lastName, @NotBlank(message = "password should be supplied") String password,
			@NotBlank(message = "Email should be provided") @Email(message = "Enter a valid email") String email,
			boolean isAdmin, String biography, String imageUrl) {
		super();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.email = email;
		this.isAdmin = isAdmin;
		this.biography = biography;
		this.imageUrl = imageUrl;
	}
}
