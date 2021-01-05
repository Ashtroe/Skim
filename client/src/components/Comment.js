import React, {useEffect, useState, useContext} from 'react'
import { Route, Redirect, useParams } from 'react-router-dom'

let Comment = (props) =>{
  return(
    <div className='comment'>
      <div className='comment-top'>
        <p className='comment-score'>{props.score}</p>
        <p className='comment-user'>{props.user}</p>
      </div>

      <div className='comment-body-ctnr'>
        <p className='comment-body'>{props.body}</p>
      </div>
    </div>
  )
}
export default Comment
