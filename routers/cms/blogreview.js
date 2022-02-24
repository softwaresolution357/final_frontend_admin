const express = require('express');
const app = express.Router();
const {blogreview,getSingleBlogReview,deleteReview} = require('../../controller/cms/blogreview')
app.get('/',blogreview);
app.get('/:id',getSingleBlogReview);
app.delete('/:id',deleteReview)

module.exports = app;
