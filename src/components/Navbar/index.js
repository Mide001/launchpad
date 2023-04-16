import BigNumber from "bignumber.js";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/manoswap.png";
import "../../App.css";
import { clearCache, connect } from "../../redux/blockchain/blockchainActions";
import * as s from "../../styles/global";

const Navigation = () => {
  const dispatch = useDispatch();
  const { account, FeeToken } = useSelector((state) => state.blockchain);
  const {
    ETHamount,
    FeeTokenamount,
    FeeTokenSymbol,
  } = useSelector((state) => state.data);

  const mockCompanyLogo = logo;

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ margin: 15 }}>
      <Container style={{ maxWidth: "100%" }}>
        {!mockCompanyLogo ? (
          <s.TextTitle style={{ fontSize: "24px" }}>
            <s.Card
              style={{
                padding: 10,
                margin: 0,
                paddingLeft: 20,
                paddingRight: 20,
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              YourTextLogo
            </s.Card>
          </s.TextTitle>
        ) : <s.LogoTitle src={mockCompanyLogo} />
        }
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
             {/* <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
      </LinkContainer> */ }
            <LinkContainer to="/launchpad">
              <Nav.Link><s.TextBlack>Launchpad</s.TextBlack></Nav.Link>
            </LinkContainer>
            {
              process.env.REACT_APP_ENABLE_LOCKER === 'true' &&
              <LinkContainer to="/locker">
                <Nav.Link><s.TextBlack>Locker</s.TextBlack></Nav.Link>
              </LinkContainer>
            }

            <LinkContainer to="/createIDO">
              <Nav.Link><s.TextBlack>Create IDO</s.TextBlack></Nav.Link>
            </LinkContainer>

            <LinkContainer to="/lock">
              <Nav.Link style={{ color: "red" }}><s.TextBlack>Create Lock</s.TextBlack></Nav.Link>
            </LinkContainer>

            <LinkContainer to="/account">
              <Nav.Link><s.TextBlack>Account</s.TextBlack></Nav.Link>
            </LinkContainer>

           
          </Nav>
          <Nav>
            <Nav.Link><s.TextBlack>{process.env.REACT_APP_CURRENCY} {ETHamount / 10 ** 18}</s.TextBlack></Nav.Link>
           
          </Nav>
          <s.Container ai="center">
            {account == null ? (
              <s.button
                onClick={() => {
                  dispatch(connect());
                }}
              >
                CONNECT
              </s.button>
            ) : (
              <s.button
                className="address text-collapse"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(clearCache());
                }}
              >
                {account}
              </s.button>
            )}
          </s.Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
