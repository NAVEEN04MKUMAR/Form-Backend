const express=require('express');
const app=express();
const port=5003;
const mongoose=require('mongoose');
const formroutes=require('./routes/fileroutes.js');
const bodyParser = require('body-parser');
const cors = require('cors');
// Connect to MongoDB
mongoose.connect('mongodb+srv://pwskills:pwskills@cluster0.zrr81ak.mongodb.net/', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
  });

  app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.use(formroutes);
require('dotenv').config(); 

app.get('/',(req,res)=>{
    console.log(`app running on http://localhost:${port}`);
    res.send('hello node.js');
});

app.use(cors({
  origin: 'http://your-frontend-url.com',  // Replace with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));


app.listen(port,()=>{
    console.log(`app running on http://localhost:${port}`);
});