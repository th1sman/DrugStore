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

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
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
                  <Link to="/productos">
                    <Typography>Productos</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Typography>Nosotros</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>Contacto</Typography>
                </MenuItem>
                <MenuItem>
                  {location.pathname === "/" && (
                    <IconButton
                      component={Link}
                      to="/cart"
                      aria-label="show cart items"
                      color="inherit"
                    >
                      <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                  )}
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
              <IconButton
                component={Link}
                to="/cart"
                aria-label="show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
