import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

export class Card extends Component {
  findCurrency = (currencies) => {
    const itemIndex = currencies.findIndex(
      (currency) => currency.currency.symbol === this.props.currency
    );
    return `${currencies[itemIndex].currency.symbol}${currencies[itemIndex].amount}`;
  };

  render() {
    return (
      <Container to={`/${this.props.data.id}`}>
        <ImageContainer>
          <Image src={this.props.data.gallery[0]} alt={this.props.data.name} />
        </ImageContainer>
        <Title>{this.props.data.name}</Title>
        <Price>{this.findCurrency(this.props.data.prices)}</Price>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const currency = state.currency.label;
  return { currency };
}

const Container = styled(Link)`
  padding: 16px;
  background-color: #fff;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;
const ImageContainer = styled.div`
  aspect-ratio: 1 / 1;
  margin-bottom: 24px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
const Title = styled.h2`
  font-weight: 300;
  font-size: 18px;
`;
const Price = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

export default connect(mapStateToProps)(Card);
