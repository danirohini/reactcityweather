import React, { useEffect, useState } from 'react';
import "./style.css";
import WeatherCard from './WeatherCard';

const Temp = () => {
    const [ searchValue, setSearchValue] = useState("Pune");
    const [tempInfo, setTempInfo] = useState({})       
    const getWeatherInfo =async ()=>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=21d08b1ca18d3f3147c6afc1ecbb1c62`
            let res = await fetch(url);
            let data = await res.json();
            const {temp, pressure, humidity } = data.main;
            const {name} = data;
            const {main: weathermood}= data.weather[0];
            const {speed} = data.wind;
            const {country, sunset} =data.sys;
            const myWeatherInfo ={
                temp,
                pressure,
                humidity,
                name,
                weathermood,
                speed,
                country,
                sunset,
            }
            setTempInfo(myWeatherInfo)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{getWeatherInfo()},[])
  return (
    <>
    <div className='wrap'>
        <div className='search'>
            <input type="text" placeholder='Search' className='searchTerm' value={searchValue} 
            onChange={(e)=>setSearchValue(e.target.value)}/>
            <button className='searchButton' onClick={getWeatherInfo}>Search</button>
        </div>
    </div>
   <WeatherCard {...tempInfo}/>
    </>
  )
}

export default Temp
