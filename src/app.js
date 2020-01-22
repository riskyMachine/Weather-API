const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to work
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Mickey'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Mickey'
    })
})

app.get('/weather',(req,res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    //2nd param to callback of geocode has empty obj as default param (to destructured obj) to avoid TypeError
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){ 
                res.send({error});
            }else{
                 res.send({location,forecastData,address: req.query.address});
            }
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        email: 'abc@gmail.com',
        title: 'Help Page',
        name: 'Mickey'
    })
})

//Catch all for help 404
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:404,
        name: 'Mickey',
        errorMessage: 'Help article not found'
    })
})

//Catch all for all 404
//It has to be places after the all other routes
app.get('*',(req,res) => {
    res.render('404',{
        title: 404,
        name: 'Mickey',
        errorMessage: 'Page not found'
    })
})

app.listen(3000,() => {
    console.log('Listening on Port 3000')
})

