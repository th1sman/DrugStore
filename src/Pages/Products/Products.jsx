import { Grid } from "@material-ui/core";
import Spinner from "../../components/Spinner/Spinner";
import { useCartContext } from "../../context/cartContext";

import useStyles from "./styles";
import Product from "./Product/Product";

const Products = ({ products }) => {
  const classes = useStyles();

  const { handleAddToCart } = useCartContext();

  if (!products.length) return <Spinner />;

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
            md={12}
            lg={12}
          >
            <Product product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
