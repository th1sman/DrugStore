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

const AddressForm = ({ test }) => {
  const [shippingComune, setShippingComune] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    let cancelRequest = false;

    const fetchCountry = async () => {
      const response = await commerce.services.localeListCountries();
      const countriesArray = Object.values(response);

      let country;
      for (let c of countriesArray) {
        if (c.code === "CL") {
          country = c;
          break;
        }
      }

      if (!cancelRequest) {
        setCountry(country);
      }
    };

    fetchCountry();

    return () => {
      cancelRequest = true;
    };
  }, []);

  const methods = useForm();

  const shippingCountry = country ? country.name : "CL - Chile";

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
              shippingComune,
              shippingCountry,
            }),
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="Nombre" />
            <FormInput required name="lastName" label="Apellido" />
            <FormInput required name="address1" label="Dirección" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Comuna de envio</InputLabel>
              <Select
                value={shippingComune}
                fullWidth
                onChange={(e) => setShippingComune(e.target.value)}
              >
                {[
                  "Puente Alto",
                  "La Florida",
                  "San Joaquín",
                  "La Granja",
                  "San Ramón",
                  "La Cisterna",
                  "Macul",
                  "Peñalolén",
                  "San Miguel",
                ].map((comuna) => (
                  <MenuItem key={comuna} value={comuna}>
                    {comuna}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

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
