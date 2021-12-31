import React from 'react'
import { Paper } from '@material-ui/core'
import { useParams } from 'react-router-dom'


export const ProductDetail = ({ products }) => {
    const { productID } = useParams()
    // const product = notes.find(product => product.id === productID)
    

    return (
        <Paper>
            {/* <h2>{product.name}</h2> */}
        </Paper>
    )
}