import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/features/currencySlice";
import styled from "styled-components";
import arrowDown from "../../images/arrowDown.svg";

const options = [
  {
    label: "$",
    value: "USD",
  },
  {
    label: "£",
    value: "GBP",
  },
  {
    label: "¥",
    value: "JPY",
  },
  {
    label: "A$",
    value: "AUD",
  },
  {
    label: "₽",
    value: "RUB",
  },
];

export class CurrencyChange extends Component {
  state = {
    open: false,
    label: "$",
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
    let currency = this.props.currency;
    return (
      <Container ref={this.container}>
        <CurrentCurrency onClick={this.handleClick}>
          {currency}
          <img src={arrowDown} alt="arrowDown" style={{ marginLeft: "10px" }} />
        </CurrentCurrency>
        {this.state.open && (
          <CurrencyContainer>
            <CurrencyWrapper>
              {options.map((option) => (
                <CurrencyItem
                  as="li"
                  key={option.value}
                  value={option.value}
                  onClick={() => {
                    this.props.changeCurrency(option.label);
                    this.setState({
                      open: false,
                    });
                  }}
                >
                  {option.label} {option.value}
                </CurrencyItem>
              ))}
            </CurrencyWrapper>
          </CurrencyContainer>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const currency = state.currency.label;
  console.log(currency);
  return { currency };
}
const mapDispatchToProps = {
  changeCurrency,
};

const Container = styled.div`
  position: relative;
`;
const CurrentCurrency = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
`;
const CurrencyContainer = styled.div`
  padding: 20px 40px 20px 20px;
  position: absolute;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  top: 30px;
  left: -20px;
  background-color: #fff;
`;
const CurrencyWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;
const CurrencyItem = styled.li`
  font-weight: 500;
  list-style-type: none;
  white-space: nowrap;
  font-size: 18px;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyChange);
