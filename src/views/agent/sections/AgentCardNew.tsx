import React, { useState } from "react";
import StarRating from "../../../components/StarRaiting";
import { useRouter } from "next/navigation";

const AgentCardNew = ({ data }: any) => {
  const [userRating, setUserRating] = useState(4);
  const router = useRouter();
  const handleCardClick = () => {
    if (data?.toolkitName === "Analyse Agent") {
      router.push("/analyse");
    } else {
      router.push("/custom-agent");
    }
  };
  return (
    <div className="agent-card-border mt-4 " onClick={handleCardClick}>
      <div className="d-flex flex-column gap-4">
        <div className="photo-position">
          <div className="_root_awks5_19">
            <div className="_root__photo_awks5_39">
              <img
                className="agent-image"
                src={data?.toolkitDocumentation}
                alt="poster"
              />
            </div>
          </div>

          <p className="category-bg text-11-500 ">{data?.categoryName}</p>
          <img
            className="favorite-position pointer"
            src="/agent/favorite-icon.svg"
          />
        </div>
        <div className="d-flex justify-content-between flex-wrap gap-3">
          <StarRating rating={userRating} onChange={setUserRating} />
          {!data?.isBuy && <p className="price-bg">{data?.price} SOL</p>}
        </div>

        <p className="text-17-500 ">{data?.toolkitName}</p>
        <p className="text-14-400 description-height">
          {data?.toolkitDescription}
        </p>

        <div className="agent-divider" />

        <div className="d-flex gap-2 flex-wrap justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <img src="/agent/owner-icon.svg" />
            <p className="text-14-400 gray">
              Agent Owner:{" "}
              {data?.ownerWallet
                ? `${data.ownerWallet.slice(0, 3)}...${data.ownerWallet.slice(
                    -3
                  )}`
                : ""}
            </p>
          </div>
          <button className="button-purple">Explore</button>
        </div>
      </div>
    </div>
  );
};

export default AgentCardNew;
