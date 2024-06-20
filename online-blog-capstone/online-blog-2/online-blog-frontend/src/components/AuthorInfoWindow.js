import React, { useState } from 'react';
import './AuthorInfoWindow.css';
import { useEffect } from 'react';

export default function AuthorInfoComponent(props) {
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(()=> {
        const followerArr = props.userObj.followers;
        const currentUser = sessionStorage.getItem("loggedInUser");
        if(followerArr && followerArr.length>0) {
            console.log(currentUser)
            console.log(followerArr)
            let user = followerArr.find((follower) => follower.username === currentUser);
            console.log(user)
            if(user != undefined) {
                console.log("User present")
                setIsFollowing(true);
            }
        }
                
    }, [props]);
    const followButtonClickHandler = ()=> {
        setIsFollowing(true)
    }
    return(
        <div className="authorInfo">
            <div className="sticky">
                <img src={props.userObj.imageUrl} style={{borderRadius:'50%', width:'10rem', height:'10rem'}}/>
                <div>
                    <div className="name">{props.userObj.firstName + " " + props.userObj.lastName}</div>
                    <div>{props.userObj.followers?props.userObj.followers.length==1?"1 Follower":props.userObj.followers.length + " Followers":null}</div>
                </div>
                <div>
                    {props.userObj.biography}
                </div>
                <div>
                    {!isFollowing?
                <button className="followBtn" onClick={followButtonClickHandler}>Follow</button>:
                <button className="followingBtn">Following</button>}
                </div>
            </div>
        </div>
    );
}