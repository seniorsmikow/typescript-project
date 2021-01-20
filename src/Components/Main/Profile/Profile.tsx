import React from 'react'
import Loader from '../../Loader/Loader'
import Status from './Status/Status'
import InstagramIcon from '@material-ui/icons/Instagram'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import TwitterIcon from '@material-ui/icons/Twitter'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import icon from '../../../img/img_568657.png'
import IconButton from '@material-ui/core/IconButton'
import BackupIcon from '@material-ui/icons/Backup'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import ProfileForm from '../../Forms/ProfileForm/ProfileForm'
import { useStyles } from './styles'

import { ProfileType } from '../../../Types/types'


type PropsType = {
    profile: ProfileType
    status: string
    deactivate: () => void
    loadProfilePhoto: () => void
    isOwner: boolean
}

const Profile: React.FC<PropsType> = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();

    const handleClick = (newPlacement: any) => (event: any) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    if(!props.profile) {
        return <Loader />
    }

    // const submitPhoto = (event: any) => {
    //     if(event.currentTarget.files.length) {
    //         props.loadProfilePhoto(event.currentTarget.files[0]);
    //     }
    // };

    return (
        <div className={classes.root}>
            Profile page
            <Divider />
            <Paper elevation={3} className={classes.paper}>
                <div>
                    {/* <CardMedia
                        className={classes.media}
                        image={props.profile.photos.large ? props.profile.photos.large : icon}
                        title="user icon"
                        alt="user icon"
                    /> */}

                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                        {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <Typography>
                                    <Paper className={classes.alertPaper}>
                                        <div className={classes.alertPaperTitle}>
                                            Сменить фотографию (не более 10 Mb)
                                        </div>
                                        {/* <input type={"file"} className={classes.alertPaperInput} onChange={submitPhoto}/>  */}
                                        <input type={"file"} className={classes.alertPaperInput}/>
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

export default Profile