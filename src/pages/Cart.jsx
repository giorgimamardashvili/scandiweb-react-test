import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CartItem from "../components/CartItem";

export class Cart extends Component {
  render() {
    let cartItems = this.props.cartItems;
    return (
      <Container>
        <CartName>Cart</CartName>
        <Wrapper>
          {cartItems &&
            cartItems.map((cartItem, index) => (
              <CartItem item={cartItem} key={index} />
            ))}
        </Wrapper>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const cartItems = state.cartItems.cartItems;
  return { cartItems };
}

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
`;
const Wrapper = styled.div`
  width: 100%;
`;
const CartName = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 60px;
`;

export default connect(mapStateToProps)(Cart);
