import React from 'react'
import UserDefaultIcon from '../../../img/img_568657.png'
import { ProfileType } from '../../../Types/types'
import Loader from '../../Loader/Loader'
import styles from './Profile.module.scss'

type PropsType = {
    profile: ProfileType | null
    deactivate: () => void 
    isOwner: boolean
    loadProfilePhoto: () => void
}

const Profile: React.FC<PropsType> = ({profile, deactivate, isOwner, loadProfilePhoto}) => {

  if(!profile) {
    return <Loader />
  }

  return (
    <div className={styles.root}>
      <div className={styles.user_icon}>
        <img src={profile.photos.large || UserDefaultIcon} alt={profile.fullName}/>
      </div>
      <div className={styles.user_name}>
        <span>Name</span>{profile.fullName}
      </div>
      <div className={styles.user_about}>
        <span>Status</span>{profile.aboutMe}
      </div>
      
    </div>
  );
}

export default Profile