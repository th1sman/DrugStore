import { Grid } from "@material-ui/core";


import useStyles from './styles';
import Product from "./Product/Product";


const Products = ({ products, onAddToCart, product }) => { 
    const classes = useStyles();


    return (
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justifyContent="center" spacing={10}>
            {products.map((product) => (    
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                    <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
            ))}
        </Grid> 
        </main>
    );
};


export default Products;