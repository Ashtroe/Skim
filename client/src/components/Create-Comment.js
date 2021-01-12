import React, {useEffect, useState, useContext} from 'react'
import { Route, Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import UserContext from './UserContext'

let CreateComment = (props) =>{
  let {user, setUser, sub, setSub}= useContext(UserContext)

  let submitComment = (subreddit,id, username, text)=>{
    axios({
      method:'post',
      url:`/s/${subreddit}/${id}`,
      data:
        {user: username,
        body: text,
      }
    })
    .catch((err)=>console.log(err))
  }

  let hideCreateComment = () =>{
      document.querySelector('.create-comment-ctnr').style.visibility= 'hidden'
    }
  return(
    <div className='create-comment-ctnr'>
      <div className='create-comment-btn-ctnr'>
        <button className='cancel-btn' onClick={()=>hideCreateComment()}>Cancel</button>
        <button className='submit-comment' onClick={
          ()=>{
            let commentText = document.querySelector('.create-comment-text').value
            submitComment(props.post.subreddit, props.post._id, user.username, commentText)
          }
        }>Submit</button>
      </div>
      <input className='create-comment-text' type="text"/>
      <div className='overlay'></div>
    </div>
  )
}
export default CreateComment
