import React, {useEffect, useState, useContext} from 'react'
import { Route, Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import UserContext from './UserContext'
import Comment from './Comment'
import CreateComment from './Create-Comment'

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
  let upvote = (score,postId)=>{
      axios({
        method:'put',
        url:`${postId}/upvote`,
        data:{
          upvoteUser: user._id,
          score: score + 1
        }
      })
      .catch((err)=>console.log(err))
    }
  let downvote = (score,postId)=>{
      axios({
        method:'put',
        url:`${postId}/upvote`,
        data:{
          upvoteUser: user._id,
          score: score - 1
        }
      })
      .then(()=>console.log('upvoted'))
    }

  let showCreateComment = () =>{
      document.querySelector('.create-comment-ctnr').style.visibility= 'visible'
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
        <CreateComment post={post}/>
        <div className='post-page-top'>
          <div className='post-page-title'>{post.title}</div>
        </div>
        <div className='post-page-body'>
          <img className='post-page-img' src={post.img} />
          <div className='post-page-text-ctnr'>
            <p>{post.body}</p>
            <p>{`in ${post.subreddit} by ${post.user}`}</p>
          </div>
        </div>
        <div className='post-page-bottom'>
          <p>{post.score}</p>
        </div>
        <hr/>
        <div className='post-page-buttons'>
          <button className='upvote' onClick={
            ()=>upvote(post.score,id)}>

            <i className='gg-arrow-up-r'></i>
          </button>

          <button className='downvote-btn' onClick={
            ()=>downvote(post.score,id)}>

              <i className='gg-arrow-up-r'></i>
          </button>
          <button className='create-comment-btn' onClick={
              ()=>{
                showCreateComment()
              }
            }
            ><i className="gg-mail-reply"></i>
          </button>
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
