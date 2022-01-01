import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles';
import logo from '../../assests/KatStoreLogo.png'
import { Link, useLocation } from 'react-router-dom'


const Navbar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const classes = useStyles();
    const location = useLocation();


    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)

    const mobileMenuId = 'primary-search-account-menu-mobile'

    const renderMobileMenu = (
      <Menu anchorEl={mobileMoreAnchorEl} 
      anchorOrigin={{ 
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      >
     <MenuItem>
     <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
     </MenuItem>
      </Menu>
    )
    
    return (
        <>
          <AppBar position="fixed" className={classes.AppBar} color="inherit">
            <Toolbar>
              <Link to="/" className={classes.title}>
                <Typography variant="h6" color="inherit">
                    <img src={logo} alt="Commerce.js" height="35px" className={classes.image} />
                    Kat!
                </Typography> 
                </Link >
                <Link to="/productos" className={classes.Link}>
                  <Typography variant="h6">Productos</Typography>
                </Link>
                <Link to="/about" className={classes.Link}>
                  <Typography variant="h6">Nosotrxs</Typography>
                </Link>
                <Link to="/contact" className={classes.Link}>
                <Typography variant='h6'>Contacto</Typography>
                </Link>
                <div className={classes.grow} />
                {location.pathname === '/' && ( 
                <div className={classes.button}>
                    <IconButton component={Link} to="/cart"  aria-label="show cart items" color="inherit">
                      <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                      </Badge>
                    </IconButton> 
                </div> )}
            </Toolbar>
          </AppBar>  
          {renderMobileMenu}
        </>
    )
}

export default Navbar
