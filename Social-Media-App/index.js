const express = require('express');
const app = express();
const mongoose= require('mongoose');
const Post = require('./models/post');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/socialmedia', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log('Error connecting.......', err));

app.set('view engine', 'ejs')

app.use(express.urlencoded ({extended: true}));

app.use(methodOverride('_method'));

//  ****************  ROUTES  ****************

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

app.get('/viewPost/:id', async (req,res) => {
    const post = await Post.findById(req.params.id);
    res.render('viewPost', {post})
})

app.get('/viewPost/:id/editPost', async (req,res) => {
    const post = await Post.findById(req.params.id);
    res.render('editPost', {post})
})

app.put('/viewPost/:id', async (req,res) => {
    const {id} = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect(`/viewPost/${id}`)
})

app.delete('/viewPost/:id', async (req,res) => {
    const {id} = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.redirect('/')
})

app.listen(3000);