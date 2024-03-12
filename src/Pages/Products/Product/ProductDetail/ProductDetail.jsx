import React, { useEffect, useState } from "react";
import { commerce } from "../../../../lib/commerce";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Divider,
  Button,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Spinner from "../../../../components/Spinner/Spinner";
import "./styles.css";

const createMarkup = (text) => {
  return { __html: text };
};

export const ProductDetail = ({ onAddToCart }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);

    const {
      name,
      price,
      assets,
      variant_groups,
      image,
      quantity,
      description,
    } = response;

    setProduct({
      id,
      name,
      quantity,
      assets,
      variant_groups,
      description,
      src: image.url,
      price: price.formatted_with_code,
    });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  const handleQuantity = (param) => {
    if (param === "decries" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (param === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const updateProduct = (src, { id, variantId }) => {
    setProduct({
      ...product,
      src,
      option: { [variantId]: id },
    });
  };

  const getImageUrl = (assetId) => {
    const relatedAsset = product.assets.find((option) => option.id === assetId);
    return relatedAsset?.url || "";
  };

  return (
    <Container className="product-view">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={4} className="image-wrapper">
          <img
            onLoad={() => {
              setLoading(false);
            }}
            src={product.src}
            alt={product.name}
          />
          <Paper className="variant" elevation={3}>
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
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} className="text">
          <Typography variant="h2">{product.name}</Typography>
          <Typography
            variant="subtitle2"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3">Precio: {product.price}</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button
                size="small"
                variant="contained"
                className="increase-product-quantity"
                onClick={() => {
                  handleQuantity("increase");
                }}
              >
                +
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography className="quantity" variant="h3">
                Cantidad: {quantity}
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Talla :
                {product.variant_groups?.length
                  ? product.variant_groups[1].options?.map((option) => (
                      <Button variant="outlined">{option.name}</Button>
                    ))
                  : null}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                className="custom-button"
                fullWidth
                onClick={() => {
                  onAddToCart(product.id, quantity);
                }}
              >
                <AddShoppingCart /> Agregar al carrito
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
