
const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors");


const verifyToken = require('./verifyToken')
var authRouter = require('./routes/authRouter')
var topicRouter = require('./routes/topicRouter')
var postRouter = require('./routes/postRouter');
const mailRouter = require('./routes/mailRouter');

const port = 3100;

const app = express()

app.use(cors());
app.use(express.json())


app.use('/auth',authRouter);
app.use('/topic',topicRouter);
app.use('/post',postRouter);
app.use('/mail',mailRouter)

app.get('/',(req,res)=>{
    res.status(200).send('Hello world')
})

app.listen(port,()=>{

    console.log('server started on http://localhost:3100')

    mongoose.connect('mongodb+srv://parthvaghani:parth1414@cluster0.bbzjb.mongodb.net/Openxcell?retryWrites=true&w=majority');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('Connected correctly to db - ');
    });
})