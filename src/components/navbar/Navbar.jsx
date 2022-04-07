import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import mainLogo from "../../images/mainLogo.svg";
import { changeCategory } from "../../redux/features/categorySlice";
import { withRouter } from "../../tools/withRouter";
import CartPreview from "./CartPreview";
import CurrencyChange from "./CurrencyChange";

const categories = ["ALL", "CLOTHES", "TECH"];

export class Navbar extends Component {
  state = {
    activeIndex: 0,
  };

  handeClick = (index, prop) => {
    this.props.changeCategory(prop.target.textContent.toLowerCase());
    this.setState({ activeIndex: index });
    this.props.navigate("/");
  };
  render() {
    return (
      <Container>
        <Categories>
          {categories.map((category, index) => {
            const className = this.state.activeIndex === index ? "active" : "";
            return (
              <Category
                className={className}
                onClick={this.handeClick.bind(this, index)}
                key={index}
              >
                {category}
              </Category>
            );
          })}
        </Categories>
        <Logo>
          <Link to="/">
            <img src={mainLogo} alt="" />
          </Link>
        </Logo>
        <CartAndCurrency>
          <CurrencyChange />
          <CartPreview />
        </CartAndCurrency>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  changeCategory,
};

const Container = styled.div`
  height: 80px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
`;
const Categories = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const Logo = styled(Categories)`
  justify-content: center;
`;
const CartAndCurrency = styled(Categories)`
  justify-content: flex-end;
`;
const Category = styled.span`
  height: 100%;
  flex-shrink: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: content-box;
  border-bottom: 2px solid white;
  cursor: pointer;

  &:hover {
    color: #5ece7b;
    border-bottom: 2px solid #5ece7b;
  }
  &.active {
    color: #5ece7b;
    border-bottom: 2px solid #5ece7b;
  }
`;

export default connect(null, mapDispatchToProps)(withRouter(Navbar));
