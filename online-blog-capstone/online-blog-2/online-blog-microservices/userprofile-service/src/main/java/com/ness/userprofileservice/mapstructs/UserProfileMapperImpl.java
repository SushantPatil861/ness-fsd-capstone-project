package com.ness.userprofileservice.mapstructs;

import com.ness.userprofileservice.dtos.UserProfileDto;
import com.ness.userprofileservice.entities.UserProfileEntity;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-03T13:28:32+0530",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 17.0.4.1 (Eclipse Adoptium)"
)
@Component
public class UserProfileMapperImpl {

    public UserProfileDto toUserProfileDto(UserProfileEntity user) {
        if ( user == null ) {
            return null;
        }

        UserProfileDto userProfiledto = new UserProfileDto();

        userProfiledto.setId( user.getId() );
        userProfiledto.setUsername( user.getUsername() );
        userProfiledto.setFirstName( user.getFirstName() );
        userProfiledto.setLastName( user.getLastName() );
        userProfiledto.setPassword( user.getPassword() );
        userProfiledto.setEmail( user.getEmail() );
        userProfiledto.setBiography( user.getBiography() );
        userProfiledto.setImageUrl( user.getImageUrl() );
        userProfiledto.setFollowers( toUserProfileDtoSet( user.getFollowers() ) );
        userProfiledto.setFollowing( toUserProfileDtoSet( user.getFollowing() ) );

        return userProfiledto;
    }

    public UserProfileEntity toUserProfileEntity(UserProfileDto user) {
        if ( user == null ) {
            return null;
        }

        UserProfileEntity userProfileEntity = new UserProfileEntity();

        userProfileEntity.setId( user.getId() );
        userProfileEntity.setUsername( user.getUsername() );
        userProfileEntity.setFirstName( user.getFirstName() );
        userProfileEntity.setLastName( user.getLastName() );
        userProfileEntity.setPassword( user.getPassword() );
        userProfileEntity.setEmail( user.getEmail() );
        userProfileEntity.setBiography( user.getBiography() );
        userProfileEntity.setImageUrl( user.getImageUrl() );
        
        return userProfileEntity;
    }

    public UserProfileDto toFollowerDto(UserProfileEntity user) {
        if ( user == null ) {
            return null;
        }
        
        UserProfileDto userProfiledto = new UserProfileDto();

        userProfiledto.setId( user.getId() );
        userProfiledto.setUsername( user.getUsername() );
        userProfiledto.setFirstName( user.getFirstName() );
        userProfiledto.setLastName( user.getLastName() );
        userProfiledto.setEmail( user.getEmail() );
        userProfiledto.setBiography( user.getBiography() );
        
        return userProfiledto;

    }

 
    
    public Set<UserProfileDto> toUserProfileDtoSet(Set<UserProfileEntity> followers) {
        if ( followers == null ) {
            return null;
        }

        Set<UserProfileDto> set = new LinkedHashSet<UserProfileDto>( Math.max( (int) ( followers.size() / .75f ) + 1, 16 ) );
        for ( UserProfileEntity userProfileEntity : followers ) {
            set.add( toFollowerDto( userProfileEntity ) );
        }

        return set;
    }

}
