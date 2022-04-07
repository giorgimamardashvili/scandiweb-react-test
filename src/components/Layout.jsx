import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./navbar/Navbar";

export class Layout extends Component {
  render() {
    return (
      <Container>
        <Navbar />
        <Main>
          <Outlet />
        </Main>
      </Container>
    );
  }
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Main = styled.div`
  width: 100%;
  padding: 80px 0 55px 0;
`;

export default Layout;
