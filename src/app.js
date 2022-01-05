const path = require('path')
const express = require('express')
const hbs = require('hbs')
const foreCast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const forecast = foreCast.forecast
const geocode = geoCode.geocode

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')//imp to have this exact same
app.set('views',viewsPath)//changing default views path to customized one
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))


//route handlers
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Shubham Singh'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide a address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location }={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send(error)
            }

            res.send({
                forecast:"The current temperature is "+forecastData+" degree celsius",
                location,
                address:req.query.address
            })

        })

    })
    
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Shubham Singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help me',
        helpMe:'HELP YOURSELF BITCH !!'
    })
})

//404 route handler this needs to be last as it matches any route passed to it
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Shubham Singh',
        errorMessage: 'Page not found !!'
    })
})


//starting up the server
app.listen(port,()=>{
    console.log("server started running on port 3000" + port)
})