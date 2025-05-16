import React from "react";

const SelectedNews = ({ data }: any) => {
  return (
    <div className="w-100 mt-4">
      <div className="d-flex gap-4 mt-2 p-3 news-selected-card">
        <div className="d-flex flex-column gap-2 w-100">
          <div className="photo-position d-flex justify-content-center">
            <img className="card-photo" src={data?.image} />
          </div>
          <div className="d-flex justify-content-between align-items-center gap-3 mt-2 w-100">
            <p className="text-14-400 w500">{data?.title}</p>
            <p className="text-10" style={{ minWidth: "max-content" }}>
              {data?.date}
            </p>
          </div>
          <p
            className="text-12 input-color"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {data?.description}
          </p>
          <div className="d-flex gap-2">
            {data?.category?.map((cat: any, index: any) => (
              <span key={index} className="category">
                {cat}
              </span>
            ))}
          </div>
          <div className="d-flex gap-2 flex-wrap justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img src="/agent/owner-icon.svg" />
              <p className="text-14-400 ">Agent Owner</p>
            </div>
            <button className="button-purple">Read</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedNews;
