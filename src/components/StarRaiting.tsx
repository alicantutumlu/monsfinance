import React from "react";
import StarRatings from "react-star-ratings";

interface StarRatingProps {
  rating: number;
  onChange?: (newRating: number) => void;
  starSize?: string;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onChange,
  starSize = "14px",
  readOnly = false,
}) => {
  return (
    <>
      <div className="d-flex gap-2 align-items-center">
        <p style={{ marginTop: "1px" }} className="text-14-400 purple w500 ">
          {rating}
        </p>
        <StarRatings
          rating={rating}
          starRatedColor="#7103D9"
          starHoverColor="#7103D9"
          changeRating={readOnly ? undefined : onChange}
          numberOfStars={5}
          starDimension={starSize}
          starSpacing="4px"
          name="rating"
        />
        <p className="text-13-400 mt-1">(1991)</p>
      </div>
    </>
  );
};

export default StarRating;
