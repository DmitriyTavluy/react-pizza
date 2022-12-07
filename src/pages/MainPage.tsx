import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import {
  selectFilter,
  setCategoryId,
  setPageCount,
} from "../redux/slices/filterSlice";

const MainPage: React.FC = () => {
  const { categoryId, sortType, pageCount, searchValue } =
    useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzas);
  const dispatch = useDispatch();

  const changeCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };
  const getPizzas = async () => {
    const orderBy = sortType.sort.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sort.replace("-", "");
    const categoryBy = categoryId > 0 ? `category=${categoryId}` : "";

    dispatch(
      //@ts-ignore
      fetchPizzas({
        orderBy,
        sortBy,
        categoryBy,
        pageCount,
        searchValue,
      })
    );
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType.sort, searchValue, pageCount]);

  const pizzasMap = pizzas
    // .filter((value) => {
    //   return !!value.title.toLowerCase().includes(searchValue.toLowerCase());
    // }) Фильтрация через JS для небольших массивов данных
    .map((obj: any) => (
      <PizzaBlock
        key={obj.id}
        {...obj}
        // title={obj.title}
        // price={obj.price}
        // imageUrl={obj.imageUrl}
        // sizes={obj.sizes}
        // types={obj.types}
      />
    ));
  const skeletonMap = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={changeCategoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка<span>😕</span>
          </h2>
          <p>Не удалось получить данные с сервера</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletonMap : pizzasMap}
        </div>
      )}

      <Pagination pageCount={pageCount} setCurrentPage={onChangePage} />
    </div>
  );
};

export default MainPage;
