
const express = require("express")
var app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
var Configs = {}
const SF = require(__dirname + "/settingsFile.js")
const J5 = require(__dirname + "/device.js")
const RES = require(__dirname + "/client.js")



function set(settings) {
    Configs = settings
    console.log(Configs)
    var PORT = process.env.PORT || Configs[3].THIS_PORT

    app.listen(PORT, function () {
        console.log("Server listening on PORT: " + PORT)
        J5(loop)
    })
    
}


function loop(j5obj) {
    
    setInterval(function () {
        console.log(Configs[1].REMOTE_SERVER_PORT)
        var mac = 'http://' + Configs[0].REMOTE_SERVER + ':' + Configs[1].REMOTE_SERVER_PORT
        RES(J5, mac)
    }, 5000);

}

SF(set)

