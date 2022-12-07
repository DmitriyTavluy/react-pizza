import React from "react";

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  setCategoryId,
}) => {
  const categoriesArray = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((categoriesValue, index) => (
          <li
            key={categoriesValue}
            onClick={() => setCategoryId(index)}
            className={categoryId === index ? "active" : ""}
          >
            {categoriesValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
