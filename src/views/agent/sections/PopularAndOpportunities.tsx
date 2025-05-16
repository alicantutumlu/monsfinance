import React from "react";

const PopularAndOpportunities = ({ title, data }: any) => {
  return (
    <div className="popular-card ">
      <p className="title-bg p-2">{title}</p>
      <div className="p-2">
        {data?.map((item: any, index: any) => (
          <>
            <div key={index} className="d-flex gap-3 mt-2 ">
              <div className="photo-position">
                <img className="card-photo" src={item?.image} />
                {item?.sale && (
                  <div className="sale-bg">
                    <p className="text-8 w600">%{item?.sale}</p>{" "}
                    <p className="text-6">Sale</p>
                  </div>
                )}
              </div>
              <div className="d-flex flex-column gap-2">
                <p className="text-14-400 w500">{item?.title}</p>
                <p className="text-10">{item?.description}</p>
              </div>
              <button className="button-purple text-10">Explore</button>
            </div>
            {index !== data.length - 1 && (
              <div className="agent-divider my-3" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default PopularAndOpportunities;
