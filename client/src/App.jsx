import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import ResultPage from "./pages/resultPage";
import Login from "./pages/Login";
import "./App.css";
import SignUp from "./pages/SignUp";
import CreateMeal from "./pages/CreateMeal";
import CheckoutPage from "./pages/CheckoutPage";
import EditMeal from "./pages/EditMeal";
import MealDetailPage from "./pages/MealDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ShoppingCartPage from "./pages/ShoppingCart";
import OrdersHistoryPage from "./pages/OrdersHistoryPage";
import Payment from "./pages/Payment/payment.jsx";
import OrderToPrepare from "./pages/OrderToPrepare";
import FavoritesPage from "./pages/FavoritesPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/shoppingCart" element={<ShoppingCartPage />} />
        <Route path="/my-orders" element={<OrdersHistoryPage />} />
        <Route path="/mealDetail/:mealId" element={<MealDetailPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/payment" element={<Payment />} />
        <Route path="/create-meal" element={<CreateMeal />} />
        <Route path="/edit-meal/:id" element={<EditMeal />} />
        <Route path="/order-to-prepare" element={<OrderToPrepare />} />
        <Route path="/favorite-chefs" element={<FavoritesPage />} />
      </Routes>
      <div></div>
    </>
  );
};

export default App;
