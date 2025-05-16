import React, { useState } from "react";

const CategoryButtons = ({ selectCategory, setSelectCategory }: any) => {
  const categories = [
    {
      id: 1,
      categoryName: "All",
    },
    {
      id: 2,
      categoryName: "Nft",
    },
    {
      id: 3,
      categoryName: "Defi",
    },
    {
      id: 4,
      categoryName: "Finance",
    },
  ];
  return (
    <div className="d-flex gap-4 flex-wrap">
      {categories.map((item: any, index) => (
        <div
          onClick={() => setSelectCategory(item.categoryName)}
          className={`agent-category-tabs ${
            item.categoryName === selectCategory && "active"
          } `}
          key={index}
        >
          <p>{item?.categoryName}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryButtons;
