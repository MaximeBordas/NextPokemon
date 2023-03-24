import { PokemonListType } from "@/types";
import useSWR from "swr";
import styles from "@/styles/modal.module.css";
import PokemonList from "./pokemonList";
import { useState } from "react";

type pokemonResponse = {
  count: number;
  next: string;
  previous?: string;
  results: PokemonListType[];
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Pokemon = (): JSX.Element => {
  const [urlApi, setUrlApi] = useState("https://pokeapi.co/api/v2/pokemon");
  const { data, error, isLoading } = useSWR<pokemonResponse>(urlApi, fetcher);

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
      <div className={styles.control_pagination}>
        {data?.previous && (
          <button
            onClick={() => {
              setUrlApi(data?.previous);
            }}
          >
            Previous
          </button>
        )}
        {data?.next && (
          <button
            onClick={() => {
              setUrlApi(data?.next);
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Pokemon;
