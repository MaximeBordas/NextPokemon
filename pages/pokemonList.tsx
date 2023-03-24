import { useState } from "react";
import { fetcher } from ".";
import useSWR from "swr";
import Image from "next/image";
import styles from "@/styles/modal.module.css";
import Modal from "./modal";

const PokemonList = ({ url }: { url: string }) => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

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
      <Modal show={isOpen} data={data} closeModal={closeModal} />
    </>
  );
};

export default PokemonList;
