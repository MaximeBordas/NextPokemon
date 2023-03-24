import Image from "next/image";
import { TypePokemon } from "@/types";
import styles from "@/styles/modal.module.css";

const Modal = ({
  show,
  data,
  closeModal,
}: {
  show: boolean;
  data: any;
  closeModal: () => void;
}) => {
  return show ? (
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
      <button onClick={() => closeModal()}>Close</button>
    </div>
  ) : null;
};

export default Modal;
