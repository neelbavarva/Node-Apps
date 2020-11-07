const express = require('express');
const app = express();
const mongoose= require('mongoose');
const Post = require('./models/post');

mongoose.connect('mongodb://localhost/socialmedia', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log('Error connecting.......', err));

app.set('view engine', 'ejs')

app.use(express.urlencoded ({extended: true})) ;

app.get('/', async (req,res) => {
    const allPosts = await Post.find();
    res.render('home', {allPosts})
})

app.post('/', async (req,res) => {
    const newPost = new Post(req.body);
    const newP = await newPost.save();
    res.redirect('/');
})

app.get('/newPost', (req,res) => {
    res.render('newPost')
})

app.listen(3000);