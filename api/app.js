const AppError = require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController')
const express = require('express');
const morgan = require('morgan');
const fileUpload = require("express-fileupload");
const path=require('path')
const app = express();
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser());
app.use(morgan('tiny'))
app.use(fileUpload())
app.use(express.static(path.join(__dirname, "public")));

//console.log(path.join(__dirname, "public"));
app.get('/', (req, res) => {
    res.render('index')
})

const authRoutes = require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
app.use('/api/v1/auth/', authRoutes)
app.use("/api/v1/users/", userRoutes);


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);



module.exports = app;