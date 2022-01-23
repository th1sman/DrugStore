import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import { Card, Grid, CardMedia, CardHeader, CardContent, CardActions, IconButton, CardActionArea } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import { styled } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import useStyles from './styles'



const Contact = () => {
    const classes = useStyles();
    return (
        <>
             <Container className={classes.content} maxWidth="sm" >
                 <Grid container spacing={4}>
                     <Grid item>
                     <Card className={classes.cardContact}>
                        <IconButton color='secondary' className={classes.iconContact}>
                            <InstagramIcon />
                        </IconButton>
                    </Card>
                     </Grid>
                    <Grid item>
                    <Card className={classes.cardContact}>
                        <IconButton color='secondary' >
                            <FacebookIcon/>
                        </IconButton>
                    </Card>
                    </Grid>
                 </Grid>
             </Container>
        </>
    )
}

export default Contact
