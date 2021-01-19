import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      position: 'fixed',
      width: '100%',
      backgroundColor: '#25323a',
      zIndex: 2,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    nav: {
      color: '#fff',
      fontSize: 20
    },
    login: {
        display: 'flex',
        minWidth: 250,
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 20
    },
}));