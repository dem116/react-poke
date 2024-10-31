import React, { useState, useEffect } from 'react';
import styles from './components/formulario.module.css';
import card from './components/cardPokemon.module.css'
import './App.css';

function App () {

  const [pokemonFind, setpokemonFind] = useState(''); 
  const [pokemon, setPokemon] = useState(null); 
  const [loading, setLoading] = useState(false);     
  const [error, setError] = useState(null);   

  useEffect(() => {
    if (!pokemonFind) return; 
    
    const fetchPokemon = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonFind.toLowerCase()}`);
            if (!response.ok) throw new Error("Pokémon no encontrado");
            const data = await response.json();
            setPokemon(data);
        } catch (err) {
            setError(err.message);
            setPokemon(null);
        } finally {
            setLoading(false);
        }
    };

    const delayDebounceFn = setTimeout(() => {
        fetchPokemon();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
}, [pokemonFind]);

  return (
  <>
      <h1>Buscar un Pokemon</h1>
        <form onSubmit={(e) => e.preventDefault()} className={styles.formulario}>
        <label htmlFor="buscarPokemon">Introduce el nombre del pokemon: </label>
            <input
                type="text"
                placeholder="Ejemplo: pikachu"
                value={pokemonFind}
                onChange={(e) => setpokemonFind(e.target.value)}
            />
        </form>

        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {pokemon && (
            <div className={card.cardPokemon}>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>Peso: {pokemon.weight}</p>
                <p>Altura: {pokemon.height}</p>
            </div>
        )}
  </>
  );
}


export default App;
