const express=require('express');
const app=express();
const port=5003;




app.get('/',(req,res)=>{
    console.log(`app running on http://localhost:${port}`);
    res.send('hello node.js');
});



app.listen(port,()=>{
    console.log(`app running on http://localhost:${port}`);
});