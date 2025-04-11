import * as React from 'react';
// import * as moment from 'moment';
// import { useState, useRef } from 'react';
// import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
// import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import styles from './BirthdayComp.module.scss';
// import 'moment/locale/ru';
// import * as strings from 'ProfilePageWebPartStrings';

// moment.locale(
//   strings.BirthdayComp_Placeholder === 'Enter date of birth' ? 'en' : 'ru'
// );

interface User {
  birthday: string | undefined | null;
}

interface BirthdayCompProps {
  handleSaveUserPropertyMethod: (user: User) => void;
  userBirthday: string | undefined | null;
  _isMyProfile: boolean;
  ExcelBirthday: string;

}

const BirthdayComp: React.FC<BirthdayCompProps> = ({ /*handleSaveUserPropertyMethod, userBirthday, _isMyProfile ,*/ ExcelBirthday }) => {
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  // const [newBirthday, setNewBirthday] = useState<string>(userBirthday || '');
  // const inputRef = useRef<HTMLInputElement>(null);

  // const nobday = (value: any): value is null | undefined => {
  //   return value === null || value === undefined || (moment(value).year() <= 1900);
  // };

  // const handleSaveClick = () => {
  //   try {
  //     const updatedUser: User = {
  //       birthday: nobday(newBirthday) ? undefined : newBirthday,
  //     };
  //     handleSaveUserPropertyMethod(updatedUser);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error('Error while saving:', error);
  //   }
  // };

  // console.log('Render: isEditing', isEditing);
  // console.log('Render: newBirthday', newBirthday);
  // console.log('Render: userBirthday', userBirthday);

  //console.log('ExcelBirthdayinbirthdaycomp',ExcelBirthday)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className={styles.birthday}>
          {ExcelBirthday}            
        </span>
      </div>

      {/* {isEditing && (
        <Dialog
          hidden={!isEditing}
          onDismiss={() => setIsEditing(false)}
          dialogContentProps={{
            type: DialogType.normal,
            title: strings.BirthdayComp_EditDialogTitle,
          }}
        >
          <div>
          <input
            type="date"
            value={newBirthday ? moment(newBirthday).format('YYYY-MM-DD') : ''}
            onChange={(e) => setNewBirthday(e.target.value)}
            ref={inputRef}
            placeholder={userBirthday ? moment(userBirthday).format('YYYY-MM-DD') : ''}
          />
          </div>

          <DialogFooter>
            <PrimaryButton onClick={handleSaveClick} text={strings.BirthdayComp_SaveButton} />
            <DefaultButton onClick={() => setIsEditing(false)} text={strings.BirthdayComp_CancelButton} />
          </DialogFooter>
        </Dialog>
      )} */}
    </>
  );
};

export default BirthdayComp;
