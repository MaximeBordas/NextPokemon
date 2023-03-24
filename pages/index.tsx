import { PokemonList } from "@/types";
import useSWR from "swr";

type pokemonResponse = {
  count: number;
  next: string;
  previous?: string;
  results: PokemonList[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Pokemon = (): JSX.Element => {
  const { data, error, isLoading } = useSWR<pokemonResponse>(
    "https://pokeapi.co/api/v2/pokemon",
    fetcher
  );

  const pokemon = data?.results;
  if (data) {
  }
  if (isLoading) {
    <div>Loading...</div>;
  }

  if (error) {
    <div>{error}</div>;
  }
  return (
    <>
      {pokemon?.map(({ name }: PokemonList) => (
        <p key={`pkmn-${name}`}>{name}</p>
      ))}
    </>
  );
};

export default Pokemon;
