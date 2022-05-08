import React, { Component } from "react";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import { addItem, removeItem } from "../redux/features/cartItems";

export class CartItem extends Component {
  constructor() {
    super();
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }
  priceRender = (priceArr) => {
    let current = priceArr.find((price) => {
      return price.currency.symbol === this.props.currency;
    });
    return current.currency.symbol + current.amount;
  };
  handleAddClick = () => {
    this.props.addItem(this.props.item);
  };
  handleRemoveClick = () => {
    this.props.removeItem(this.props.item);
  };
  render() {
    let { item } = this.props;
    console.log(item);
    return (
      <Item>
        <Info>
          <div>
            <Title>{item.name}</Title>
            <SubTitle>{item.brand}</SubTitle>
            <Price>{this.priceRender(item.prices)}</Price>
            {item.attributes.length
              ? item.attributes.map((attributes) => {
                  return (
                    <div key={attributes.id}>
                      <AttributeName>{attributes.name}</AttributeName>
                      <Attributes>
                        {attributes.items.map((attribute) => {
                          let active = "";
                          console.log();
                          if (
                            item.selectedAttr[attributes.name] ===
                            attribute.value
                          ) {
                            active = "active";
                          } else {
                            active = "";
                          }
                          console.log(active);
                          return (
                            <Attribute
                              key={attribute.id}
                              style={{ backgroundColor: `${attribute.value}` }}
                              className={active}
                            >
                              {attributes.name === "Color"
                                ? ""
                                : attribute.value}
                            </Attribute>
                          );
                        })}
                      </Attributes>
                    </div>
                  );
                })
              : null}
          </div>
          <Amount>
            <Button onClick={this.handleAddClick}>+</Button>
            <span>{item.cartQty}</span>
            <Button onClick={this.handleRemoveClick}>-</Button>
          </Amount>
        </Info>
        <Slider>
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            style={{ width: "100%", height: "100%" }}
          >
            {item &&
              item.gallery.map((img) => (
                <SwiperSlide key={img}>
                  <SliderImg src={img} alt={img} />
                </SwiperSlide>
              ))}
          </Swiper>
        </Slider>
      </Item>
    );
  }
}

function mapStateToProps(state) {
  const currency = state.currency.label;
  console.log(currency);
  return { currency };
}

const mapDispatchToProps = {
  addItem,
  removeItem,
};

const Item = styled.div`
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid #e5e5e5;
  min-height: 225px;
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  width: calc(100% - 152px);
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-shrink: 0;
`;
const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 185px;

  span {
    font-size: 24px;
  }
`;
const Button = styled.button`
  width: 45px;
  height: 45px;
  background-color: #fff;
  border: 1px solid #1d1f22;
`;
const Title = styled.h2`
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 15px;
`;
const SubTitle = styled.h3`
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 12px;
`;
const Price = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 12px;
`;
const Attributes = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
`;
const AttributeName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;
const Slider = styled.div`
  width: 140px;
  height: 185px;
`;
const SliderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;
const Attribute = styled.div`
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
  &.active {
    background: black;
    color: white;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
