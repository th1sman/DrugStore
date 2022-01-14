import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Box, Container, Button } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from './styles';
import logo from '../../assests/KatOnlineLogo.png'
import { Link, useLocation } from 'react-router-dom'


const Navbar = ({ totalItems }) => {

  const classes = useStyles()
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem>
                  <Link to='/productos'>
                    <Typography>
                      Productos
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Typography>Nosotrxs</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>Contacto</Typography>
                </MenuItem>
                <MenuItem>
                  {location.pathname === '/' && (
                    <IconButton component={Link} to="/cart" aria-label="show cart items" color="inherit">
                      <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                  )}
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to="/" className={classes.Link}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              classes={classes.title}
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              KatOnline
            </Typography>
            </Link>
              <Link to="/productos" className={classes.Link}>
                <Typography>
                  Productos
                </Typography>
              </Link>
              <Link to="/about" className={classes.Link}>
                <Typography>
                  Nosotrxs
                </Typography>
              </Link>
              <Link to="/contacto" className={classes.Link}>
                <Typography>
                  Contacto
                </Typography>
              </Link>

              <div className={classes.grow} />
              <IconButton component={Link} to="/cart" aria-label="show cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Navbar
