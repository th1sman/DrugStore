import React, { useState } from 'react'
import  { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

import FormInput from './CustomTextField'


import { commerce } from '../../lib/commerce'


const AddressForm = () => {

    const [ShippingCountries, setShippingCountries] = useState([])
    const [ShippingCountry, setShippingCountry] = useState('')
    const [ShippingSubdivisions, setShippingSubdivisions] = useState([])
    const [ShippingSubdivision, setShippingSubdivision] = useState('')
    const [ShippingOptions, setShippingOptions] = useState([])
    const [ShippingOption, setShippingOption] = useState('')

    const methods = useForm()

    return (
        <>
            <Typography variant="h6" gutterBottom>Dirección de envio</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='Nombre'/>
                        <FormInput required name='lastName' label='Apellido'/>
                        <FormInput required name='address1' label='Dirección'/>
                        <FormInput required name='email' label='E-mail'/>
                        <FormInput required name='city' label='Ciudad'/>
                        <FormInput required name='postal' label='Codigo Postal'/>

                    <Grid item xs={12} sm={6}>
                        <InputLabel>Pais de destino</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Seleccioname
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Region de destino</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Seleccioname
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Opciones de envio</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Seleccioname
                            </MenuItem>
                        </Select>
                    </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
