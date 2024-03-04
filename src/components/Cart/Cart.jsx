import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import { useCartContext } from "../../context/cartContext";

const Cart = () => {
  const classes = useStyles();

  const { cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart } =
    useCartContext();

  const isCartEmpty =
    !cart || !Array.isArray(cart.line_items) || cart.line_items.length === 0;

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      No tienes productos en tu carrito,
      <Link to="/" className={classes.link}>
        Haz click aqui para agregar algunos
      </Link>
    </Typography>
  );

  return (
    <Container className={classes.root}>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Tu Carrito
      </Typography>
      {isCartEmpty ? (
        renderEmptyCart()
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.line_items.map((lineItem) => (
              <Grid item xs={12} sm={4} key={lineItem.id}>
                <CartItem
                  item={lineItem}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              </Grid>
            ))}
          </Grid>
          <div className={classes.cardDetails}>
            <Typography variant="h4">
              Subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
              <Button
                className={classes.emptyButton}
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => handleEmptyCart()}
              >
                Vaciar carrito
              </Button>
              <Button
                component={Link}
                to="/checkout"
                className={classes.checkOutButton}
                size="large"
                type="button"
                variant="contained"
                color="primary"
              >
                Pagar
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
