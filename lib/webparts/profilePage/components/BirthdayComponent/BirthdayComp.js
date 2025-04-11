import * as React from 'react';
// import * as moment from 'moment';
// import { useState, useRef } from 'react';
// import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
// import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import styles from './BirthdayComp.module.scss';
var BirthdayComp = function (_a) {
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    // const [newBirthday, setNewBirthday] = useState<string>(userBirthday || '');
    // const inputRef = useRef<HTMLInputElement>(null);
    var /*handleSaveUserPropertyMethod, userBirthday, _isMyProfile ,*/ ExcelBirthday = _a.ExcelBirthday;
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            React.createElement("span", { className: styles.birthday }, ExcelBirthday))));
};
export default BirthdayComp;
//# sourceMappingURL=BirthdayComp.js.map