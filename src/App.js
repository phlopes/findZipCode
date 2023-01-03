import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './styles.css';

function App() {

  const [input, setInput] = useState('');
  const [data, setData] = useState({});

  async function handleSearch() {
    if(!input){
      alert("Enter a valid zip code");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setData(response.data);
    } catch {
      alert("Try again! Zip cod not found.");
      setInput('');
    }
  } 

  return (
    <div className="container">
      <h1 className="title">Zip Code Finder</h1>

      <div className="input">
        <input
          type="text"
          placeholder="Type your zip code..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(data).length > 0 && (
        <main className="main">
          <h2>CEP: {data.cep}</h2>

          <span>PLACE: {data.logradouro}</span>
          <span>DISTRICT: {data.bairro}</span>
          <span>CITY/STATE: {data.localidade}/{data.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
