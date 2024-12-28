import React, { useEffect } from "react";
import "./Pokemon.css";
import { useDispatch, useSelector } from "react-redux";
import { axiosApi } from "./store/PokemonSlice";

const PokemonList = () => {
  const { pokemons } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(axiosApi());
  }, [dispatch]);

  return (
    <div className="parent">
      <div className="cards_pokemon">
        {pokemons &&
          pokemons.map((pokemon) => (
            <div className="pokemon">
              <img src={pokemon.sprites} alt={pokemon.name} />
              <h3 className="pokemon_name">{pokemon.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PokemonList;
