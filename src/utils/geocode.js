const request = require('request');


const geocode = (address,callback) => { 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoiYW5kcmV3MjAyMCIsImEiOiJjazR3NmtlaXcwMjJkM2ZtaHJvcXRhM29jIn0.naafFQskfd9s6PN5VqcCPA&limit=1';
    
    request({url: url, json: true}, (error,response) => {
        if(error){
            callback('Unable to find Geolocation Service!', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find Location, Try another search',undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;