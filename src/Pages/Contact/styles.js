import { makeStyles } from "@material-ui/core/styles";


export default makeStyles ((theme) => ({

    root: {
        backgroundColor: '#fff0c2',
        height: '100vh',
    },
    content: {
        flexGrow: 1,
        paddingTop: '100px',
        backgroundColor: '#fff0c2'

    },
    contactSection: {
        display: 'flex',
        justifyContent: 'center',
    },
    contactWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '30px',
    },
    item: {
        paddingTop: '150px'
    },
    contactContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactTitle: {
        color: '#1c2237',
        marginBottom: '24px'
    },
    icon: {
        border: '2px solid green',
        fontSize: '400px',
    }
}))