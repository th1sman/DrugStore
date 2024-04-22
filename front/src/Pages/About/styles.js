import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  content: {
    maxWidth: "1200px", // Limita el ancho máximo para una mejor lectura
    margin: "0 auto", // Centra el contenido
    padding: theme.spacing(3),
  },
  aboutPic: {
    objectFit: "cover", // Cambia a 'cover' para que la imagen cubra el espacio asignado
    width: "100%",
    height: "auto", // Ajusta la altura automáticamente
    borderRadius: "8px", // Bordes redondeados para las imágenes
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  paragraph: {
    color: "#333", // Color de texto más oscuro para mejor contraste
    fontSize: "1rem", // Tamaño de fuente estándar para párrafos
    lineHeight: "1.6", // Espaciado de línea para mejorar la legibilidad
    padding: theme.spacing(2), // Ajusta el relleno
    backgroundColor: "#fff", // Fondo blanco para los párrafos para destacar sobre el fondo
    borderRadius: "4px", // Bordes redondeados para los párrafos
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
}));
