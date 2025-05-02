const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const connectDb = require("./config/db")
const port = 1234

const app = express()
connectDb();

app.use(cors())
app.use(express.json()); // for parsing application/json

const route=require("./routes/authroutes")
app.use("/api",route)

app.use("/api",route)

app.use("/api",route)

app.use("/api",route)

app.use("/api",route)

// app.use(cors({
//     origin: "http://localhost:5173"

// }));











app.listen(port, () => {
    console.log("server started");

})
// http://localhost/1234/api/signup