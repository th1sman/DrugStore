import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./CustomTextField";
import { commerce } from "../../lib/commerce";
import { useCheckOutContext } from "../../context/checkOutContext";

const AddressForm = ({ test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  const checkoutToken = useCheckOutContext();

  const fetchShippingCountries = async () => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutToken.id,
      );
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  const fetchSubdivisions = async (countryCode) => {
    try {
      const { subdivisions } =
        await commerce.services.localeListSubdivisions(countryCode);

      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    } catch (error) {
      console.error("error fetching subdivisions", error);
    }
  };

  const fetchShippingOptions = async () => {
    try {
      const options = await commerce.checkout.getShippingOptions(
        checkoutToken.id,
        {
          country: shippingCountry,
          region: shippingSubdivision,
        },
      );
      setShippingOptions(options);
      setShippingOption(options[0].id);
    } catch (error) {
      console.error("Error fetching shipping options:", error);
    }
  };

  useEffect(() => {
    if (checkoutToken.id) {
      fetchShippingCountries();
    }
  }, [checkoutToken.id]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision,
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dirección de envio
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            test({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            }),
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="Nombre" />
            <FormInput required name="lastName" label="Apellido" />
            <FormInput required name="address1" label="Dirección" />
            <FormInput required name="email" label="E-mail" />
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Volver al carrito
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Siguiente
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
