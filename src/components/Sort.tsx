import React from "react";
import { selectFilterSortType, setSortType } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

type SortItem = {
  name: string;
  sort: string;
};
type PopupClick = MouseEvent & {
  path: Node[];
};

const sortArray: SortItem[] = [
  { name: "популярности(Desc)", sort: "rating" },
  { name: "популярности(Asc)", sort: "-rating" },
  { name: "цене(Desc)", sort: "price" },
  { name: "цене(Asc)", sort: "-price" },
  { name: "алфавиту(Desc)", sort: "title" },
  { name: "алфавиту(Asc)", sort: "-title" },
];

function Sort() {
  const dispatch = useDispatch();
  const sortType = useSelector(selectFilterSortType);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClickSortItem = (obj: SortItem) => {
    dispatch(setSortType(obj));
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortArray.map((sortValue) => (
              <li
                key={sortValue.name}
                onClick={() => onClickSortItem(sortValue)}
                className={sortType.sort === sortValue.sort ? "active" : ""}
              >
                {sortValue.name}
              </li>
            ))}
            {/*<li className="active">популярности</li>*/}
            {/*<li>цене</li>*/}
            {/*<li>алфавиту</li>*/}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
