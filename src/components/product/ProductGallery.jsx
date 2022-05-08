import React, { Component } from "react";
import styled from "styled-components";

export class ProductGallery extends Component {
  state = {
    cover: "",
  };
  componentDidMount() {
    this.setState({ cover: this.props.gallery[0] });
  }
  handleClickOnCover = (e) => {
    this.setState({ cover: e.target.src });
  };
  render() {
    let { gallery, name } = this.props;
    return (
      <Container>
        <Thumbs>
          <Wrapper>
            {gallery?.map((image, index) => (
              <Img
                src={image}
                alt={name}
                key={index}
                onClick={this.handleClickOnCover}
              />
            ))}
          </Wrapper>
        </Thumbs>
        <Image>
          <Cover src={this.state.cover} alt={name} />
        </Image>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  width: 55%;
  height: fit-content;
`;
const Thumbs = styled.div`
  width: 11.5%;
  overflow-y: auto;
  margin-right: 30px;
  max-height: 586px;
  flex-shrink: 0;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  width: 100%;
`;
const Image = styled.div`
  flex: 1;
  position: relative;
  padding-top: 83.8%;
`;
const Img = styled.img`
  display: block;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  width: 100%;
`;
const Cover = styled.img`
  position: absolute;
  inset: 0;
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

export default ProductGallery;
