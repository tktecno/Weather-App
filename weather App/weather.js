import React, { useEffect, useState } from 'react'
import "./style.css";

// https://github.com/thapatechnical/reactjsByThapaTechnical/tree/main/src/components/weather
// `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a8ea071e0ab932a13e387090ac8adb6`;

export const Weather = () => {

    const [city, setcity] = useState("");
    const [state, setState] = useState(null)

    const getWeatherInfo = async (e)=>{
        if(e.key === "Enter"||e.type==="click"||e==="enter")
        {
            try {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a8ea071e0ab932a13e387090ac8adb6`;
            const res = await fetch(url);
            const data = await res.json();
            // console.log(state?.wind?.speed? state.wind.speed:"NONE");
            if(res.ok){
                setState(data);
            }else{
                setState(null);
            }
        } catch (error) {
            setState(null);
            
        }

    }}

    useEffect(()=>{
        getWeatherInfo("enter");
    },[])


    const getTIme = (e)=>{

        if(!e)
        {
            return "--";
        }
        
        return new Date(e*1000).toLocaleTimeString();

    }


    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="text" 
                    placeholder='Search...' id="search" 
                    className="searchTerm"
                    value={city}
                    onChange={(e)=> setcity(e.target.value)}
                    onKeyDown={getWeatherInfo}
                    
                    />

                    <button className="searchButton" type='button'
                    onClick={getWeatherInfo}>Search</button>
                </div>
            </div>

            <article className="widget">
                <div className="weatherIcon">
                <img
  src={`https://openweathermap.org/img/wn/${state?.weather?.[0]?.icon}@4x.png`}
  alt={state?.weather?.[0]?.description || "weather icon"}
  style={{ width: "150px", height: "150px" }} // you can adjust size as needed
/>


                </div>
                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{state?.main?.temp? `${Math.round(state.main.temp-273.15).toFixed(2)}`:"--"}</span>
                    </div>
                    <div className="description">
                        <div className="weatherCondition">{state?.weather[0]?.main? `${state.weather[0].main}`: "--"}</div>
                        <div className="place"> {state?.name? state.name:"--"} </div>
                    </div>
                </div>
                    <div className="date">{new Date().toLocaleDateString()}</div>
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p>
                                <i className="wi wi-sunset"></i>
                            </p>
                            <p className="extra-info-leftside">{getTIme(state?.sys?.sunset? state.sys.sunset:"")} 
                            <br />Sunset</p>
                        </div>
                        <div className="two-sided-section">
                            <p>
                                <i className="wi wi-humidity"></i>
                            </p>
                            <p className="extra-info-leftside">{state?.main?.humidity? state.main.humidity:"--"} <br />humidity</p>
                        </div>
                    </div>
                    <div className="two-sided-section">

                        <div className="two-sided-section">
                            <p>
                                <i className="wi wi-rain"></i>
                            </p>
                            <p className="extra-info-leftside">{state?.main?.pressure? state.main.humidity:"--"} <br />Pressure</p>
                        </div>
                        <div className="two-sided-section">
                            <p>
                                <i className="wi wi-strong-wind"></i>
                            </p>
                            <p className="extra-info-leftside">{state?.wind?.speed? state.wind.speed:"--"} <br />Speed</p>
                        </div>
                    </div>
                </div>
            </article>

        </>
    )
}

export default Weather;
