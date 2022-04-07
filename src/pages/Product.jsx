import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import styled from "styled-components";
import ProductInfo from "../components/product/ProductInfo";
import ProductGallery from "../components/product/ProductGallery";
import { withRouter } from "../tools/withRouter";

export class Product extends Component {
  render() {
    const { product, loading } = this.props.data;
    if (loading) {
      return <p>Loading</p>;
    } else {
      return (
        <Container>
          <ProductGallery gallery={product.gallery} name={product.name} />
          <ProductInfo product={product} />
        </Container>
      );
    }
  }
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

export default withRouter(
  graphql(
    gql`
      query GET_PRODUCT($productId: String!) {
        product(id: $productId) {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
    `,
    {
      options: (props) => ({
        variables: {
          productId: props.params.productId,
        },
      }),
    }
  )(Product)
);
