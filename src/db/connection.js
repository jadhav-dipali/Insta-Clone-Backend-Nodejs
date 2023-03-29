const mongoose = require("mongoose")
require("dotenv").config();
let BASE_URL= process.env.BASE_URL;
let DB= process.env.DB;

mongoose.connect(BASE_URL+DB)
.then(res=>console.log("connection is successfull"))
.catch(err=>console.log("connection not sucess"))