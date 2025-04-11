import * as React from 'react';
import BirthdayComp from '../BirthdayComponent/BirthdayComp';
import styles from './UserInfo.module.scss';
import * as strings from 'ProfilePageWebPartStrings';
var UserInfo = function (_a) {
    var _b, _c;
    var user = _a.user, manager = _a.manager, handleSaveUserPropertyMethod = _a.handleSaveUserPropertyMethod, _isMyProfile = _a._isMyProfile, correctUserDepartmentName = _a.correctUserDepartmentName, groupEmail = _a.groupEmail, ExcelBirthday = _a.ExcelBirthday;
    var getManagerNameLetters = function (manager) {
        var _a;
        if (typeof manager === 'string') {
            return manager;
        }
        var nameParts = ((_a = manager === null || manager === void 0 ? void 0 : manager.displayName) === null || _a === void 0 ? void 0 : _a.split(' ')) || [];
        if (nameParts.length < 2) {
            return '';
        }
        var lastName = nameParts[0].charAt(0);
        var firstName = nameParts[1].charAt(0);
        return lastName + firstName;
    };
    var transformText = function (text, minLength, maxParts) {
        if (!text || text.length <= minLength) {
            return text || '';
        }
        var textParts = text.split(' ');
        if (textParts.length <= maxParts) {
            return text;
        }
        return (React.createElement(React.Fragment, null,
            textParts.slice(0, maxParts).join(' '),
            React.createElement("br", null),
            textParts.slice(maxParts).join(' ')));
    };
    var formatMobilePhone = function (mobilePhone) {
        if (!mobilePhone) {
            return '';
        }
        // check if phonenumber has +
        if (mobilePhone.startsWith('+')) {
            return formatPhoneNumber(mobilePhone);
        }
        else {
            return formatPhoneNumber('+' + mobilePhone);
        }
    };
    var formatPhoneNumber = function (phoneNumber) {
        var cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        // format phone number to +xxx xx xxx xx xx format
        return cleanedPhoneNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
    };
    var displayGroupEmail = function (groupEmail) {
        if (groupEmail !== undefined && groupEmail !== null && groupEmail.trim() !== '') {
            var formattedGroupEmail = groupEmail;
            return formattedGroupEmail;
        }
        else {
            return null;
        }
    };
    var transformDisplayName = user ? transformText(user.displayName || '', 25, 2) : '';
    var transformDepartmentName = user ? transformText(correctUserDepartmentName(user.department || undefined), 50, 2) : '';
    var managerLetter = manager ? getManagerNameLetters(manager) : '';
    var username = user ? (_b = user.mail) === null || _b === void 0 ? void 0 : _b.replace('@uzmto.com', '') : '';
    var userPhotoUrl = user ? "https://eneraseg.sharepoint.com/sites/UZMTO2/foto_employees/".concat(username, "/profile.jpg") : '';
    var userManager = user === null || user === void 0 ? void 0 : user.manager;
    var isManagerUndefined = userManager !== null && userManager !== void 0 ? userManager : true;
    var NoUserPhotoUrl = "https://eneraseg.sharepoint.com/sites/UZMTO2/foto_employees/NoPhoto/nophoto.jpg";
    var transformDepartmentNameStr = transformDepartmentName;
    var shouldRenderGroupEmail = groupEmail !== null && groupEmail !== undefined && groupEmail.trim() !== '';
    var groupEmailRenderWithSep = shouldRenderGroupEmail ? "| ".concat(displayGroupEmail(groupEmail)) : '';
    var groupEmailRenderNoSep = shouldRenderGroupEmail ? displayGroupEmail(groupEmail) : '';
    var isLongDepartmentName = transformDepartmentNameStr.length >= 40;
    return (React.createElement("div", { className: styles.cell },
        React.createElement("div", { className: styles.userContainer },
            React.createElement("div", { className: styles.row },
                React.createElement("div", { className: styles.photoContainer },
                    React.createElement("img", { src: userPhotoUrl || NoUserPhotoUrl, alt: "User Photo", onError: function (e) {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = NoUserPhotoUrl;
                        }, style: { width: '150px', height: '150px', borderRadius: '50%' } })),
                React.createElement("div", { className: styles.userInfoContainer },
                    React.createElement("div", { className: styles.upperinfo },
                        React.createElement(BirthdayComp, { handleSaveUserPropertyMethod: handleSaveUserPropertyMethod, userBirthday: user === null || user === void 0 ? void 0 : user.birthday, _isMyProfile: _isMyProfile, ExcelBirthday: ExcelBirthday }),
                        React.createElement("div", { className: styles.displayName },
                            transformDisplayName,
                            " ")),
                    React.createElement("div", { className: styles.lowerinfo },
                        React.createElement("div", { className: "".concat(styles.department, " ").concat(styles.userInfoCnt) },
                            React.createElement("span", null,
                                React.createElement("span", null,
                                    transformDepartmentName,
                                    " \u00A0"),
                                React.createElement("span", { className: styles.withGroupEmail },
                                    isLongDepartmentName && React.createElement("br", null),
                                    isLongDepartmentName ? groupEmailRenderNoSep : groupEmailRenderWithSep)),
                            manager && (React.createElement("div", { className: styles.managerLetters, onClick: function () { return (window.location.href = "https://eneraseg.sharepoint.com/sites/UZMTO2/SitePages/profile-page.aspx?userId=".concat(manager.id)); }, style: {
                                    cursor: 'pointer',
                                    backgroundColor: isManagerUndefined ? '#acbdce' : '#red',
                                } },
                                React.createElement("div", { className: styles.tooltip, "data-tooltip": isManagerUndefined ? (strings.UserInfo_ManagerTitle) + " " + manager.displayName : (strings.UserInfo_NoManager) }, managerLetter)))),
                        React.createElement("div", { className: styles.department + ' ' + styles.userInfoCnt }, user === null || user === void 0 ? void 0 : user.jobTitle),
                        React.createElement("div", { className: styles.department + ' ' + styles.userInfoCnt }, user === null || user === void 0 ? void 0 : user.mail),
                        React.createElement("div", { className: "".concat(styles.department, " ").concat(styles.userInfoCnt), style: { justifyContent: 'unset' } },
                            React.createElement("span", { className: styles.spanclass },
                                strings.UserInfo_InnerPhone,
                                ": \u00A0"),
                            " ", (_c = user === null || user === void 0 ? void 0 : user.businessPhones) === null || _c === void 0 ? void 0 :
                            _c.join(',')),
                        React.createElement("div", { className: "".concat(styles.department, " ").concat(styles.userInfoCnt) }, formatMobilePhone(user.mobilePhone))))))));
};
export default UserInfo;
//# sourceMappingURL=UserInfo.js.map