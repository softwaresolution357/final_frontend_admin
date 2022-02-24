const express = require('express');
const app = express.Router();
const {getblogmenu,putSingleblogmenu,postblogmenu,deleteblogmenu,getSingleBlog} = require('../../controller/cms/blogmenu');

app.get('/',getblogmenu)
app.post('/',postblogmenu)
app.delete('/:id',deleteblogmenu)
app.put('/:id',putSingleblogmenu)
app.get('/:slug',getSingleBlog)

module.exports = app;