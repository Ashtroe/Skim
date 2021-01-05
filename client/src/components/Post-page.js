import React, {useEffect, useState, useContext} from 'react'
import { Route, Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import UserContext from './UserContext'
import Comment from './Comment'

let PostPage = (props)=>{
  let {id} = useParams()

  let {user, setUser, sub, setSub}= useContext(UserContext)

  let [post,setPost] = useState({
    img:true,
    comments:[],
    subreddit:null,
    user:null
  })
  let getPostPage= (postId)=>{
      axios({
        method:'get',
        url:`/comments/${postId}`,
        data:{}
      })
      .then(response=>setPost(response.data[0]))
      .catch(err=>console.log(err))
    }
  let upvote = (upvoteUser,score,postId)=>{
      axios({
        method:'put',
        url:`${postId}/upvote`,
        data:{
          upvoteUser: user,
          score: score + 1
        }
      })
      .catch((err)=>console.log(err))
    }
  let downvote = (upvoteUser,score,postId)=>{
      axios({
        method:'put',
        url:`${postId}/upvote`,
        data:{
          upvoteUser: user,
          score: score - 1
        }
      })
      .then(()=>console.log('upvoted'))
    }



  useEffect(()=>
    {
      getPostPage(id)
    }
    ,[])

  // Set subreddit
  useEffect(()=>
    {
      setSub(post.subreddit)
    }
    ,[post.subreddit])


    return(
      (post.user)?
      <div className='post-page'>
        <div className='post-page-top'>
          <div className='post-page-title'>{post.title}</div>
        </div>
        <div className='post-page-body'>
          <p>{post.body}</p>
          <p>{`in ${post.subreddit} by ${post.user}`}</p>
        </div>
        <div className='post-page-bottom'>
          <p>{post.score}</p>
        </div>
        <hr/>
        <div className='post-page-buttons'>
          <button className='upvote-btn' onClick={
            ()=>upvote({user},post.score,id)
          }></button>
          <button className='downvote-btn' onClick={
            ()=>downvote({user},post.score,id)
          }></button>
        </div>
        <hr/>
        <div className='post-page-comment-ctnr'>
          {post.comments.map(postComment => {
            return(
              <Comment
                key = {postComment._id}
                user = {postComment.user}
                score = {postComment.score}
                body = {postComment.body}
                comments = {postComment.comments}
               />
            )
          })
          }
        </div>
      </div>
      : null

  )}


export default PostPage
