const express = require('express')
const app = express()
const mongoose = require('mongoose');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
let PORT = process.env.PORT || 5000

const User = require('./models/User')
const Post = require('./models/Post')

let mongoDB = 'mongodb+srv://Ashtroe:Design0129@cluster.77cve.mongodb.net/Skim?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
mongoose.connection.on('connected', ()=>{
  console.log('Mongo connected');
})


app.use(express.json());
app.use(morgan('combined'))
app.use(cors({
  credentials:true
}))
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.get('/home', (req,res)=>{
  if(req.user){
  Post.find({})
    .then(response=>{res.send(response)})
    .then(console.log(req.User))
  }else{
    res.send(false)
  }
})


// Create new User
app.post("/sign-up", (req, res, next) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password
  }).save(err => {
    if (err) {
      return next(err);
    };
    res.send("user created");
  })
})

// Log in
app.post('/log-in',(req,res,next)=>{
  passport.authenticate('local', (err,user,info)=>{
      req.logIn(user,err =>{
        if(err){
          throw('failed')
        }
        res.send(req.user)
        console.log(req.user);
      })
  })
  (req,res,next)
})

// Create Post
app.post('/submit',(req,res)=>{
  let post = new Post({
    postID: uuid.v4(),
    title: req.body.title,
    body: req.body.body,
    score: req.body.score,
    image: req.body.image,
  }).save(err => {
    if (err) {
      return next(err);
    };
    res.send("post added succesfully");
  });
})
// Create Comment
app.post('/s/:subreddit/:id',(req,res)=>{
  Post.findOneAndUpdate(
    {_id:req.params.id },
    {$push: {
      comments: [
        {postId: req.params.id,
        user: req.body.user,
        body: req.body.body,}
        ]
      }
    })
})

// GET Post and commentS
app.get('/comments/:_id',(req,res)=>{
  Post.find({_id:req.params._id})
    .then(response=>res.send(response))
})

// Update Post score
app.put('/comments/:_id/upvote',(req,res)=>{
  console.log(req.body, req.params);
  Post.findOneAndUpdate(
    {_id:req.params._id },
    {score:req.body.score},
    {upsert: true}
  )
  .then(()=>{
    User.findOneAndUpdate(
      {_id:req.body.upvoteUser },
      {$push: {
        upvotedPosts: [
          req.params._id
          ]
        }})})})

//GET Subreddit
app.get('/s/?subreddit',(req,res)=>{
  Post.find({subreddit:req.params.subreddit})
    .then(response=>res.send(response))
    .catch(err=>console.log(err))
})
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      };
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { msg: "Incorrect password" });
      }
      return done(null, user._id);
    });
  })
);
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById({_id:id}, function(err, user) {
    done(err, user);
  });
});



app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
})
