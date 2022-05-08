import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import parse from "html-react-parser";
import { addItem } from "../../redux/features/cartItems";

export class ProductInfo extends Component {
  constructor() {
    super();
    this.state = {
      activeId: "",
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let attrObject = {};

    for (var [name, value] of data.entries()) {
      attrObject[name] = value;
    }
    this.props.addItem({
      ...this.props.product,
      ...{ selectedAttr: attrObject },
    });
  };
  findCurrency = (currencies) => {
    const itemIndex = currencies.findIndex(
      (currency) => currency.currency.symbol === this.props.currency
    );
    return `${currencies[itemIndex].currency.symbol}${currencies[itemIndex].amount}`;
  };

  render() {
    let { product } = this.props;
    return (
      <Container onSubmit={this.handleFormSubmit}>
        <Name>{product.name}</Name>
        <Brand>{product.brand}</Brand>
        {product.attributes.length
          ? product.attributes.map((attributes) => {
              return (
                <div key={attributes.id}>
                  <Subtitle key={attributes.id}>{attributes.name}:</Subtitle>

                  <Attributes>
                    {attributes.items.map((item) => {
                      return (
                        <div key={item.id}>
                          <Input
                            type="radio"
                            name={attributes.name}
                            id={attributes.name + item.id}
                            value={item.value}
                            tabIndex={item.id}
                          />
                          <Radio
                            htmlFor={attributes.name + item.id}
                            style={{ backgroundColor: `${item.value}` }}
                          >
                            {attributes.name === "Color" ? "" : item.value}
                          </Radio>
                        </div>
                      );
                    })}
                  </Attributes>
                </div>
              );
            })
          : null}
        <Subtitle>{product.inStock ? "price" : "last price"}:</Subtitle>

        <Price>{this.findCurrency(product.prices)}</Price>

        <AddButton type="submit" disabled={!product.inStock}>
          {product.inStock ? "add to cart" : "Out of stock"}
        </AddButton>

        <Description>{parse(product.description)}</Description>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const currency = state.currency.label;
  return { currency };
}

const mapDispatchToProps = {
  addItem,
};

const Container = styled.form`
  width: 25.2%;
  margin: 0 auto;
  flex-shrink: 0;
`;
const Name = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 16px;
`;
const Brand = styled.h2`
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 40px;
`;
const Subtitle = styled.p`
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  font-family: Roboto Condensed, sans-serif;
`;
const Attributes = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked + label {
    background-color: #1d1f22;
    color: white;
  }
`;
const Radio = styled.label`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 1px solid #1d1f22;
  color: #292929;
  background-color: #ffffff;
  font-family: Source Sans Pro, sans-serif;
  font-weight: 400;
  cursor: pointer;
`;
const Price = styled.p`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 24px;
`;
const AddButton = styled.button`
  width: 292px;
  height: 52px;
  margin-bottom: 40px;
  color: #ffffff;
  background-color: #5ece7b;
  border: none;
  font-weight: 600;
  line-height: 1.2;
  text-transform: uppercase;
  opacity: 1;
  transition: opacity 250ms linear;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
    transition: opacity 250ms linear;
  }
  &:disabled {
    background-color: #292929;
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Description = styled.div`
  font-family: Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.599;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
