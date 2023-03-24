import { useState } from "react";
import { fetcher } from ".";
import useSWR from "swr";
import Image from "next/image";
import { TypePokemon } from "@/types";
import styles from "@/styles/modal.module.css";

const PokemonList = ({ url }: { url: string }) => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  const openModal = () => {
    setIsOpen(true);
    console.log(isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    <div>Loading...</div>;
  }

  if (error) {
    <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.card} onClick={openModal}>
        <Image
          src={data?.sprites?.front_default}
          alt={data?.name}
          width="96"
          height="96"
        />
        <p>{data?.name}</p>
      </div>

      <div className={styles.modal}>
        <div className="modal_body">
          <Image
            src={data?.sprites?.front_default}
            alt={data?.name}
            width="96"
            height="96"
          />
          <p>{data?.name}</p>
          <p>{data?.height}</p>
          <p>{data?.weight}</p>
          {data?.types.map(({ type }: TypePokemon) => (
            <p key={`pkmn-type-${type.name}`}>{type.name}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default PokemonList;
