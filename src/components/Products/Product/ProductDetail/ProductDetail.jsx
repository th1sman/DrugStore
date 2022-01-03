import React from 'react'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, Grid, Paper, Card, CardHeader, CardMedia } from '@material-ui/core'
import useStyles from './styles'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(15),
    textAlign: 'start',
    color: theme.palette.text.secondary,
    
}))

const DetailTitle = styled(Typography)(({ theme }) => ({
    lineHeight: '100%',
    fontSize: '2rem',
    alignItems: 'start',
    color: '#6f6596'
}))



export const ProductDetail = ({ product }) => {
    const classes = useStyles()
    const { id } = useParams()
    
    return (
        <main className={classes.root}>
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={4} md={8} lg={12}>
                        <Item>
                            <Card>
                                <CardHeader>
                                    Nombre del producto
                                </CardHeader>
                                <CardMedia  />
                            </Card>
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
}
