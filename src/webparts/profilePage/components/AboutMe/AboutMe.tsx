import * as React from 'react';
import { useState, useRef } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
//import { mergeStyles } from '@fluentui/react';
import styles from './AboutMe.module.scss';
import { Fabric } from 'office-ui-fabric-react';
// import * as strings from '/Projects/uzmto/sharepoint/spwebparts/uzmto-profilePage-react/src/webparts/profilePage/loc/mystrings'; 
import * as strings from 'ProfilePageWebPartStrings';
import dialogStyles from '../Utilities/UzmtoDialogStyles';

interface AboutMeProps {
  aboutMe: string;
  onSave: (value: { aboutMe: string }) => void;
  _isMyProfile: boolean;
}

const AboutMe: React.FC<AboutMeProps> = ({ aboutMe, onSave, _isMyProfile }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const textAreaAboutMeRef = useRef<HTMLTextAreaElement>(null);

  const handleSaveAboutMe = () => {
    if (textAreaAboutMeRef && textAreaAboutMeRef.current) {
      onSave({
        aboutMe: textAreaAboutMeRef.current.value,
      });
      setIsEditMode(false);
    }
  };

  const handleCancelAboutMe = () => {
    setIsEditMode(false);
  };


  return (
    <>
      <div className={styles.aboutmecont}>
        <div className={styles.labelRow}>
          {strings.AboutMeLabel} &nbsp;

          {_isMyProfile && (
            <div className={styles.editIcon} onClick={() => setIsEditMode(true)} title={strings.EditIconTitle}>
              <div className={styles.pencil} />
            </div>
          )}

        </div>  
        <div className={styles.editstyles}>
          {aboutMe}
        </div>
      </div>

      <Fabric className="foo">
        <Dialog
          hidden={!isEditMode}
          styles={dialogStyles}
          dialogContentProps={{
            type: DialogType.normal,
            title: strings.EditDialogTitle,
          }}
        >
          <div>
            <textarea defaultValue={aboutMe} ref={textAreaAboutMeRef} className={styles.editstyles2}></textarea>
          </div>

          <DialogFooter>
            <PrimaryButton onClick={handleSaveAboutMe} text={strings.SaveButton} />
            <DefaultButton onClick={handleCancelAboutMe} text={strings.CancelButton} />
          </DialogFooter>
        </Dialog>
      </Fabric>
    </>
  );
};

export default AboutMe;


// {
//   "resource": "Microsoft Graph",
//   "scope": "Sites.ReadWrite.All"
// },
// {
//   "resource": "Microsoft Graph",
//   "scope": " Files.ReadWrite"
// }


