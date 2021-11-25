import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import useStyles from './styles'
import { commerce } from '../../../lib/commerce'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { Link } from 'react-router-dom';


const steps = ['Dirección de envio', 'Detalles del pago'];

const Checkout = ({ cart, order, onCaptureCheckOut, error }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const classes = useStyles()
    // const history = useHistory()

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckoutToken(token)
            } catch (err) {
                console.log(err)
            }
        }
        generateToken()
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)


    const next = (data) => {
        setShippingData(data)

        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }


    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Gracias por comprar, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Numero de orden: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Volver al Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Gracias por comprar</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Volver al Home</Button>
        </>
    ) : (
        <div className={classes.spiner}>
            <CircularProgress />
        </div>
    )


    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button"></Button>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckOut={onCaptureCheckOut} timeout={timeout} />

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Proceso de pago</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
