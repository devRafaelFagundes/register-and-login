const express = require("express");
require("dotenv").config();
const connectToDb = require("./database/db");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded)
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("server listening on port", PORT)
})
connectToDb();