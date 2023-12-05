import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/Auth-Context";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        {authCtx.isLoggedIn && <h1 className="text-light" style={{marginLeft:"10px"}}>Shop</h1>}
        <Nav className={authCtx.isLoggedIn ? "mx-auto":"d-flex align-items-center"}>
          {!authCtx.isLoggedIn && <div className="mx-5 text-light">
            <h1>Shop</h1>
          </div>}

          {authCtx.isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/Home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                Product
              </Nav.Link>
              <Nav.Link as={Link} to="/About">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/Contact">
                Contact
              </Nav.Link>
            </>
          )}
        </Nav>

        <Nav className="ml-auto rounded-2" style={{marginRight:"10px"}}>
          {!authCtx.isLoggedIn && (
            <Nav.Link as={Link} to="/Auth" style={{borderColor: "#007bff",padding:"10px", marginRight:"10px",font:"20px"}}>
              Login
            </Nav.Link>
          )}

          {authCtx.isLoggedIn && (
            <>
              <div className=" p-2 m-2 bg-gradient rounded-2" style={{ borderColor: "#007bff" }}>
                <Cart />
              </div>
              <button className="btn btn-outline-light m-2" onClick={logoutHandler}>
                Logout
              </button>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
