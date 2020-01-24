const request = require('request');


const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/23ccb86d5ca7665817dc3c11604823d6/' + lat + ',' + long + '?units=si';
    console.log(url)

    request({url, json: true},(error,{body}) => {
        if(error){
        callback('Unable to connect to the web services',undefined);
        }else if(body.error){
            callback('Unable to find location',undefined);
        }else{
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is ' 
            + body.currently.precipProbability + '% chance of rain. ' + 'Min Temperature: ' + body.daily.data[0].temperatureMin
            + 'Max Temperature: ' + body.daily.data[0].temperatureMax);   
        }
    })
}

module.exports = forecast;