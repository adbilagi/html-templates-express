const express = require("express");
const httpMsgs = require("http-msgs");
const mixer = require("./mixer");

const  app = express();
app.listen(9000);

app.get("/", function(req, res){
    mixer.pageWideTemplate("index.html", req, res );
})

app.get("/about/:name/:dep", function(req, res){
    
    mixer.pageWideTemplate("about.html", req, res, req.params);
})