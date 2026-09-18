import React, { useState } from 'react'




const Myapp = () => {
  const [search,setSearch]=useState()
  const [weather,setWeather]=useState(null)
  const [error,setError]=useState("")
  const Key="5c4edb830d77ded6b8e54a7385e56736"
  const API=""
  const handle=(event)=>{
    setSearch(event.target.value)
    console.log(event.target.value)
  }
const fetchWeather=async()=>{
  if(!search){
    setError("Please enter the city")
    return
  }
  setError("")
  try{
    const response=await fetch(`https://api.openweathermap.org/data/2.5/find?q=${search}&appid=${Key}&unites-metric`)
    console.log(response,"res");
    const data=await response.json()
    console.log("Data",data);
    
    if(data.count >0){
      console.log(data.list[0]);
      setWeather(data.list[0])
    }
    else{
      setError("city not found")
    }
  }catch(error){
   console.log("Error",error);
   
  }
}
  return (
    <>
    <div className='full-box'>
      <h2 className='app'> 🌤️Weather App</h2>
    <div className='container'>
     <div className='inputs'>
      <input type="text" placeholder='Enter city'onChange={handle} /></div> 
      <button onClick={fetchWeather}>Search</button>
      {error && <p className='error'>{error}</p>}
      {weather && (
        <div className='weather-card'>
          <h1 className='city'>
            {weather.name},{weather.sys.country}
          </h1>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon" className='weather-icon' />
           <p className='des'>{weather.weather[0].description}</p>
          <p className='temprature'>🌡️Temprature:{Math.round(weather.main.temp)} °C</p>
          <p> 🌡️Feels like:{Math.round(weather.main.feels_like)} °C</p>
         
          <p >💧Humidity:{weather.main.humidity}%</p>
          <p> 💨wind speed:{weather.wind.speed}m/s</p>
        </div>
     
      )
       
      }
    </div>
     </div>
       
        </>
  )
}

export default Myapp