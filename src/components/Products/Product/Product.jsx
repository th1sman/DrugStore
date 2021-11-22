import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles'

const Product = ({ product, onAddToCart }) => { 

    const clasess = useStyles();

    const HandleAddToCart = () => onAddToCart(product.id, 1);

    return (
        <Card className={clasess.root}>
            <CardMedia className={clasess.media} image={product.image.url} title={product.name} />
            <CardContent>
                <div className={clasess.cardContent}>
                    <Typography  gutterBottom variant="h5" component="h2">
                           {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"/>
            </CardContent>
            <CardActions disableSpacing className={clasess.CardActions}>
                <IconButton aria-label="Add to Cart" onClick={HandleAddToCart}>
                    <AddShoppingCart /> 
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
