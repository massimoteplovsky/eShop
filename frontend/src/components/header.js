import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {logoutUser} from "../actions/user/user-actions";

const Header = () => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector(({cart}) => cart);
  const {data: userData} = useSelector(({user}) => user.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
  }

  const userTemplate = (userData) => {
    const {firstname, lastname} = userData;
    return (
      <NavDropdown title={`${firstname} ${lastname}`} id="username">
        <LinkContainer to="/profile">
          <NavDropdown.Item><i className="fas fa-user"></i> Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </NavDropdown.Item>
        {
          userData.isAdmin && (
            <>
            <LinkContainer to="/admin/users">
              <NavDropdown.Item><i className="fas fa-users"></i> Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/products">
              <NavDropdown.Item><i className="fab fa-product-hunt"></i> Products</NavDropdown.Item>
            </LinkContainer>
            </>
          )
        }
      </NavDropdown>
    )
  };

  const authTemplate = () => {
    return (
      <>
        <LinkContainer to="/login">
          <Nav.Link><i className="fas fa-sign-in-alt"></i> Sign in</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/register">
          <Nav.Link><i className="fas fa-user"></i> Registration</Nav.Link>
        </LinkContainer>
      </>
    );
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link className={cartItems.length > 0 ? "cart-items" : ""}>
                  <i className="fas fa-shopping-cart"></i> Cart
                  <span className="items-count">({cartItems.length})</span>
                </Nav.Link>
              </LinkContainer>
              {userData ? userTemplate(userData) : authTemplate()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    )
}

export default Header;
