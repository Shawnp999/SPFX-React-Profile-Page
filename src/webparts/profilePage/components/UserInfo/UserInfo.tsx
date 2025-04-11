import * as React from 'react';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import BirthdayComp from '../BirthdayComponent/BirthdayComp';
import styles from './UserInfo.module.scss';
import * as strings from 'ProfilePageWebPartStrings';

interface IUserInfoProps {
  user: MicrosoftGraph.User | undefined;
  handleSaveUserPropertyMethod: any;
  manager: MicrosoftGraph.User | null | undefined;
  _isMyProfile: boolean;
  correctUserDepartmentName: (incorrectDepartmentName: string | undefined) => string;
  groupEmail: string | undefined;
  ExcelBirthday : string;
}

const UserInfo: React.FC<IUserInfoProps> = ({ user, manager, handleSaveUserPropertyMethod, _isMyProfile, correctUserDepartmentName, groupEmail, ExcelBirthday }) => {

  const getManagerNameLetters = (manager: MicrosoftGraph.User | string): string => {
    if (typeof manager === 'string') {
      return manager;
    }

    const nameParts: Array<string> = manager?.displayName?.split(' ') || [];

    if (nameParts.length < 2) {
      return '';
    }

    const lastName = nameParts[0].charAt(0);
    const firstName = nameParts[1].charAt(0);

    return lastName + firstName;
  };

  const transformText = (text: string, minLength: number, maxParts: number): React.ReactNode => {

    if (!text || text.length <= minLength) {
      return text || '';
    }

    const textParts = text.split(' ');

    if (textParts.length <= maxParts) {
      return text;
    }

    return (
      <>
        {textParts.slice(0, maxParts).join(' ')}
        <br />
        {textParts.slice(maxParts).join(' ')}
      </>
    );
  };

  const formatMobilePhone = (mobilePhone: string | undefined): string => {

    if (!mobilePhone) {
      return '';
    }

    // check if phonenumber has +
    if (mobilePhone.startsWith('+')) {
      return formatPhoneNumber(mobilePhone);
    } else {
      return formatPhoneNumber('+' + mobilePhone);
    }
  };

  const formatPhoneNumber = (phoneNumber: string): string => {

    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // format phone number to +xxx xx xxx xx xx format
    return cleanedPhoneNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
  };

  
  const displayGroupEmail = (groupEmail: string | undefined | null): React.ReactNode => {
    if (groupEmail !== undefined && groupEmail !== null && groupEmail.trim() !== '') {
      const formattedGroupEmail = groupEmail;
      return formattedGroupEmail;
    } else {
      return null;
    }
  };
  

  


  const transformDisplayName = user ? transformText(user.displayName || '', 25, 2) : '';
  const transformDepartmentName = user ? transformText(correctUserDepartmentName(user.department || undefined) , 50, 2) : '';

  const managerLetter = manager ? getManagerNameLetters(manager) : '';
  const username = user ? user.mail?.replace('@uzmto.com', '') : '';
  
  const userPhotoUrl = user ? `https://eneraseg.sharepoint.com/sites/UZMTO2/foto_employees/${username}/profile.jpg` : '';
  const userManager: MicrosoftGraph.User | undefined = user?.manager as MicrosoftGraph.User | undefined;
  const isManagerUndefined = userManager ?? true;

  const NoUserPhotoUrl = `https://eneraseg.sharepoint.com/sites/UZMTO2/foto_employees/NoPhoto/nophoto.jpg`;

  const transformDepartmentNameStr = transformDepartmentName as string;
  
  const shouldRenderGroupEmail = groupEmail !== null && groupEmail !== undefined && groupEmail.trim() !== '';

  const groupEmailRenderWithSep = shouldRenderGroupEmail ? `| ${displayGroupEmail(groupEmail)}` : '';
  const groupEmailRenderNoSep = shouldRenderGroupEmail ? displayGroupEmail(groupEmail) : '';

  const isLongDepartmentName = transformDepartmentNameStr.length >= 40;

  return (
    <div className={styles.cell}>
      <div className={styles.userContainer}>
        <div className={styles.row}>
        <div className={styles.photoContainer}>
          <img
            src={userPhotoUrl || NoUserPhotoUrl}
            alt="User Photo"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = NoUserPhotoUrl;
            }}
            style={{ width: '150px', height: '150px', borderRadius: '50%'}}
          />
        </div>
          <div className={styles.userInfoContainer}>
            <div className={styles.upperinfo}>
              <BirthdayComp
                handleSaveUserPropertyMethod={handleSaveUserPropertyMethod}
                userBirthday={user?.birthday}
                _isMyProfile={_isMyProfile}
                ExcelBirthday={ExcelBirthday}
              />
              <div className={styles.displayName}>{transformDisplayName} </div>
            </div>
            <div className={styles.lowerinfo}>
              <div className={`${styles.department} ${styles.userInfoCnt}`}>
              <span>
                <span>{transformDepartmentName} &nbsp;</span>
                <span className={styles.withGroupEmail}>
                  {isLongDepartmentName && <br />}
                  {isLongDepartmentName ? groupEmailRenderNoSep : groupEmailRenderWithSep}
                </span>
              </span>
                {manager && (
                  <div
                    className={styles.managerLetters}
                    onClick={() => (window.location.href = `https://eneraseg.sharepoint.com/sites/UZMTO2/SitePages/profile-page.aspx?userId=${manager.id}`)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: isManagerUndefined ? '#acbdce' : '#red',
                    }}
                  >
                    <div className={styles.tooltip} data-tooltip={isManagerUndefined ? (strings.UserInfo_ManagerTitle) + " " +  manager.displayName as string : (strings.UserInfo_NoManager)}>
                      {managerLetter}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.department + ' ' + styles.userInfoCnt}>{user?.jobTitle}</div>
              <div className={styles.department + ' ' + styles.userInfoCnt}>{user?.mail}</div>
              <div className={`${styles.department} ${styles.userInfoCnt}`} style={{ justifyContent: 'unset' }}>
                <span className={styles.spanclass}>{strings.UserInfo_InnerPhone}: &nbsp;</span> {user?.businessPhones?.join(',')}
              </div>
              <div className={`${styles.department} ${styles.userInfoCnt}`}>{formatMobilePhone(user!.mobilePhone!)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default UserInfo;
