import React, { useState } from "react";

import "./App.css";

import Header from "./components/header";
import ProductDetail from "./pages/productDetail";
import ProductList from "./pages/productList";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header openModal={openModal} setOpenModal={setOpenModal} />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
