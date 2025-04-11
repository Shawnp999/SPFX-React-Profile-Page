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
var AboutMe = function (_a) {
    var aboutMe = _a.aboutMe, onSave = _a.onSave, _isMyProfile = _a._isMyProfile;
    var _b = useState(false), isEditMode = _b[0], setIsEditMode = _b[1];
    var textAreaAboutMeRef = useRef(null);
    var handleSaveAboutMe = function () {
        if (textAreaAboutMeRef && textAreaAboutMeRef.current) {
            onSave({
                aboutMe: textAreaAboutMeRef.current.value,
            });
            setIsEditMode(false);
        }
    };
    var handleCancelAboutMe = function () {
        setIsEditMode(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.aboutmecont },
            React.createElement("div", { className: styles.labelRow },
                strings.AboutMeLabel,
                " \u00A0",
                _isMyProfile && (React.createElement("div", { className: styles.editIcon, onClick: function () { return setIsEditMode(true); }, title: strings.EditIconTitle },
                    React.createElement("div", { className: styles.pencil })))),
            React.createElement("div", { className: styles.editstyles }, aboutMe)),
        React.createElement(Fabric, { className: "foo" },
            React.createElement(Dialog, { hidden: !isEditMode, styles: dialogStyles, dialogContentProps: {
                    type: DialogType.normal,
                    title: strings.EditDialogTitle,
                } },
                React.createElement("div", null,
                    React.createElement("textarea", { defaultValue: aboutMe, ref: textAreaAboutMeRef, className: styles.editstyles2 })),
                React.createElement(DialogFooter, null,
                    React.createElement(PrimaryButton, { onClick: handleSaveAboutMe, text: strings.SaveButton }),
                    React.createElement(DefaultButton, { onClick: handleCancelAboutMe, text: strings.CancelButton }))))));
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
//# sourceMappingURL=AboutMe.js.map