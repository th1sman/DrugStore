import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useStyles from './styles'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
import KatContact from '../../assests/KatContact.png'



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '250px',
  backgroundImage: `url(${KatContact})`,
  color: theme.palette.text.secondary,
}));

const Contact = () => {

  const classes = useStyles();
  return (
    <main className={classes.root}>
    <Box sx={{ paddingTop: '80px'}} className={classes.content}>
      <Grid container spacing={2} columns={14} className={classes.contactSection}>
        <Grid item xs={6} className={classes.item}>
          <Item elevation={4}>
          <Typography variant="h4">Facebook</Typography>
            <Button onClick={() => {
              window.location.href="https://www.facebook.com/tiendakat.cl/"
            }}>
            <FacebookIcon sx={{ fontSize: '200px'}} />
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={4}>
          <Typography variant="h4">Instagram</Typography>
            <Button onClick={() => {
              window.location.href="https://www.instagram.com/katonline.cl/"
            }}>
              <InstagramIcon sx={{ fontSize: '200px', color: '#f50057'}} />
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </main>
  );
}

export default Contact