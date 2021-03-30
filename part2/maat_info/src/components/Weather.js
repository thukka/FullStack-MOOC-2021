import react, { useEffect, useState } from 'react'
import axios from 'axios'

const WeatherImage = (props) => {
    return (
        <img src={props.image[0]} />
    )
}

const Weather = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
    const [isBusy, setBusy] = useState(true)

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.name}`)
            .then(response => {
                let weather_data = response
                setWeather(weather_data)
                setBusy(false)
            })
    }, [])

    console.log(weather)
    if (!isBusy) {
        return (
            <>
                <h2>Weather in {props.name}</h2>
                <p>
                    temperature (c): {weather.data.current.temperature} <br />
                    <WeatherImage image={weather.data.current.weather_icons} />
                </p>
            </>
        )
    } else {
        return <p> Loading weather data </p>
    }
}


export default Weather