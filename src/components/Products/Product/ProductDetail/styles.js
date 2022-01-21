import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    root: {
        maxWidth: 850,
        display: 'flex',
        paddingTop: '100px',
    },
    media: {
        width: "100%",
        objectFit: 'contain'
    },
    item: {
      backgroundColor: '#a6fff9'
    },
    siZes: {
        textAlign: 'start'
    },
    buttonGroup: {
        display: 'flex',
        padding: '12px'
    },
    picGroup: {
        display: 'flex',
        padding:  '12px'
    },
    pictures: {
        width: '25px',
        objectFit: 'contain'
    }
}))