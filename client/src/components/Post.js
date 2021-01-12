import React, {useEffect, useState, useContext} from 'react'
import { Route, Redirect,Link } from 'react-router-dom'

let Post = (props)=>{

  return(
    <div key={props.postID}className='post'>
      <div className='post-top'>
        <Link to={{
          pathname: `/comments/${props.id}`
        }}>{props.title}</Link>

      </div>

      <div className='post-mid'>
        {(props.img)
          ? <img src={props.img}></img>
          : <h6 id='post-body'>{props.body}</h6>
        }
        <p id='post-sub'>{`in ${props.subreddit}`}</p>
      </div>

      <div className='post-foot'>
        <p className='post-score'>{props.score}</p>
        <a><p id='post-comments'>{`${props.comments.length} comments`}</p></a>
        <p className='post-time'>{props.time}</p>
      </div>

    </div>
  )
}
export default Post
