import * as React from 'react';
// import { Moment } from 'moment';
// import * as moment from 'moment';
import styles from './socialsandother.module.scss';
import { useState /*, useEffect */ } from 'react';
import {  Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import * as strings from 'ProfilePageWebPartStrings';
import { UserMedia } from  '../Useruzmto/UzmtoUser'
import { getWorkTime} from '../Utilities/UzmtoUtils';
import dialogStyles from '../Utilities/UzmtoDialogStyles';
import * as moment from 'moment';
// import { Moment } from 'moment';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';


interface SocialsAndOtherProps {
  user: MicrosoftGraph.User | undefined;
  hiredate: string | undefined;
  _isMyProfile: boolean;
  media: UserMedia;
  onSaveMedia: (editedMedia: any) => void;
  firstPart: string;
  secondPart: string;
  excelHireDate? : string;
}

const SocialsAndOther: React.FC<SocialsAndOtherProps> = ({ hiredate, media, onSaveMedia, _isMyProfile, firstPart , secondPart, excelHireDate, user}) => {
  //const [loadedUserMedia, setLoadedUserMedia] = useState<UserMedia>(media);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedSocialMediaLinks, setEditedSocialMediaLinks] = useState<UserMedia>({ ...media });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  
  
  const isSaveDisabled = () => {
    return (
      JSON.stringify(media) === JSON.stringify(editedSocialMediaLinks)
    );
  };
  
  const openEditDialog = () => {
    setEditedSocialMediaLinks({
      instagram: media.instagram || '',
      meta: media.meta || '',
      telegram: media.telegram || '',
      twitter: media.twitter || '',
      linkedin: media.linkedin || '',
    });
    setIsEditing(true);
  };


  const handleSaveSocialMedia = () => {
    setValidationErrors({});
  
    const invalidSocials: string[] = [];
    Object.keys(editedSocialMediaLinks).forEach((social) => {
      const value: string = editedSocialMediaLinks[social as keyof typeof editedSocialMediaLinks] || '';
      let isValid: boolean;
      switch (social) {
        case 'instagram':
          isValid = isValidInstagramUsername(value);
          break;
        case 'telegram':
          isValid = isValidTelegramUsername(value);
          break;
        case 'twitter':
          isValid = isValidTwitterUsername(value);
          break;
        case 'meta':
          isValid = isValidIMetaUsername(value);
          break;
        default:
          isValid = false;
      }

      if (value && !isValid) {
        invalidSocials.push(social);
      }
    });
  
    if (invalidSocials.length > 0) {
      const newValidationErrors: { [key: string]: string } = {};
      invalidSocials.forEach((social) => {
        newValidationErrors[social] = `${strings.Social_Invalid}  ${social.charAt(0).toUpperCase() + social.slice(1)} ${strings.Social_Username}`;
      });
      setValidationErrors(newValidationErrors);
      return;
    }
  
    onSaveMedia(editedSocialMediaLinks);
    //setLoadedUserMedia({ ...editedSocialMediaLinks });
    setIsEditing(false)
    
  };

  const editIndividualSocialMedia = (social: string, value: string) => {
    setEditedSocialMediaLinks({
      ...editedSocialMediaLinks,
      [social]: value,
    });
  };
  
 

 
  //Validating usernames -------------
  const isValidTwitterUsername = (username: string): boolean => {

    const regex = /^[a-zA-Z0-9_]{4,50}$/; // 4-50 characters, A-Z, 0-9, and _
    return regex.test(username);
  };

  const isValidInstagramUsername = (username: string): boolean => {

    const regex = /^[a-zA-Z0-9_.]{1,30}$/; //30 characters, a-z , 0-9 , _ and .
    return regex.test(username);
  };

  const isValidIMetaUsername = (username: string): boolean => {

    const regex = /^[a-zA-Z0-9.]{5,50}$/; //5-50 characters, A-Z , 0-9 , and .
    return regex.test(username);
  };

  const isValidTelegramUsername = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9_]{5,32}$/; // 5-32 charactrrs, A-Z, 0-9, and _
    return regex.test(username);
  };

  const isValidLinkedInUsername = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9_]{5,30}$/; // 5-32 charactrrs, A-Z, 0-9, and _
    return regex.test(username);
  };
