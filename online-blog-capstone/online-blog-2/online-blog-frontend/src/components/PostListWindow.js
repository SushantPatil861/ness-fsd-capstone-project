import React, { useEffect, useState } from "react";
import axios from "axios";
import PostTileComponent from "./PostTile";
import { useNavigate } from "react-router-dom";

export default function PostListComponent(props) {
    const [postArr, setPostArr] = useState([]);
    const navigate = useNavigate('');
    useEffect(()=> {
        console.log(props.searchBy);
        const loggedInUsername = sessionStorage.getItem('loggedInUser');
        let loggedInUser = null;
        axios.get("http://localhost:3001/user/",
            { 
                params: { username: loggedInUsername } 
            })
            .then(
                (res)=> {
                    console.log(res.data)
                    loggedInUser = res.data[0];
                    console.log("LoggedIn User" + loggedInUser.emailId);
                    //Depending on searchBy props, fetch the posts list using tags(fav topics) or followings
                    axios.get("http://localhost:3001/postList", 
                        {
                            headers: {
                                'Content-type': 'application/json'
                            }
                        })
                        .then(
                            (res)=> {
                                console.log(res.data)
                                setPostArr(res.data)
                            }
                        )
                        .catch(
                            (err)=>console.log(err)
                        )
                }
            )
            .catch(
                (err)=>console.log(err)
            )
        
    }, [])
    return (
        <div className="tileList">
            {
            postArr.map( post=> 
                <div className="tile" onClick={() => navigate("/"+post.author+"/"+post.postId)}><PostTileComponent {...post}/></div>
            )
            }
        </div>
    )
}