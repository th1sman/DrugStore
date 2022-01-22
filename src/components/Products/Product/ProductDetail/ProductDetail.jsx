import React, { useEffect, useState } from 'react'
import { commerce } from '../../../../lib/commerce'
import { useParams } from 'react-router-dom'
import { Container, Box, Typography, Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Divider, Button } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons';
import Spinner from '../../../Spinner/Spinner'
import styled from 'styled-components'

const createMarkup = (text) => {
  return { __html: text }
}

const Wrapper = styled.div`
width: 100%;
display: flex;
min-height: 75vh;
margin-top: 12vh;
grid-gap: 15px;
padding-bottom: 20px;
grid-template-columns: 1fr;

@media (min-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
`;

const ImgWrapper = styled.div`
  width: 50%;
  margin-bottom: 20px;
  text-align: center;
  > img {
    max-width: 320px;
  }

  @media (mix-width: 768px) {
     margin-bottom: 0;
  }
`;

const VariantsWrapper = styled.div`
    display: flex;
    height: 140px;

    img {
      max-width: 140px;
      cursor: pointer;
      margin-right: 10px;
    }
`;

const Actions = styled.div`
  display: flex;
  margin: 15px 0;
  > button,
    h5 {
      margin-right: 10px;
    }
`;

const VariantsTitle = styled(Typography)`
    margin: 10px 0;
    text-align: left;
`;

const AddCartButton = styled(Button)`
    color: #000;
    background-color: #bb86fc;
    &:hover {
      color: #c9d1d9;
      background-color: #bb86fc;
    }
    svg {
      margin-right: 10px;
    }
`;


export const ProductDetail = ({ onAddToCart }) => {
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id)

    const { name, price, assets, variant_groups, image, quantity, description } = response


    setProduct({
      id,
      name,
      quantity,
      assets,
      variant_groups,
      description,
      src: image.url,
      price: price.formatted_with_code,
    })
  }


  useEffect(() => {
    const id = window.location.pathname.split("/")
    fetchProduct(id[2])
  }, [])

  const handleQuantity = (param) => {
    if (param === "decries" && quantity > 1) {
      setQuantity(quantity - 1)
    }
    if (param === "increase" && quantity < 10) {
      setQuantity(quantity + 1)
    }
  }

  const updateProduct = (src, { id, variantId }) => {
    setProduct({
      ...product,
      src,
      option: { [variantId]: id }
     })
  }

  const getImageUrl = (assetId) => {
    const relatedAsset = product.assets.find((option) => option.id === assetId)
    return relatedAsset?.url || ""
  }


  return (
    <Container>
      <Wrapper>
        <ImgWrapper>
          <img
            onLoad={() => {
              setLoading(false)
            }}
            src={product.src}
            alt={product.name}
          />

          {product.variant_groups?.length ? (
            <VariantsTitle variant="h4">
              Selecciona el color
            </VariantsTitle>
           ) : null } 
          <VariantsWrapper>
            {product.variant_groups?.length 
            ? product.variant_groups[0].options?.map((option) => (
                <img
                  src={getImageUrl(option.assets[0])}
                  alt={option.name}
                  onClick={() =>
                    updateProduct(getImageUrl(option.assets[0]), {
                      id: option.id,
                      variantId: product.variant_groups[0].id,
                    })
                  }
                />
              )) 
              : null}
          </VariantsWrapper>
        </ImgWrapper>

        <div>
          <Typography variant="h2">{product.name}</Typography>
          <Typography
            variant="h6"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3">Precio: {product.price}</Typography>
          <div>
            <Actions>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  handleQuantity("increase");
                }}
              >
                +
              </Button>
              <Typography variant="h3">Cantidad: {quantity}</Typography>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => {
                  handleQuantity("decries");
                }}
              >
                -
              </Button>
              </Actions>
              <AddCartButton
                size="large"
                fullWidth
                onClick={() => {
                  onAddToCart(product.id, quantity);
                }}
              >
                <AddShoppingCart /> Agregar al carrito
              </AddCartButton>
              </div>
            </div>
            {loading && <Spinner />}
      </Wrapper>
    </Container>
  );
}
