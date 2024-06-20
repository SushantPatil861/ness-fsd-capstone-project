import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostContentComponent from './PostContentWindow';
import axios from 'axios';
import { useEffect } from 'react';
import './common.css';
import './PostReaderWindow.css';
import AuthorInfoComponent from './AuthorInfoWindow';

export default function PostReaderComponent() {
    const params = useParams();
    const [postObj, setPostObj] = useState([]);
    const [postDetailsObj, setPostDetailsObj] = useState([]);
    const [userObj, setUserObj] = useState([]);
    const [refreshCount, setRefreshCount] = useState(0);
    const postDetailsURL = "http://localhost:3001/post";
    const userDetailURL = "http://localhost:3001/user";
    useEffect(() => {
        console.log("Calling post and user")
        console.log("refresh count: "+refreshCount)
        axios.get(postDetailsURL, 
            {
                headers: {
                'Content-type': 'application/json'
                },
                params: {
                    createdBy: params.author,
                    postId: params.postId
                }
            })
            .then(
                (res)=> {
                    console.log("POST OBJ: "+JSON.stringify(res.data[0]));
                    setPostObj(res.data[0]);
                    setPostDetailsObj(res.data[0].postDetails);
                    axios.get(userDetailURL, 
                        {
                            headers: {
                            'Content-type': 'application/json'
                            },
                            params: {
                                username: params.author
                            }
                        })
                        .then(
                            (res)=> {
                                console.log(res.data)
                                setUserObj(res.data[0]);
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
    }, []);
    const refreshPost = ()=> {
        console.log("Post Refreshed");
        setRefreshCount((refreshCount) => refreshCount + 1);
    }
    return(
        <div className="postContainer">
            <PostContentComponent postObj = {postObj} userObj = {userObj} postDetailsObj = {postDetailsObj} refreshPost={refreshPost}/>
            <AuthorInfoComponent userObj = {userObj} />
        </div>
    );
}
