import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import ListCountry from './components/ListCountry'

function App() {

  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

  const inputHandleFilter = (event) => setFilterName(event.target.value)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        let maat = response.data
        setCountries(maat)
      })
  }, [])


  return (
    <div>
      <p>find countries <input value={filterName} onChange={inputHandleFilter} /> </p>
      <ListCountry countries={countries} filterName={filterName} setFilterName={setFilterName} />
    </div>
  );
}

export default App;
