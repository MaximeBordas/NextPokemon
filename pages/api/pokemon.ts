import { PokemonList } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const fetchPokemonList = async (): Promise<PokemonList[]> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
  const { results } = await res.json();
  return results;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonList[]>
) {
  fetchPokemonList().then((pkmn) => res.status(200).json(pkmn));
}
