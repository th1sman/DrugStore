import { makeStyles } from "@material-ui/core/styles";

export default makeStyles ((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#ff9aa2',
    },
    content: {
        flexGrow: 1,
        paddingTop: '5rem',
        alignItems: 'center',
    },
    homeText: {
      lineHeight: '140%'
    },
    homeImg: {
      width: '360px',
      height: '380px',
    }
}))