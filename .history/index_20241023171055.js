const express=require('express');
const app=express();
const port=5003;
const mongoose=require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://pwskills:pwskills@127.0.0.1:27017/pwskills', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
  });


app.use(express.json());

app.get('/',(req,res)=>{
    console.log(`app running on http://localhost:${port}`);
    res.send('hello node.js');
});



app.listen(port,()=>{
    console.log(`app running on http://localhost:${port}`);
});