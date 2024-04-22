import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid, FormHelperText } from "@material-ui/core";

const FormInput = ({ name, label, required }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name] ? errors[name].message : "";

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        defaultValue=""
        rules={{ required }}
        render={({ field }) => (
          <>
            <TextField
              {...field}
              label={label}
              fullWidth
              required={required}
              error={!!errorMessage}
              helperText={errorMessage}
            />
            {required && (
              <FormHelperText error={!!errorMessage}>
                {errorMessage || "Este campo es obligatorio"}
              </FormHelperText>
            )}
          </>
        )}
      />
    </Grid>
  );
};

export default FormInput;

