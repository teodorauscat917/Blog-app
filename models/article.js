const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
//dompurify & jsdpm documentation
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

// options for columns of article
const articleSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type:String
  },
  markdown:{
    type:String,
    required: true

  },
  creationDate:{
    type: Date,
    // if article does not have creationDate, default is current date
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml:{
    type: String,
    required: true
  }
})

//function called before crud operations
articleSchema.pre('validate', function(next){
  //creating slug from title for every model validation
  if (this.title){
    this.slug = slugify(this.title, {lower: true, strict: true})
  }

  //converting markdown to html & purifying it
  if (this.markdown){
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
  }

  next()
})
//exporting model and schema
module.exports = mongoose.model('Article', articleSchema)
