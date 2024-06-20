import React, { useEffect, useState } from "react";
import axios from "axios";
import './PostCreatorWindow.css';
import ReactDOM from 'react-dom';
import { RiImageAddLine } from 'react-icons/ri';
import MediumEditor from "medium-editor";
import PostTileComponent from "./PostTile";
import { Form } from "react-bootstrap";

export default function PostCreatorComponent() {
    const [user, setUser] = useState({});
    const [previewMode, setPreviewMode] = useState(false);
    const [previewButtonDisabled, setPreviewButtonDisabled] = useState(true);
    const [publishButtonDisabled, setPublishButtonDisabled] = useState(true);
    const [postObj, setPostObj] = useState({});
    useEffect(()=> {
        const loggedInUsername = sessionStorage.getItem('loggedInUser');
        console.log("Inside Useeffect: "+loggedInUsername)
        axios.get("http://localhost:3001/user/",
            { 
                params: { username: loggedInUsername } 
            })
            .then(
                (res)=> {
                    console.log(res.data)
                    console.log(res.data[0])
                    setUser(res.data[0]);
                    
                    console.log("Inside Useeffect: "+JSON.stringify(user))
                }
            )
            .catch(
                (err)=>console.log(err)
            )
        
    }, [])
    const appendEditor = ()=> {
        setTimeout(() => {
            let editor = new MediumEditor('.editor-area', {
                placeholder: {
                    text: 'Tell your story...'
                },
                toolbar: {
                    buttons: [
                        'bold',
                        'italic',
                        'underline',
                        'anchor',
                        {
                            name: 'h3',
                            action: 'append-h3',
                            aria: 'header type 1',
                            tagNames: ['h3'],
                            contentDefault: '<b>H1</b>',
                            classList: ['custom-class-h1'],
                            attrs: {
                                'data-custom-attr': 'attr-value-h1'
                            }
                        },
                        {
                            name: 'h4',
                            action: 'append-h4',
                            aria: 'header type 2',
                            tagNames: ['h4'],
                            contentDefault: '<b>H2</b>',
                            classList: ['custom-class-h2'],
                            attrs: {
                                'data-custom-attr': 'attr-value-h2'
                            }
                        }
                    ]
                }
            });
            editor.subscribe('editableInput', togglePublishButton)
        },0);
    }

    const previewPost = ()=> {
        console.log(user)
        console.log(user.firstName+" "+user.lastName)
        let postContent = document.querySelector('.editor-container > .editor-area');
        let postTitle = document.querySelector('.editor-container > h1.title');
        let post = {
            title: postTitle?.innerText,
            postDetails: {
                content: postContent?.innerHTML,
                short_description: postContent?.innerText,
                imageUrl: postContent?.querySelector('img:first-child')?.getAttribute('src')
            },
            category: "Technology",
            createdBy: sessionStorage.getItem('loggedInUser')
        }
        let postTile = {
            profilePhotoPath: user.imageUrl,
            authorFullName: user.firstName+" "+user.lastName,
            publishedDate: new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}),
            title: postTitle?.innerText,
            short_description: postContent?.innerText,
            displayImagePath: postContent?.querySelector('img:first-child')?.getAttribute('src')
        }
        console.log(JSON.stringify(postObj))
        setPostObj(postTile)
        setPreviewMode(true)
    }

    const publishPost = ()=> {
        console.log(user)
        console.log(user.firstName+" "+user.lastName)
        let postContent = document.querySelector('.editor-container > .editor-area');
        let postTitle = document.querySelector('.editor-container > h1.title');
        let postCategory = document.querySelector('.preview-mode #post-category').value
        let post = {
            title: postTitle?.innerText,
            imageUrl: postContent?.querySelector('img:first-child')?.getAttribute('src'),
            postDetails: {
                content: postContent?.innerHTML,
                short_description: postContent?.innerText,
            },
            category: postCategory,
            createdBy: sessionStorage.getItem('loggedInUser')
        }
        console.log(JSON.stringify(post))
    }

    const editPost = ()=> {
        setPreviewMode(false)
    }

    const togglePublishButton = (ev)=>{
        let postContent = document.querySelector('.editor-container > .editor-area')?.innerText.trim();
        let postTitle = document.querySelector('.editor-container > h1.title')?.innerText.trim();
        let previewBtn = document.querySelector('.editor-navbar > #preview-button')
        console.log("postContent :"+postContent)
        console.log("postTitle :"+postTitle)
        if(postTitle && postContent && postTitle!=='' && postContent!=='') {
            previewBtn.classList.add('btn-green-enabled')
            setPreviewButtonDisabled(false)
        } else {
            previewBtn.classList.remove('btn-green-enabled')
            setPreviewButtonDisabled(true)
        }
    }

    const titleKeyDownhandler = (ev)=>{
        if(ev.nativeEvent.key==='Enter') {
            ev.preventDefault();
            document.querySelector('.editor-area').focus();
        }
    }

    const categorySelectHandler = (ev)=> {
        console.log(ev.target)
        let publishBtn = document.querySelector('.preview-mode #publish-button')
        if(ev.target.value === "") {
            publishBtn.classList.remove('btn-green-enabled')
            setPublishButtonDisabled(true)
        } else {
            publishBtn.classList.add('btn-green-enabled')
            setPublishButtonDisabled(false)
        }
    }
    return (
        <div>
            <div className="editor-mode" hidden={previewMode}>
                <div className="editor-navbar">
                    <button className="btn-green" id="preview-button" onClick={previewPost} disabled={previewButtonDisabled}>Publish</button>
                </div>
                <div className="editor-container" hidden={previewMode}>
                    <h1 className="box title place-holder" data-text='Title..' contentEditable onKeyDown={titleKeyDownhandler} onKeyUp={togglePublishButton}></h1>
                    <div className="editor-area">
                        {appendEditor()}
                    </div>
                </div>
            </div>
            <div className="preview-mode" hidden={!previewMode}>
                <div>
                    <b style={{fontSize:'1.3rem'}}>Post Preview</b>
                    <button className="btn-green-enabled" onClick={editPost}>Edit</button>
                </div>
                <div className="tile">
                    <PostTileComponent {...postObj}/>
                </div>
                <br />
                <br />
                <div>
                    <Form.Select aria-label="Select Category"id="post-category" onChange={categorySelectHandler}>
                        <option value="">Select Category...</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Creativity">Creativity</option>
                    </Form.Select>
                </div>
                <div>
                    <button className="btn-green" id="publish-button" onClick={publishPost} disabled={publishButtonDisabled}>Publish Now</button>
                </div>
            </div>
        </div>
    )
}