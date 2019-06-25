const five = require("johnny-five");
const request = require('request');


function J5(confg, cb) {
    
    this.lightVal = 0
    this.soilVal = 0
    this.tempVal = 0 
    this.config = confg
    this.serviceURL = 'http://' + this.config[0].REMOTE_SERVER + ':' + this.config[1].REMOTE_SERVER_PORT
    this.interval = parseInt(this.config[4].TIME_INTERVAL)
    this.setLight = function(val) {
        this.lightVal = val
        
    }
    this.setTemp = function(val) {
        this.tempVal = val
        
    }
    this.setSoil = function(val) {
       this.soilVal = val
       
    }
    this.draw = function(){
        console.clear()
        console.log("Light:" + bord.lightVal)
        console.log("Soil:" + bord.soilVal)
        console.log("Temp:" + bord.tempVal)

    }
    this.timer = function () {
      setInterval(this.loop, this.interval);
    }
   this.loop = function () {
      
    
       var data = { temp: bord.tempVal, soil: bord.soilVal, light: bord.lightVal }
     return  request.post({ uri: bord.serviceURL, multipart: [{ 'content-type': 'application/json', body: JSON.stringify(data) }] }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred
            }
         if (response && response.statusCode) {
             console.log(response); // Print the response status code if a response was received

             if (body) {
                 var commands = JSON.parse(body)
                 if (commands.relay) {
                     bord.relay(commands.relay)
                 }
                 if (commands.led) {
                     bord.led(commands.led)
                 }
                 if (commands.lcd) {
                     bord.lcd(commands.lcd)
                 }
             }
         }
        }
        )
    }
    var bord = this;
    board = new five.Board({ port: "COM8" })

    setInterval(this.draw, 2000)

    board.on('ready', function () {

       
        console.log('five ready');
        var photoresistor = new five.Sensor("A0")
        var soilMoisture = new five.Sensor("A1")
        var tempsensor = new five.Thermometer({
            controller: "LM35",
            pin: "A2"
        })
        
     //   var relay = new five.Relay({
    //        pin: 2
    //    });
     //   function r(state) {
         //   if (state === "open") {
              //  relay.open();
         //   } else {
               // relay.close();
          //  }
     //   }

        photoresistor.on("data", function () {
            bord.setLight(this.value)
        })
        soilMoisture.on("data", function () {
            if (this.value > 250) {
               // r("close");
            } else {
              //  r("open");
            }
            bord.setSoil(this.value)
        })
        tempsensor.on("data", function () {
            bord.setTemp(this.F/2)
        })

      
        cb()
        
      
    })
    

}




module.exports = J5