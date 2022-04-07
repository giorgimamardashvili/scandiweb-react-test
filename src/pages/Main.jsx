import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import Card from "../components/Card";
import styled from "styled-components";

export class Main extends Component {
  render() {
    let categoryState = this.props.category;
    const { data } = this.props;
    const { loading, error } = data;
    const itemIndex = data?.categories?.findIndex(
      (category) => category.name === categoryState
    );
    console.log(data.categories);
    return (
      <div>
        <h1>
          {categoryState.charAt(0).toUpperCase() + categoryState.slice(1)}
        </h1>
        <Grid>
          {loading && <h2>...loading</h2>}
          {data.categories &&
            data.categories[itemIndex].products.map((product) => (
              <Card data={product} key={product.id} />
            ))}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const category = state.category.category;
  return { category };
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 100px 40px;
`;

export default connect(mapStateToProps)(
  graphql(gql`
    {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
          brand
          attributes {
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
        }
      }
    }
  `)(Main)
);
