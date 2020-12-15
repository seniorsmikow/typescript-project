import React from 'react';
import Loader from '../../Loader/Loader';
import Status from './Status/Status';
import InstagramIcon from '@material-ui/icons/Instagram';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import TwitterIcon from '@material-ui/icons/Twitter';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import icon from '../../../img/img_568657.png';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import ProfileForm from '../../Forms/ProfileForm/ProfileForm';


const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: '0 auto',
      paddingTop: '50px',
      textAlign: 'center',
      fontWeight: '700',
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
});



const Profile = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    if(!props.profile) {
        return <Loader />
    }

    const submitPhoto = event => {
        if(event.currentTarget.files.length) {
            props.loadProfilePhoto(event.currentTarget.files[0]);
        }
    };

    return (
        <div className={classes.root}>
            Profile page
            <Divider />
            <Paper elevation={3} className={classes.paper}>
                <div className={classes.wrapperProfile}>
                    <CardMedia
                    className={classes.media}
                    image={props.profile.photos.large ? props.profile.photos.large : icon}
                    title="user icon"
                    alt="user icon"
                    />

                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                        {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <Typography className={classes.typography}>
                                    <Paper className={classes.alertPaper}>
                                        <div className={classes.alertPaperTitle}>
                                            Сменить фотографию (не более 10 Mb)
                                        </div>
                                        <input type={"file"} className={classes.alertPaperInput} onChange={submitPhoto}/>
                                    </Paper>
                                </Typography>
                            </Paper>
                        </Fade>
                        )}
                    </Popper>

                    {
                        props.isOwner ? <IconButton aria-label="delete" className={classes.addPhotoBtn} onClick={handleClick('top')}>
                                            <BackupIcon />
                                        </IconButton>
                                    : null
                    }
                        
                    <Divider />
                    <div className={classes.element}>
                        <RecordVoiceOverIcon />
                        <div className={classes.elementChild}>
                            <Status status={props.status} deactivate={props.deactivate}/>
                        </div>
                    </div>
                    
                    <div className={classes.element}>
                        <LocalLibraryIcon />
                        <div className={classes.elementChild}>
                            {props.profile.fullName}
                        </div>
                    </div>
                    
                    <div className={classes.element}>
                        <TwitterIcon />
                        <div className={classes.elementChild}>
                            <a href={props.profile.contacts.twitter}>twitter</a>
                        </div>
                    </div>
                    <div className={classes.element}>
                        <InstagramIcon />
                        <div className={classes.elementChild}>
                            <a href={props.profile.contacts.instagram}>instagram</a>
                        </div>
                    </div>
                </div>
                <ProfileForm />
            </Paper>
        </div>
    )
};

export default Profile;