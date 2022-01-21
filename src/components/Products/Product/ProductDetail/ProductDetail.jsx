import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import StraightenIcon from '@mui/icons-material/Straighten';




export const ProductDetail = ({ products, onAddToCart }) => {
    const classes = useStyles()
    const HandleAddToCart = () => onAddToCart(product.id, 1);
    const [ variantGroups, setVariantGroups ] = useState([])
    const { productID } = useParams()
    const product = products.find(product => product.id === productID)
    if (!product) return null

    console.log(product)

         // Colores, tallas y fotos
         const siZes = product.variant_groups[0].options
         const piCs = product.assets

         console.log(siZes)

    return (
        <Container className={classes.root}>
            <Grid item xs={12} md={6} lg={5} className={classes.item} >
                <CardActionArea>
                    <Card sx={{ display: 'flex' }} className={classes.item}>
                        <CardContent sx={{ flex: 1 }}>
                            <CardMedia
                                component="img"
                                className={classes.media}
                                image={product.image.url}
                            />
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Grid>
            <Paper item className={classes.item}>
            <form>
                <h3>{product.name}</h3>
                <h4>Precio : {product.price.formatted_with_code}</h4>
                <Divider />    
                <Typography>
                    Talla
                </Typography>
               
                <Grid className={classes.buttonGroup}>
                {siZes.map((size) => (
                    <div   
                    key={[size.id]}>
                    <Button className={classes.button} variant='outlined'>{size.name}</Button>
                    </div>
                ))}   
                </Grid> 
                <Divider/>
                <Typography>
                    Color : Rosado
                </Typography>
                <Grid className={classes.picGroup}>
                {piCs.map((pic) => (
                    <div key={[pic.id]}>
                        <Button variant='outlined'> 
                        <img className={classes.pictures} src={pic.url}>
                        </img> 
                        </Button> 
                    </div>
                ))}   
                </Grid>    
                <Button 
                varinat='contained'
                fullWidth
                onClick={HandleAddToCart}>Agregar al carro</Button> 
            </form>
            </Paper>
        </Container>
    )
}


export default ProductDetail