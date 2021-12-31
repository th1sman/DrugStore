import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import useStyles from './styles'



const Contact = () => {
    const classes = useStyles();

    return (

        <>
             <Container className={classes.content} maxWidth="sm">
             <Typography variant='h6'>Contact page</Typography>
             </Container>
        </>
    )
}

export default Contact
