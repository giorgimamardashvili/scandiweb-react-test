import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import cartIcon from "../../images/cartIcon.svg";

export class CartPreview extends Component {
  state = {
    open: false,
  };
  container = React.createRef();

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };
  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  render() {
    return (
      <Container ref={this.container}>
        <CartLogo onClick={this.handleClick}>
          <img src={cartIcon} alt="cart" />
        </CartLogo>
        {this.state.open && (
          <CartContainer>
            <Title>
              <ContainerName>My bag,</ContainerName>
              <Amount>2 items</Amount>
            </Title>
            <ul></ul>
            <TotalContainer>
              <p style={{ fontWeight: "500" }}>Total</p>
              <span style={{ fontWeight: "700" }}>1000</span>
            </TotalContainer>
            <TotalContainer>
              <Button to="/">View bag</Button>
              <CheckOut as="div">CHECK OUT</CheckOut>
            </TotalContainer>
          </CartContainer>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
`;
const CartLogo = styled.div`
  margin-left: 20px;
`;
const CartContainer = styled.div`
  background-color: #fff;
  position: absolute;
  padding: 20px 15px;
  right: 0;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;
const ContainerName = styled.h2`
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
`;
const Amount = styled.span`
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
`;
const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 43px;
  background: #ffffff;
  border: 1px solid #1d1f22;
  font-weight: 600;
`;
const CheckOut = styled(Button)`
  border: none;
  background: #5ece7b;
  color: white;
`;

export default CartPreview;
