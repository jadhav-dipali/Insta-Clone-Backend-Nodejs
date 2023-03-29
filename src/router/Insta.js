const express = require("express");
const router = new express.Router();
const Posts = require("../model/Insta")
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage")
require("dotenv").config();
const {GridFSBucket, MongoClient} = require("mongodb");


const client = new MongoClient(process.env.BASE_URL);





//****************get the file ********************

router.get("/post/:file" ,async(req,res)=>{
  try{
      await client.connect();
      const dataStore= client.db(process.env.DB);
     const Bucket = new GridFSBucket(dataStore,{bucketName:process.env.COLECTION_DB});
     const eventVar= Bucket.openDownloadStreamByName(req.params.file);
    eventVar.on("data",(data)=>{
      return res.write(data)
    })
    eventVar.on("error" ,(err)=>{
    return  res.status(400).send(err)
    })
    eventVar.on("end",()=>{
      return res.end()
    })

  }catch(err){
    res.status(400).send(err.message)
  }
})


// ************************get all Posts***************************
router.get("/post" ,async(req,res)=>{
  try{
    let readData = await Posts.find();
    res.json(readData); 
  }catch(err){
    res.status(400).json({message:"cant read Data"})
  }
})




// ****************use multer for add images***********************
const Storage = new GridFsStorage({
url:process.env.BASE_URL+process.env.DB,
file:(req,file)=>{
return{
  bucketName:process.env.COLECTION_DB,
  fileName:`${Date.now()}_${file.originalname}`
}}
})

const upload =  multer({
  storage:Storage
})
const middleware = upload.single("file");



// ****************post the whole data on DataBase********************

router.post("/post",middleware,async(req,res)=>{
    try{
     const data = new Posts( {file:req.file.filename,...req.body});
     const createData = await data.save();
     res.json(createData);
    }catch(err){
      console.log(err)
      res.status(400).json({message:"post is not created"})
    }
})



module.exports = router;