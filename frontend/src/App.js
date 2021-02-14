import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from "react-bootstrap";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/home-page";
import ProductPage from "./pages/product-page";
import CartPage from "./pages/cart-page";
import LoginPage from "./pages/login-page";
import RegistrationPage from "./pages/registration-page";
import ProfilePage from "./pages/profile-page";
import CheckoutPage from "./pages/checkout-page";
import OrderPage from "./pages/order-page";
import UsersPage from "./pages/admin/users-page";
import ProductsPage from "./pages/admin/products-page";
import CreateUpdateProductPage from "./pages/admin/create-update-product-page";
import Auth from "./hoc/auth";

const App = () => {

  return (
    <Router>
      <Header/>
        <main className="py-3">
          <Container>
            <Switch>
              <Route exact path="/" component={Auth(HomePage)}/>
              <Route exact path="/products/:id" component={Auth(ProductPage)}/>
              <Route exact path="/cart" component={Auth(CartPage)}/>
              <Route exact path="/register" component={Auth(RegistrationPage)}/>
              <Route exact path="/login" component={Auth(LoginPage)}/>
              <Route exact path="/profile" component={Auth(ProfilePage, true)}/>
              <Route exact path="/checkout" component={Auth(CheckoutPage, true)}/>
              <Route exact path="/order/:id" component={Auth(OrderPage, true)}/>
              <Route exact path="/admin/users" component={Auth(UsersPage, true, true)}/>
              <Route exact path="/admin/products" component={Auth(ProductsPage, true, true)}/>
              <Route exact path="/admin/products/create-update/:id?" component={Auth(CreateUpdateProductPage, true, true)}/>
            </Switch>
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
