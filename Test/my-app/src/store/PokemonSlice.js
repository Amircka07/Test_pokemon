import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const axiosApi = createAsyncThunk(
  "createPokemon",
  async function (_, { dispatch }) {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=6"
    );
    const pokemons = await Promise.all(
      response.data.results.map(async (info) => {
        const details = await axios.get(info.url);
        return {
          name: details.data.name,
          sprites: details.data.sprites.other.dream_world.front_default || "",
        };
      })
    );
    dispatch(getPokemon(pokemons));
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
  },
  reducers: {
    getPokemon: (state, action) => {
      state.pokemons = action.payload;
    },
  },
});

export const { getPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
