import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: '0 auto',
      paddingTop: '50px',
      textAlign: 'center',
      //fontWeight: '700',
      fontSize: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    media: {
        height: 0,
        paddingTop: '70%', 
    },
    paper: {
        width: 275,
        marginTop: '20px',
        '&:hover': {
            //transform: 'scale(1.02)',
            backgroundColor: '#eceff1'
        }
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    element: {
        display: 'flex',
        justifyContent: 'left',
        marginLeft: '20px',
        maxWidth: '70%',
        marginBottom: '10px'
    },
    elementChild: {
        marginLeft: '20px',
    },
    addPhotoBtn: {
        color: 'black',
        backgroundColor: '#0091ea'
    },
    alertPaper: {
        width: '280px',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#eeeeee'
    },
    alertPaperTitle: {
        textAlign: 'center',
        color: 'red'
    },
    alertPaperInput: {
        marginTop: '15px',
    },
})