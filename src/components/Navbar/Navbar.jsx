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
import { styled } from "@mui/system";
import { ShoppingCart } from "@material-ui/icons";
import MenuIcon from "@mui/icons-material/Menu";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const NavbarStyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const Grow = styled(Box)({
  flexGrow: 1,
});

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={!!mobileMoreAnchorEl}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          component={Link}
          to="/cart"
          aria-label="Show cart items"
          color="inherit"
        >
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Container>
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", alignItems: "center" },
              }}
            >
              <IconButton
                size="medium"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setMobileMoreAnchorEl(!mobileMoreAnchorEl)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                open={Boolean(mobileMoreAnchorEl)}
                onClose={handleMobileMenuClose}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <Typography>Sobre Nosotros</Typography>
                </MenuItem>
                {renderMobileMenu}
              </Menu>
            </Box>
            <NavbarStyledLink to="/" className={classes.Link}>
              <Typography
                variant="h6"
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                Agua Pura San Jose
              </Typography>
            </NavbarStyledLink>
            <Grow>
              <Link to="/nosotros" className={classes.Link}>
                <Typography>Sobre Nosotros</Typography>
              </Link>
            </Grow>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary">
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
