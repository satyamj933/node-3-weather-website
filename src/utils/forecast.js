const request=require('request')

const forecast = (latitude,longitude,callback) => {

const url='http://api.weatherstack.com/current?access_key=b604e4cd55a9fb935ecf99b39849a1ce&query=' + longitude + ',' + latitude + '&units=m'

request({url,json : true},(error,{body}) => {
     if (error){
         callback('Unable to connect to weather service!',undefined)
     }else if (body.error) {
         console.log('Unable to find location',undefined)
     }else{
     callback(undefined,body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '.')
     }
 })

}

module.exports=forecast