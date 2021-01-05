const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let commentSchema =
  new Schema({
    postId: {type:'String', required: true},
    user: { type: 'String', required: true },
    body: { type: 'String', required: true },
    score: { type: 'Number', default:1 },
  })

let postSchema =
  new Schema({
    postId: {type:'String', required: true},
    subreddit: {type:'String', required: true},
    user: {type:'String', required: true},
    title: { type: 'String', required: true },
    body: { type: 'String', required: true },
    score: { type: 'Number', default: 1  },
    img: { type: 'String', default:null },
    date: {type: 'Date', default: Date.now},
    comments:[commentSchema],
  })


  module.exports = mongoose.model('Post', postSchema)
