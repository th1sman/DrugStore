import React from 'react'
import { Container, Box, Typography, Grid } from '@material-ui/core'
import useStyles from './styles'
import { styled } from '@mui/material/styles';



const Item = styled(Box)(({ theme }) => ({
    
}))

const About = () => {

    const classes = useStyles();

    return (
        <main className={classes.content}>
           <Container className={classes.aboutContainer}>
                <Grid>
                    
                </Grid>
           </Container>
        </main>
    )
}

export default About
