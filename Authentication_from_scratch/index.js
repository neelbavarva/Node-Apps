const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost:27017/authdemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("Mongo Connection Open")
    })
    .catch(err => {
        console.log("Nope, it won't work")
    })


app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/register', (req,res) => {
    res.render('register')
})

app.post('/register', async (req,res) => {
    const {password, username} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User ({
        username,
        password: hash
    })

    await user.save()
    res.send(hash);
})

app.get('/secret', (req, res) =>{
    res.send("This is secret")
})

app.listen(3000, () =>{
    console.log("Server is Running")
})