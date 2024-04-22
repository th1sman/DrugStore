import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { useCheckOutContext } from "../../context/checkOutContext";

const Review = () => {
  const { checkoutToken, isCheckoutLoading } = useCheckOutContext();

  if (isCheckoutLoading || !checkoutToken || !checkoutToken.line_items) {
    return (
      <Typography variant="subtitle1">
        Cargando detalles del pedido...
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Pedido
      </Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Cantidad: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_code}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.subtotal.formatted_with_code}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;