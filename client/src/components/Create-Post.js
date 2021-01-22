import React, {useEffect, useState, useContext} from 'react'
import { Route, Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import UserContext from './UserContext'

let CreatePost = () =>{
  let {user, setUser, sub, setSub}= useContext(UserContext)

  let submitPost = (username,sub,title,body,image)=>{
    console.log(username);
    axios({
      method:'post',
      url:'/submit',
      data:{
        user:username,
        subreddit:sub,
        title:title,
        body:body,
        img:image,
      }
    })
  }

  return(
    <div className='create-post-page'>
      <input className= 'create-post-sub' type="text" placeholder='Enter subreddit'/>
      <input className= 'create-post-title' type="text" placeholder='Enter Title'/>
      <textarea className= 'create-post-text' type="text" placeholder='Enter Text (optional)'/>
      <input className= 'create-post-image' type="text" placeholder='Enter image URL (optional)'/>
      <button className='create-post-submit' onClick={
        ()=>{
          let postSub= document.querySelector('.create-post-sub').value
          let postTitle = document.querySelector('.create-post-title').value
          let postBody = document.querySelector('.create-post-text').value
          let postImage = document.querySelector('.create-post-image').value
          let currentUser = user.username
          submitPost(currentUser, postSub,postTitle, postBody, postImage)
        }
      } >Submit Post</button>
    </div>
  )
}

export default CreatePost
