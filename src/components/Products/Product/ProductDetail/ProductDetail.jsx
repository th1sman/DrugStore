import React, { useEffect, useState } from 'react'
import { commerce } from '../../../../lib/commerce'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Divider, Button } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons';

// Import Css
import "./styles.css"

const createMarkup = (text) => {
    return { __html: text }
}


export const ProductDetail = ({ onAddToCart }) => {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)

    const fetchProduct  = async (id) => {
        const response = await commerce.products.retrieve(id)
        const { name, price, image, quantity, description } = response

        console.log({response})
        setProduct({
            id,
            name,
            quantity,
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
            setQuantity(quantity + 1 )
        }
    }

    
    return (
            <Container className="product-view">
              <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={4} className="image-wrapper">
                  <img
                    src={product.src}
                    alt={product.name}
                  />
                </Grid>
                <Grid item xs={12} md={4} className="text">
                  <Typography variant="h2">{product.name}</Typography>
                  <Typography
                    variant="p"
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
    }
