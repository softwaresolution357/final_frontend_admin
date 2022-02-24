const express = require('express');
const app = express.Router();
const {getDropDown,postDropDown,allmegamenu,putMegamenuUpdate,singleMenuMegamenuUpdate} = require('../../controller/cms/megamenu');
app.get('/',getDropDown)
app.post('/',postDropDown)
app.put('/:id',putMegamenuUpdate)
app.put('/singlemenu/:id',singleMenuMegamenuUpdate)
app.get('/allmegamenu',allmegamenu)
module.exports = app