
import React  from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import useStyles from './styles'
import { Grid } from "@material-ui/core";
import HomeImg from '../../assests/HomeImg.png'

const Home = () => {
    const classes = useStyles();

    return (
        <Container className={classes.content} maxWidth="sm">      
            <Grid container justifyContent="center">
             <div className={classes.homeText}>
                <Typography variant='h2'>Kat!</Typography>
             </div>
             <div>
                 <img className={classes.homeImg} src={HomeImg}>
                 </img>
             </div>
            </Grid>
        </Container>
    )
};

export default Home;
