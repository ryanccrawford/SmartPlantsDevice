var five = require("johnny-five")



function J5(cb) {
    var bord = this
    this.lightVal = 0.00
    this.soilVal = 0.00
    this.tempVal 
    board = new five.Board({ port: "COM8" })
   
    this.setLight = function(val) {
        this.lightVal = val
        draw()
    }
    this.setTemp = function(val) {
        this.tempVal = val
        draw()
    }
    this.setSoil = function(val) {
       this.soilVal = val
        draw()
    }
    draw = function(){
        console.clear()
        console.log("Light:" + this.lightVal)
        console.log("Soil:" + this.soilVal)
        console.log("Temp:" + this.tempVal)

    }
    board.on('ready', function () {

       
        console.log('five ready');
        var photoresistor = new five.Sensor("A0")
        var soilMoisture = new five.Sensor("A1")
        var tempsensor = new five.Thermometer({
            controller: "LM35",
            pin: "A2"
        })
        
        var relay = new five.Relay({
            pin: 2
        });
        photoresistor.on("data", function () {
            console.log("The Light Sensor data: " + this.value);
            bord.setLight(this.value)
        })
        soilMoisture.on("data", function () {
            console.log("Soil Moisture data: " + this.value);
            if (this.value > 250) {
                relay.close();
            } else {
                relay.open();
            }
            bord.setSoil(this.value)
        })
        tempsensor.on("data", function () {
            console.log("Temp data: " + this.value);
            bord.setTemp(this)
        })

        cb(this)

    })
}

module.exports = J5