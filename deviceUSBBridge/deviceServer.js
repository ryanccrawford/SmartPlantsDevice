//Install this on the server and start it first. 
//Then Install the other files onto the client.
//On the client update the settings file to put the ip or dns name of the server

const express = require("express")
var app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(PORT, function () {
    console.log("Server listening on PORT: " + PORT)
})
var PORT = process.env.PORT || 8080;
app.post("/", function (req, res) {
    var data = req.body
    if(data){
        console.log(data)
        res.json(data)
    }
})
