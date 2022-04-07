import React, { Component } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

export class ProductInfo extends Component {
  state = {
    activeId: "",
  };
  handleAttributes = (e) => {
    this.setState({
      activeId: e.target.dataset.id,
    });
  };
  handleColorAttributes = (e) => {
    console.log(e);
  };
  render() {
    console.log(this.props.product);
    let { product } = this.props;
    return (
      <Container>
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
                        <Radio
                          type="button"
                          key={item.id}
                          data-id={item.id}
                          onClick={
                            attributes.id === "Color"
                              ? this.handleColorAttributes.bind(this)
                              : this.handleAttributes.bind(this)
                          }
                          style={{ backgroundColor: `${item.value}` }}
                          className={
                            this.state.activeId === item.id ? "active" : ""
                          }
                          title={item.displayValue}
                        >
                          {attributes.id === "Color" ? "" : item.displayValue}
                        </Radio>
                      );
                    })}
                  </Attributes>
                </div>
              );
            })
          : null}
        <Subtitle>{product.inStock ? "price" : "last price"}:</Subtitle>

        <p>${product.prices[0].amount}</p>

        <button
          type="button"
          onClick={() => this.addToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? "add to cart" : "Out of stock"}
        </button>

        <div>{parse(product.description)}</div>
      </Container>
    );
  }
}

const Container = styled.div`
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
const Radio = styled.button`
  min-width: 63px;
  height: 45px;
  padding: 13px;
  border: 1px solid #1d1f22;
  color: #292929;
  background-color: #ffffff;
  font-family: Source Sans Pro, sans-serif;
  font-weight: 400;
  cursor: pointer;
  &.active {
    background-color: #1d1f22;
    color: white;
  }
`;

export default ProductInfo;
