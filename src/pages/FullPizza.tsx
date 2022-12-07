import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62f17dabb1098f1508019344.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Произошла ошибка");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Img" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} p.</h4>
    </div>
  );
};

export default FullPizza;
