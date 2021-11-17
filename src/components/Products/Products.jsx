import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from './styles';

const products  = [
    { id: 1, name: 'Macbook', description: 'Ultrabook 2020', price: '$10', image: 'https://ioccasion.fr/wp-content/uploads/2020/11/IMG_0904-scaled.jpg'},
    { id: 2, name: 'Sneakers', description: 'Runnning Shoes', price: '$20', image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1546621894-sketchers-gorun-maxtrail-womens-1486-1532626097.jpg?crop=0.795xw:0.671xh;0.0593xw,0.197xh'},
];


const Products = () => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justifyContent="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid> 
    </main>
    )
}


export default Products;