//-------------------------------------------------------------
  const instUserName = media.instagram;
  const isInstagramUsernameValid = instUserName ? isValidInstagramUsername(instUserName) : false;
  let instaURL = isInstagramUsernameValid ? `https://www.instagram.com/${instUserName}` : '#';

  const teleUserName = media.telegram;
  const isTelegramUsernameValid = teleUserName ? isValidTelegramUsername(teleUserName) : false;
  let teleURL = isTelegramUsernameValid ?  `https://t.me/${teleUserName}` : '#' ;

  const LinkedInUserName = media.linkedin;
  const isLinkedInUsernameValid = LinkedInUserName ? isValidLinkedInUsername(LinkedInUserName) : false;
  const LinkedInURL = isLinkedInUsernameValid ? `https://www.linkedin.com/in/${LinkedInUserName}` : '#';

  const TwitterUserName = media.twitter;
  const isTwitterUsernameValid = TwitterUserName ? isValidTwitterUsername(TwitterUserName) : false;
  let TwitterURL = isTwitterUsernameValid ? `https://twitter.com/${TwitterUserName}` : '#';

  const MetaUserName = media.meta;
  const isMetaUserNameValid = MetaUserName ? isValidIMetaUsername(MetaUserName) : false;
  let MetaURL = isMetaUserNameValid ? `https://facebook.com/${MetaUserName}` : '#';
  //--------------------------------------------------------
  const socialPlaceholders: {[key: string]: string;} =
  {
    instagram: 'https://www.instagram.com/',
    linkedin:'https://www.linkedin.com/in/' ,
    twitter: 'https://twitter.com/',
    telegram:  'https://t.me/',
    meta: 'https://facebook.com/'
  };



  //formatting and rendering vacation dates

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString || !moment(dateString, 'YYYY-MM-DD', true).isValid()) {
      return '';
    }
    return moment(dateString).format('DD.MM.YYYY');
  };
  
  const firstformattedDate = formatDate(firstPart);
  //console.log('formattedDate second part',firstformattedDate);

  const secondformattedDate = formatDate(secondPart);
  //console.log('formattedDate second part',secondformattedDate);


  // Calculate by adding 14 days 
  const addDays = (dateString: string | undefined, days: number): string => {
    if (!dateString || !moment(dateString, 'YYYY-MM-DD', true).isValid()) {
      return '';
    }
    return moment(dateString).add(days, 'days').format('DD.MM.YYYY');
  };
  
  const datePlus14First = addDays(firstPart, 14);
  // console.log('datePlus14First:', datePlus14First);
  
  const datePlus14Second = addDays(secondPart, 14);
  // console.log('datePlus14Second:', datePlus14Second);
  
  const applyStrikethrough = (date: string | null, currentDate: string): React.CSSProperties => {
    return { textDecoration: date && moment(date, 'DD.MM.YYYY').isBefore(moment(currentDate, 'DD.MM.YYYY')) ? 'line-through' : 'none' };
  };
  
  const currentDate = moment().format('DD.MM.YYYY');
  // console.log('currentDate', currentDate);
  
  const renderDate = (fromDate: string, toDate: string): React.ReactNode => (
    <div style={applyStrikethrough(toDate, currentDate)}>
      {toDate ? `${strings.Social_from} ${fromDate} ${strings.Social_To} ${toDate}` : 'No Data'}
    </div>
  );
  
  const UserVacationDates1 = (
    <span>
      {firstformattedDate === '30.12.1899' ? 'No Data' : renderDate(firstformattedDate, datePlus14First)}
    </span>
  );
  
  const UserVacationDates2 = (
    <span>
      {secondformattedDate === '30.12.1899' ? 'No Data' : renderDate(secondformattedDate, datePlus14Second)}
    </span>
  );
  

  const formattedHireDate = excelHireDate === '30.12.1899' ? '' : formatDate(excelHireDate);
  const RenderFormattedHireDate = formattedHireDate === '30.12.1899' ? '' : formattedHireDate;

  //console.log('formattedHireDate',formattedHireDate)


  const userId = user?.id
  
  //const workTime = excelHireDate === '1899.12.30' ? 'No Data' : getWorkTime(formattedHireDate);

  const RenderWorkTime = formattedHireDate === '30.12.1899' ? 'No Data' :  getWorkTime(formattedHireDate);
  


  return (
    <div className={styles.firstBox}>
      <div className={styles.lowerinfo}>
        <div className={styles.bluebox}>
          <div className={styles.colorbox}>
          <span className={styles.jobDuration}>{strings.Social_ProjectTime} <br/>&nbsp;{RenderFormattedHireDate} &nbsp; </span> <br/>
            <span className={styles.workTime}>| &nbsp; {RenderWorkTime} </span>
          </div>
          <div className={styles.socialIconContainer}>
            {Object.keys(media).every((key) => (media as any)[key] === "") ? (
              <div>
                {_isMyProfile ? (
                  <div className={styles.editIcon}>
                    <div className={styles.addSocialsBox}> {strings.Social_addLinks} &nbsp; </div>
                  </div>
                ) : (
                  <div className={styles.addSocialsBox}>{strings.Social_noSocialNetworks}</div>
                )}
              </div>
            ) : (
              <div className={styles.socialIconContainer}>
                {media && media.meta && <a href={MetaURL} target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.meta}`} />}
                {media && media.instagram && (
                  <div className={styles.instasocials}>
                    <a href={instaURL} target="_blank" rel="noopener noreferrer" className={styles.insta} />
                  </div>
                )}
                {media && media.linkedin && (<a href={LinkedInURL} target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.linkedin}`} />)}
                {media && media.telegram && (<a href={teleURL} target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.telegram}`} />)}
                {media && media.twitter && (<a href={TwitterURL} target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.twitter}`} />)}
              </div>
            )}

            {_isMyProfile && (
              <div className={styles.editIcon} onClick={openEditDialog}>
                <div className={styles.pencil} />
              </div>
            )}
          </div>

        </div>

        <PrimaryButton 
          href={`https://eneraseg.sharepoint.com/sites/UZMTO2/SitePages/Seating-Map.aspx?userId=${userId}`} 
          target="_blank"
          className={styles.greencolorboxSeat}
          styles={{ root: { border: 'none' } }}
        >
          Where I sit
        </PrimaryButton>


        
        <div className={styles.greenbox}>
          <div>
            <div className={styles.labels}>{strings.Social_vacationPlan} &nbsp;</div>
          </div>
          {UserVacationDates1 || UserVacationDates2 ? (
            <>
              <div className={styles.greencolorbox}>{UserVacationDates1}</div>
              <div className={styles.greencolorbox}>{UserVacationDates2}</div>
            </>
          ) : (
            <div >{strings.Skills_NoData}</div>
          )}
        </div>

      </div>
    
        <Dialog 
          hidden={!isEditing}
          styles={dialogStyles}         
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: strings.Social_editSocialMedia,
          }}
        >
          <div className={styles.socialEditDialog}>

          {Object.keys(editedSocialMediaLinks).map((social) => (

              <div key={social} className={styles.socialEditRow}>
                
                <div className={styles.firsthalf}>
                  {styles[social as keyof typeof styles] && (
                    <div className={`${styles.socialIcon} ${styles[social as keyof typeof styles]}`} />
                  )}
                  {social === 'instagram' && styles.insta && (
                    <div className={styles.instasocials}>
                      <div className={styles.insta}></div>
                    </div>
                  )}
                  <label className={styles.socialslabel}>{social.charAt(0).toUpperCase() + social.slice(1)}</label>
                </div>
                
                <div className={styles.coloumnbox}>
                  
                  <div className={styles.socialInputContainer}>
                    <span className={styles.linkStyle}>
                      {socialPlaceholders[social]}
                    </span>
                    <input
                      type="text"
                      value={editedSocialMediaLinks[social as keyof typeof editedSocialMediaLinks] || ''}
                      onChange={(e) => {
                        setValidationErrors((prevErrors) => ({ ...prevErrors, [social]: '' }));
                        editIndividualSocialMedia(social, e.target.value);
                      }}
                      className={styles.inputStyle}
                    />
                  </div>

                  <div className={styles.errorbox}>
                    {validationErrors[social] && (
                      <div className={styles.errorMessage}>{validationErrors[social]}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
          </div>    

          <DialogFooter>
            <PrimaryButton onClick={handleSaveSocialMedia} text= {strings.Social_save} disabled={isSaveDisabled()} />
            <DefaultButton onClick={(e) => { e.preventDefault(); setIsEditing(false); }} text={strings.Social_cancel} />
          </DialogFooter>

        </Dialog>
    
    </div>
  );
};

export default SocialsAndOther;



