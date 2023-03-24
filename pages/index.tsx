import { PokemonListType } from "@/types";
import useSWR from "swr";
import styles from "@/styles/modal.module.css";
import PokemonList from "./pokemonList";

type pokemonResponse = {
  count: number;
  next: string;
  previous?: string;
  results: PokemonListType[];
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Pokemon = (): JSX.Element => {
  const { data, error, isLoading } = useSWR<pokemonResponse>(
    "https://pokeapi.co/api/v2/pokemon",
    fetcher
  );

  const pokemon = data?.results;

  if (isLoading) {
    <div>Loading...</div>;
  }

  if (error) {
    <div>{error}</div>;
  }
  return (
    <>
      <div className={styles.container}>
        {pokemon?.map(({ url }: PokemonListType) => (
          <PokemonList key={`pkmn-${url}`} url={url} />
        ))}
      </div>
    </>
  );
};

export default Pokemon;
