import React, {useEffect, useState, useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import UserContext from './UserContext'
import Post from './Post'

let Home = (props)=>{
  let {user, setUser, sub, setSub}= useContext(UserContext)
  let [posts, setPosts] = useState([])

  let getPosts = ()=>{
    axios({
      method:'get',
      url:'/home',
    })
    .then(response=>{
      setPosts(response.data);
      console.log(response);
    })
    .catch((err)=>
      {console.log(err)}
    )
  }

  useEffect(()=>{
    if (user) getPosts()
  },[])

  // Set subreddit
  useEffect(()=>
    {
      setSub('Frontpage')
    }
    ,[])

    return(
      (user) ?
        <div className='home-ctnr'>
          {posts.map(post=>{
            return(
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                body={post.body}
                img={post.img}
                date={post.date}
                score={post.score}
                user={post.user}
                subreddit={post.subreddit}
                comments={post.comments}
                 />
            )
          })}
        </div>
      :
      <Redirect to='/LogIn' />
    )
  }

export default Home
