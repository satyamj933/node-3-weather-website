const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory for serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'weather app',
        name: 'Satyam Jaiswal'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Satyam Jaiswal'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        msg: 'ping me.',
        name: 'Satyam Jaiswal'
    })
})



app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided.'
        })
    }
    
        geocode(req.query.address, (error, {longitude,latitude,location} = {} ) => {
            if(error){
                return res.send( { error } )
            }
            
            forecast(longitude,latitude,(error,forecastData) => {
                if(error){
                    return res.send( { error } )                    
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
                
               
            })
        })
    })



app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Satyam Jaiswal',
        errorMessage: 'Help article not found.'
    })
})


app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
    




app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Satyam Jaiswal',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000,() => {
    console.log('Server is running on port 3000.')
})