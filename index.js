const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./schema.js');

dotenv.config();
const app = express();
app.use(express.json());

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log(`Connected to database`);
})
.catch((error)=>{
  console.error(`Error connecting to database, ${error}`)
})

app.post('/api/users', async(req,res)=>{
  try{
    const userData=req.body;
    const newUser =new User(userData);
    await newUser.save();

    res.status(201).json({message:"user created successfully"});
  }
  catch(error){
    if(error.name==='ValidationError'){
      res
      .status(400)
      .json({message:"validation error", details:error.message})
    }else{
      res.status(500).json({ message: 'Server error', details: error.message });
    }
  }
})
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
