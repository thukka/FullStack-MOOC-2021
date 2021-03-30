import React, { useState } from 'react'
import Weather from './Weather'

const ListLanguage = ({ language }) => <li>{language}</li>

const ListFlag = ({ flag, country }) => {
    return <img src={flag} width="350" height="200" alt={`Flag of ${country}`} />
}

const CountryBasicInfo = ({ countryName }) => {
    return (
        <div>
            <h1>{countryName.name}</h1>
            <p>capital {countryName.capital}</p>
            <p>population {countryName.population}</p>
            <h2>languages</h2>
            <ul>
                {countryName.languages.map(i =>
                    <ListLanguage key={i.name} language={i.name} />
                )}
            </ul>
            <ListFlag flag={countryName.flag} country={countryName.name} />
            <Weather name={countryName.name} />
        </div>
    )
}

const ListCountry = ({ countries, filterName, setFilterName }) => {
    const countryName = countries.filter(i => i.name.toLowerCase().includes(filterName.toLowerCase()))

    if (countryName.length > 10) {
        return 'Too many matches, specify another filter'
    }

    if (countryName.length === 1) {
        return <CountryBasicInfo countryName={countryName[0]} />
    }

    return countryName.map(i => {
        return (
            <div key={i.name} >
                <p>{i.name} <button onClick={() => {setFilterName(i.name)}}>show</button>
                </p>
            </div>
        )
    })

}

export default ListCountry