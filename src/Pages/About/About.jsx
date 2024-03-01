import React from "react";
import { Container, Paper, Box, Typography, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { styled } from "@mui/material/styles";
import aboutPic from "../../assests/Agua_pura.png";

const About = () => {
  const classes = useStyles();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <main className={classes.root}>
      <Container className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            <Item elevation={6} sx={{ objectFit: "cover" }}>
              <img
                className={classes.aboutPic}
                src={aboutPic}
                alt="about img"
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Item elevation={6}>
              <Typography variant="h5">Sobre nosotros</Typography>
              <Typography variant="subtitle1" className={classes.paragraph}>
                Somos una empresa familiar creada el año 2018 luego de la
                necesidad de crecimiento e independencia laboral. Todo comenzó
                con la creación de mi ruta de trabajo puerta a puerta,
                manteniendo aún mucho de mis clientes de aquella época.
              </Typography>
            </Item>
            <Item elevation={6}>
              <Typography variant="subtitle2">
                Con el apoyo de mi esposa e hijos nuestra empresa se ha
                caracterizado por entregar un producto de calidad, con un
                apasionado trabajo en equipo orientado al servicio del cliente
                con una resolución de problemas basado en la comunicación,
                honestidad y confianza.
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default About;
