import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '..//assets/search.png'
import clear_icon from '..//assets/clear.png'
import cloud_icon from '..//assets/cloud.png'
import drizzle_icon from '..//assets/drizzle.png'
import humidity_icon from '..//assets/humidity.png'
import wind_icon from '..//assets/wind.png'

const Weather = () => {

    const[city, setCity] = useState("");
    const[weatherData, setWeatherData] = useState(false);
    const[error, setError ] = useState("");

    const search = async(city) => {
        if(!city){
            setError("Please Enter a City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                setError("City Not Found");
                return;
            }
            // console.log(data);
            setError("");
            setWeatherData({
                humidity : data.main.humidity,
                windSpeed : (data.wind.speed * 3.6).toFixed(1),
                temperature : Math.round(data.main.temp),
                location : data.name,
                icon : `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

            });
            setCity("");
        } catch (error) {
            
        }
    }

    useEffect(()=> { 
     search("Karachi")   
    },[])
  return (
    <div className='weather'>
        <div className="search_bar">
            <input type='text' 
            placeholder='Search City Name' 
            value={city} 
            onChange={(e)=>{setCity(e.target.value)}}
            onKeyDown={(e) => e.key==="Enter" && search(city)}
            ></input>
            <img src={search_icon} alt='' onClick={() => search(city)}></img>
        </div>

        {error && <p className="error">{error}</p>}

        <img src={weatherData.icon} className='weather_icon'></img>
        <p className='temperature'>{weatherData.temperature}°C </p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather_data">
            <div className="col">
                <img src={humidity_icon}></img>
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
                
            </div>
             <div className="col">
                <img src={wind_icon}></img>
                <div>
                    <p>{weatherData.windSpeed}km/hr</p>
                    <span>Wind Speed</span>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Weather