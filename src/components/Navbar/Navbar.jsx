import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import MenuIcon from "@mui/icons-material/Menu";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
const Navbar = () => {
  const classes = useStyles();
  const { cart } = useCartContext();

  const totalItems =
    cart && Array.isArray(cart.line_items)
      ? cart.line_items.reduce((total, item) => total + item.quantity, 0)
      : 0;

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="medium"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <Link to="/">
                    <Typography className={classes.Link}>Productos</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/nosotros">
                    <Typography>Nosotros</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/https://web.whatsapp.com">
                    <Typography>Contacto</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/" className={classes.Link}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  className={classes.title}
                  sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                >
                  Agua Pura San Jose
                </Typography>
              </Link>
              <Link to="/" className={classes.Link}>
                <Typography>Productos</Typography>
              </Link>
              <Link to="/nosotros" className={classes.Link}>
                <Typography>Nosotros</Typography>
              </Link>
              <Link to="/https://web.whatsapp.com/" className={classes.Link}>
                <Typography>Contacto</Typography>
              </Link>
              <div className={classes.grow} />
            </Box>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="show cart items"
              color="inherit"
              sx={{ display: { xl: "none" } }}
            >
              <Badge
                badgeContent={totalItems}
                overlap="rectangular"
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
