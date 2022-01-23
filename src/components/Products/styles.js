import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#fff0c2',
    padding: theme.spacing(7),    
  },
  root: {
    flexGrow: 1,
  },
}));