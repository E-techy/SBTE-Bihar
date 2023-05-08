const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
const path = require('path');
const connectToMongoDB=require('./mongoDb.js');
const fetchUserDetails=require("./checkRegistrationValidity.js");
const verifyEmail=require('./verifyEmail.js');
const usersEmailWithOtp=[];
let allDocuments=[];




async function mongoDbRetrieveAllDocuments(databaseName,collectionName) {
  const uri = `mongodb+srv://ashutoshkumarsingh02032005:${process.env.MONGO_DB_PASSWORD}@registeredusers.zsfgp5n.mongodb.net/?retryWrites=true&w=majority`;
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })
 async function getDocs() {
    await client.connect();
    console.log('Fetching documents from mongoDb');

     
     const collection= await client.db(databaseName).collection(collectionName);
     
     let result= await collection.find({}).toArray();
     console.log(result);
     allDocuments.push(...result);
  
     return ;    
 }
 
 getDocs().then()
  .catch(console.error)
  .finally(() => client.close());

}

// mongoDbRetrieveAllDocuments("Sbte-Bihar","RegisteredUsers")













app.set('view engine', 'ejs');

require('dotenv').config();

const folderPath = path.join(__dirname, 'Homepage'); // Replace 'folder' with the path to your desired folder

app.use(express.static(folderPath));

app.use(express.static(__dirname+"/syllabus"));

app.use(express.static(__dirname+"/notices"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"./Homepage/index.html")
})

app.get('/Login/index.html',(req,res)=>{
    res.sendFile(__dirname+"/Login/index.html");
})

app.get('/Login/register.html',(req,res)=>{
  res.sendFile(__dirname+"/Login/register.html");
})

app.get('/login',(req,res)=>{
    const username=req.query.username;
    const password=req.query.password;
    res.send(username+"your pass"+password)
})

app.get('/register',async(req,res)=>{
  if (req.query.email!=undefined) {
    const userDetails= fetchUserDetails(req);
    for (let i = 0; i < allDocuments.length; i++) {
      const currentDocument = allDocuments[i];
      if (currentDocument.username==userDetails.username) {
         res.send(`User Name already taken`);
         return;
      }
      
    }
    let otp =Math.floor(100000 + Math.random() * 900000);
    usersEmailWithOtp.push([userDetails.email_address,otp,userDetails])
    console.log(usersEmailWithOtp);
   await verifyEmail(userDetails.email_address,userDetails.name,otp)
      
   await connectToMongoDB(userDetails);
   allDocuments.push(userDetails);
   res.render('verifyOtp',{email:userDetails.email_address, userID:userDetails.username })
  }
})

app.get('/verifyOtp',(req,res)=>{
  let email=req.query.email;
  console.log(email);
  let userId=req.query.userId;
  console.log(userId);
  let otp=Number(req.query.OTP);
  console.log(otp);
  let successStatus=false;
  for (let i = 0; i < usersEmailWithOtp.length; i++) {
    const currentUser = usersEmailWithOtp[i];
    if (currentUser[0]==email && currentUser[1]==otp) {
      successStatus=true;
      connectToMongoDB(currentUser[2]);
    }
    
  }
  res.send({"success": successStatus})
})

app.get("/syllabus",(req,res)=>{
  res.render('syllabus');
})

app.get("/notices",(req,res)=>{

  res.render("notices");
})



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
})

