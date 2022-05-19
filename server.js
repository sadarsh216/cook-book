const express = require("express");
require("dotenv/config");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute  = require("./routes/auth");
const recipeRoute = require("./routes/recipe");
const reviewRoute = require("./routes/review");


const port = process.env.PORT;
const connection_url = process.env.DB_CONNECTION_URL;

mongoose.connect(connection_url,{useNewUrlParser: true},()=>{
    console.log("Connected to mongo db")
})
app.use(
    cors({
        origin:"*"
    })
)
app.use(express.json());
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/', express.static(__dirname + '/client/cook-book/build'));
app.use("/recipe", recipeRoute);
app.use("/auth", authRoute);
app.use("/review", reviewRoute);


app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
