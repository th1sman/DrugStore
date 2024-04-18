import { Grid } from "@material-ui/core";
import { useCartContext } from "../../context/cartContext";
import useStyles from "./styles";
import Product from "./Product/Product";

export function Products({ products }) {
  const classes = useStyles();

  const { handleAddToCart } = useCartContext();

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        spacing={4}
        className={classes.container}
      >
        {products.map((product) => (
          <Grid
            item
            key={product.id}
            className={classes.root}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Product product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
