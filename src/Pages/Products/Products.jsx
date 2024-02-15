import { Grid } from "@material-ui/core";
import Spinner from "../../components/Spinner/Spinner";

import useStyles from "./styles";
import Product from "./Product/Product";

const Products = ({ products, onAddToCart }) => {
  if (!products.length) return <Spinner />;

  const classes = useStyles();
  return (
    <div>
      <Grid container justifyContent="center" className={classes.container}>
        {products.map((product) => (
          <Grid
            item
            key={product.id}
            className={classes.root}
            xs={12}
            sm={6}
            md={4}
            lg={12}
          >
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
