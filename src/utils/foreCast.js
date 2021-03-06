const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=a15f6a942f504f9918c87dab10d1d0b3&query='+latitude+','+longitude

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('there was some error !!')
        }else if(body.error){
            callback('ooppss ....')
        }else{
            callback(undefined,{
                temperature:body.current.temperature,
                description:body.current.weather_descriptions[0],
                humidity:body.current.humidity
            })
        }
    })
}

module.exports = {forecast:forecast}
