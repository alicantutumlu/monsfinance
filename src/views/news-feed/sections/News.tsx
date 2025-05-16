import React from "react";

const News = ({ data, onSelect, selectedIndex }: any) => {
  return (
    <div className="w-100 mt-4">
      {data?.map((item: any, index: any) => (
        <div
          key={index}
          className={`d-flex gap-4 mt-4 p-3 news-card ${
            selectedIndex === index ? "selected-card" : ""
          }`}
        >
          <div className="photo-position">
            <img className="card-photo" src={item?.image} />
          </div>
          <div className="d-flex flex-column justify-content-between gap-2 w-100">
            <div>
              <div className="d-flex justify-content-between w-100">
                <p className="text-14-400 w500">{item?.title}</p>
                <p className="text-10">{item?.date}</p>
              </div>
              <p className="text-12 input-color mt-1">
                {" "}
                {item?.description.split(" ").slice(0, 40).join(" ")}
                {item?.description.split(" ").length > 40 && "..."}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="d-flex gap-2">
                {item?.category?.map((cat: any, index: any) => (
                  <span key={index} className="category">
                    {cat}
                  </span>
                ))}
              </div>
              <div
                className="d-flex gap-2 justify-content-center align-items-center details-wrapper"
                onClick={() => onSelect?.(index)}
                style={{ cursor: "pointer" }}
              >
                <p className="text-14-400">View Details </p>

                <div className="arrow">
                  <div className="arrow-top"></div>
                  <div className="arrow-bottom"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
