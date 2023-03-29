const express = require("express");
require ("./db/connection")
require("dotenv").config();
const router = require("./router/Insta")
const PORT = process.env.PORT
const app = express();
const cors = require("cors")

app.use(cors());

app.use(express.json());
app.use(router)


app.listen(PORT,()=>{
    console.log(`listening the port ${PORT}`)
})