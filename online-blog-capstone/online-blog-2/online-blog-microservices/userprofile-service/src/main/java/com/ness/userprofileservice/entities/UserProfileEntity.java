package com.ness.userprofileservice.entities;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
@Table(name="userprofile")
public class UserProfileEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id; 
	@NotBlank(message="user name cannot be blank")
	@Size(message = "user name cannot be blank should be atleast 5 characters", min = 5)
	private String username;
	@Size(message = "First name cannot be blank and should be atleast 5 characters", min = 5)
	private String firstName;
	private String lastName;
	@JsonIgnore
	private String password; 
	@Email(message = "Enter a valid email")
	private String email;
	boolean isAdmin;
	private String biography; 
	private String imageUrl;
	@ManyToMany(cascade = CascadeType.ALL, mappedBy = "following")
    private Set<UserProfileEntity> followers = new HashSet<>();
    @JoinTable(name = "followers",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "follower_id")})
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<UserProfileEntity> following = new HashSet<>();
  	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public boolean getIsAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
	public String getBiography() {
		return biography;
	}
	public void setBiography(String biography) {
		this.biography = biography;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
		
	

	@Override
	public String toString() {
		return "UserProfileEntity [id=" + id + ", username=" + username + ", firstName=" + firstName + ", lastName="
				+ lastName + ", password=" + password + ", email=" + email + ", isAdmin=" + isAdmin + ", biography="
				+ biography + ", imageUrl=" + imageUrl + "]";
	}
	public Set<UserProfileEntity> getFollowers() {
		return followers;
	}
	public void setFollowers(Set<UserProfileEntity> followers) {
		this.followers = followers;
	}
	public Set<UserProfileEntity> getFollowing() {
		return following;
	}
	public void setFollowing(Set<UserProfileEntity> following) {
		this.following = following;
	}

	@Override
	public int hashCode() {
		return Objects.hash(username);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserProfileEntity other = (UserProfileEntity) obj;
		return Objects.equals(username, other.username);
	}
	
	
    public void addFollower(UserProfileEntity toFollow) {
        following.add(toFollow);
        toFollow.getFollowers().add(this);
    }
    public void removeFollower(UserProfileEntity toFollow) {
        following.remove(toFollow);
        toFollow.getFollowers().remove(this);
    }
}
