const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-anupam:av1234@cluster0.p8kmqip.mongodb.net/queryDB");

const querySchema = new mongoose.Schema({
    fullName : String,
    email: String,
    phone: String,
    site: String
});

const Query = new mongoose.model("query",querySchema);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const name = req.body.FullName;
    const id = req.body.email;
    const phno = req.body.phone;
    const website = req.body.site;

    const newQuery = Query({
        fullName: name,
        email: id,
        phone: phno,
        site: website
    });

    newQuery.save();

    res.redirect("/");

});


app.listen(process.env.PORT||3000,function(){
    console.log("Server started on port 3000.");
})