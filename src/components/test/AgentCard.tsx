import { useRouter } from "next/navigation";

const AgentCard = ({
  id,
  toolkitDocumentation,
  toolkitName,
  toolkitDescription,
}: any) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (toolkitName === "Analyse Agent") {
      router.push("/analyse");
    } else {
      router.push("/custom-agent");
    }
  };

  return (
    <label className="_root_awks5_19" onClick={handleCardClick}>
      <div className="_root__photo_awks5_39">
        <img
          className="_root__image_awks5_44 undefined"
          src={toolkitDocumentation}
          alt="poster"
        />
      </div>
      <h3 className="_title_awks5_56">{toolkitName}</h3>
      <p className="_description_awks5_67">{toolkitDescription}</p>
      <button
        id={`agent_${id}`}
        className="_root_1vhf2_1 _outline_1vhf2_32 _button_awks5_79 undefined _small_1vhf2_54"
        type="button"
        data-tooltip-id="">
        Check it out now!
      </button>
    </label>
  );
};

export default AgentCard;
