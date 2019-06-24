var request = require('request');

function res(johnnyObj, serviceURL) {
    var temp = johnnyObj.tempVal
    var soil = johnnyObj.soilVal
    var light = johnnyObj.lightVal
    var relay = "off"
    var data = { temp: temp, soil: soil, light : light}
    console.log(serviceURL)
    return request({
        method: 'POST'
        , uri: serviceURL
        , multipart:
            [{
                'content-type': 'application/json'
                , body: JSON.stringify(data)
            }]
    }, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        
    });
}


module.exports = res


