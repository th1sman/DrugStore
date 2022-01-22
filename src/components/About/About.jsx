import React from 'react'
import { Container, Paper, Box, Typography, Grid } from '@material-ui/core'
import useStyles from './styles'
import { styled } from '@mui/material/styles';
import aboutPic from '../../assests/aboutPic.jpg'


const About = () => {

    const classes = useStyles();

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        height: '450px',
        color: theme.palette.text.secondary,
    }));


    return (
        <Container className={classes.content}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} lg={8}>
                        <Item elevation={6} sx={{ objectFit: 'cover'}} >
                            <img className={classes.aboutPic} src={aboutPic} alt="about img" />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Item elevation={6} >
                            <Typography variant='h5'>
                                hola a tod@s nosotros somos KAT!🌈, your inclusive local brand 🇨🇱.
                            </Typography>
                            <Typography variant='subtitle1' className={classes.paragraph}>
                                Somos un grupo de jóvenes que nos encontramos cursando primer año de ingeniería comercial de la Universidad Adolfo Ibañez.
                                Con KAT! sientete lind@ y comod@ a toda hora💖, pues somos una marca chilena sin estereotipos de género, la cual busca una experiencia única de comidad y calidad en ropa✨
                                ontamos con prendas de confección 100% chilena 🇨🇱 y la mejor calidad, sin etiqueta de género 🏷
                            </Typography>
                            <Typography variant='subtitle2'>
                            Lleva tu prenda a todos lados y enamórate de nuestra marca 🌝♥️
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default About
