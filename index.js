const express = require("express")
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const Article = require('./models/article')

// connecting to database
mongoose.connect('mongodb://localhost/blog')

app.set("view engine", 'ejs')

//allowing access to parameters from article form
app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))


app.use("/articles", articleRouter)

app.listen(process.env.PORT || 5001, function(){
  console.log("Listening...")
})

app.get("/", async function(req, res){
  //retrieving all articles sorted in descending order
  const articles = await Article.find().sort({creationDate: 'desc'})

  res.render("articles/index", {articles})
})
