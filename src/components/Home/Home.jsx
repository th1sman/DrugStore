
import React from 'react'
import { Container, Box, Typography, Paper } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import useStyles from './styles'
import { Grid } from "@material-ui/core";
import HomeImg from '../../assests/HomeImg.png'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(15),
    textAlign: 'start',
    color: theme.palette.text.secondary,    
}))

const HomeTitle = styled(Typography)(({theme}) => ({
  lineHeight: '100%',
  fontSize: '2rem',
  alignItems: 'start',
  color: '#6f6596'
}))

const HomesubTitle = styled(Typography)(({ theme}) => ({
  ...theme.typography.caption,
  textAlign: 'center',
  color: '#6f6596',
})) 
const Home = () => {
    const classes = useStyles();
    return (
      <main className={classes.root}>
        <Container className={classes.content}>
        <Grid container spacing={1}>
        <Grid item xs={4} md={8}>
          <Item>
            <HomeTitle>
            una marca chilena de ropa sin estereotipos de género
            </HomeTitle>
            <HomesubTitle>
            every/body is beautiful
            </HomesubTitle>
          </Item>
        </Grid>
        <Grid item xs={9} md={4}>
            <img src={HomeImg} className={classes.homeImg}></img>
        </Grid>
      </Grid>
      </Container>
      </main>
    )
};

export default Home;
