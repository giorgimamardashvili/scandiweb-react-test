import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Product from "./pages/Product";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path=":productId" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
