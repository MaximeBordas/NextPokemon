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
  const height = data?.height / 0.1;
  const weight = data?.weight / 10;
  return show ? (
    <div className={styles.modal}>
      <div className="modal_body">
        <picture>
          <img
            src={data?.sprites?.front_default}
            alt={data?.name}
            width="96"
            height="96"
          />
        </picture>

        <div className={styles.description}>
          <p> Name : {data?.name}</p>
          <p> Height: {height} cm</p>
          <p>Weight: {weight} Kg</p>
          <p>Type :</p>
          {data?.types.map(({ type }: TypePokemon) => (
            <p key={`pkmn-type-${type.name}`}>{type.name}</p>
          ))}
          <button onClick={() => closeModal()}>Close</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
