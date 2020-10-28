const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req,res) => {
    res.render('articles/new')
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if(article == null) res.redirect('/')
    res.render('articles/show', { article : article })
})

router.post('/', async (req,res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        res.render('article/new', {article:article})
    }
})
module.exports = router