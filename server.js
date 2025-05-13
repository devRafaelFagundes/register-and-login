const express = require("express");
require("dotenv").config();
const connectToDb = require("./database/db");
const cookieParser = require("cookie-parser")
const router = require("./routes/login-register-route")
const imageRouter = require("./routes/upload-route")
const path = require("path")

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//dont actually necessary, no forms is being send directly, only by FETCH 
app.use(cookieParser());

app.use('', router);
app.use('/api/image', imageRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("server listening on port", PORT)
})
connectToDb();