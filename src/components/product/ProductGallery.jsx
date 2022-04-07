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
          {gallery?.map((image, index) => (
            <Img
              src={image}
              alt={name}
              key={index}
              onClick={this.handleClickOnCover}
            />
          ))}
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
`;
const Thumbs = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  width: 11.5%;
  overflow-y: auto;
  margin-right: 30px;
  max-height: 586px;
  flex-shrink: 0;
`;
const Image = styled.div`
  aspect-ratio: 1 / 1;
  flex-grow: 1;
`;
const Img = styled.img`
  display: block;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  width: 100%;
`;
const Cover = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export default ProductGallery;
