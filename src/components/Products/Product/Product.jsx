import {
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CardActionArea,
} from "@material-ui/core";
import { useCartContext } from "../../../context/cartContext";
import { AddShoppingCart } from "@material-ui/icons";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router";

import useStyles from "./styles";

const Product = ({ product }) => {
  const { handleAddToCart } = useCartContext();
  const [loading, setLoading] = useState(true);

  const clasess = useStyles();
  const navigate = useNavigate();

  return (
    <Card className={clasess.root}>
      <CardHeader title={product.name}></CardHeader>
      <CardActionArea
        onClick={() => {
          navigate(`/productos/${product.id}`);
        }}
      >
        <CardMedia
          className={clasess.media}
          image={product.image.url}
          title={product.name}
        />
      </CardActionArea>
      <CardContent>
        <div className={clasess.cardContent}>
          <Typography variant="h5">
            {product.price.formatted_with_code}
          </Typography>
        </div>
        <Divider />
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={clasess.CardActions}>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => handleAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
