const express = require('express');
const path=require('path')
const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render('index')
})

const authRoutes = require('./routes/authRoutes')





module.exports = app;