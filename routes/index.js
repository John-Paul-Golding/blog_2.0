var express = require('express');
var router = express.Router();

var Posts = require('../db.json');
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home', posts: Posts.posts });
});

// GET NEW page
router.get('/new', function (req, res, next) {
  res.render('new');
});
module.exports = router;

// GET archives page
router.get('/archives', function (req, res, next) {
  res.render('archives');
});

// POST new page
router.post('/new', function (req, res, next) {
  // res.send (req.body)
  let obj = {
    "title": req.body.title,
    "author": req.body.author,
    "datetime": req.body.datetime,
    "content": req.body.content,
    "image": req.body.image
  }

  // write logic that saves this data
  request.post({
    url: 'http://localhost:8000/posts',
    body: obj,
    json: true
  }, function (error, responsive, body) {
    // what to send when function has finished
    res.redirect('/');
  });

});



// GET article page
router.get('/article1', function (req, res, next) {
  res.render('article1');
});

router.get('/article2', function (req, res, next) {
  res.render('article2');
});

router.get('/article3', function (req, res, next) {
  res.render('article3');
});

// GET archives page
router.get('/archive', function (req, res, next) {
  res.render('archives', { title: 'archive', posts: Posts.posts });
});

// delete button
router.get('/delete/:id', function(req,res,next){
  request ({
    url: "http://localhost:8000/posts/" + req.params.id,
    method: "Delete",
  }, function(error, response, body){

    res.redirect('/archive');
  });
});

/* GET EDIT post. */
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  request({
    url: 'http://localhost:8000/posts/' +id,
    method: "GET",
    json: true
  }, function (error, response, body) {
    console.log(body.author)
    res.render('edit', { post:body });
  });




});
// Get edit

router.post('/edit/:id', function(req, res, next) {


  request({
    url: 'http://localhost:8000/posts/'+ req.params.id,
    method:"PATCH",

    form: {
      "title" : req.body.title,
      "author" : req.body.author,
      "datetime" : req.body.datetime,
      "image":req.body.image,
      "content" : req.body.content,
    }

  },function (error, response, body) {
    res.redirect('/');
  });
});

/* GET login */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* POST sign in*/
router.post('/', function (req, res, next) {
  var users = posts.users;
  console.log(users);
 
  var username = req.body.username;
  var password = req.body.password;
 
  // console.log("Username: "+username+"======="+" Password: "+password);
 
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(user);
        if (username === user.username &&  password == user.password) {
      res.redirect('/home');
    } else {
      continue;
    }
 
  }
 });
 
 
 router.get('/signup', function(req, res, next){
  res.render('signup', {
    title: 'Sign Up'
  });
 });
 
 //GET SIGNUP PAGE
 router.post('/signup', function (req, res, next) {
 var id = posts.users[posts.users.length-1].id + 1;
 
 
 var obj = {
  "id": req.body.id,
  "username": req.body.username,
  "password": req.body.password,
  "email": req.body.email
 }
 request.post({
 
  url: "http://localhost:8000/users",
  body: obj,
  json: true
 
 }, function (error, response, body) {
 res.redirect('/');
 
 });
 });
 
 module.exports = router;