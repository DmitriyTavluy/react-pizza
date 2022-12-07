//import React from "react";
// return React.createElement(
//     'div',
//     {className: 'Test'},
//     React.createElement('h1', null, 'Hello world in React.createElement')
// );

import "./scss/app.scss";
import MainPage from "./pages/MainPage";
import NotFindPage from "./pages/NotFindPage";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFindPage />} />
      </Route>
    </Routes>
  );
}

export default App;
