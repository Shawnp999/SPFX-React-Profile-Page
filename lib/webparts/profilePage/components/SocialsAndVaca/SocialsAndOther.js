var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
// import { Moment } from 'moment';
// import * as moment from 'moment';
import styles from './socialsandother.module.scss';
import { useState /*, useEffect */ } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import * as strings from 'ProfilePageWebPartStrings';
import { getWorkTime } from '../Utilities/UzmtoUtils';
import dialogStyles from '../Utilities/UzmtoDialogStyles';
import * as moment from 'moment';
var SocialsAndOther = function (_a) {
    var hiredate = _a.hiredate, media = _a.media, onSaveMedia = _a.onSaveMedia, _isMyProfile = _a._isMyProfile, firstPart = _a.firstPart, secondPart = _a.secondPart, excelHireDate = _a.excelHireDate, user = _a.user;
    //const [loadedUserMedia, setLoadedUserMedia] = useState<UserMedia>(media);
    var _b = useState(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = useState(__assign({}, media)), editedSocialMediaLinks = _c[0], setEditedSocialMediaLinks = _c[1];
    var _d = useState({}), validationErrors = _d[0], setValidationErrors = _d[1];
    var isSaveDisabled = function () {
        return (JSON.stringify(media) === JSON.stringify(editedSocialMediaLinks));
    };
    var openEditDialog = function () {
        setEditedSocialMediaLinks({
            instagram: media.instagram || '',
            meta: media.meta || '',
            telegram: media.telegram || '',
            twitter: media.twitter || '',
            linkedin: media.linkedin || '',
        });
        setIsEditing(true);
    };
    var handleSaveSocialMedia = function () {
        setValidationErrors({});
        var invalidSocials = [];
        Object.keys(editedSocialMediaLinks).forEach(function (social) {
            var value = editedSocialMediaLinks[social] || '';
            var isValid;
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
            var newValidationErrors_1 = {};
            invalidSocials.forEach(function (social) {
                newValidationErrors_1[social] = "".concat(strings.Social_Invalid, "  ").concat(social.charAt(0).toUpperCase() + social.slice(1), " ").concat(strings.Social_Username);
            });
            setValidationErrors(newValidationErrors_1);
            return;
        }
        onSaveMedia(editedSocialMediaLinks);
        //setLoadedUserMedia({ ...editedSocialMediaLinks });
        setIsEditing(false);
    };
    var editIndividualSocialMedia = function (social, value) {
        var _a;
        setEditedSocialMediaLinks(__assign(__assign({}, editedSocialMediaLinks), (_a = {}, _a[social] = value, _a)));
    };
    //Validating usernames -------------
    var isValidTwitterUsername = function (username) {
        var regex = /^[a-zA-Z0-9_]{4,50}$/; // 4-50 characters, A-Z, 0-9, and _
        return regex.test(username);
    };
    var isValidInstagramUsername = function (username) {
        var regex = /^[a-zA-Z0-9_.]{1,30}$/; //30 characters, a-z , 0-9 , _ and .
        return regex.test(username);
    };
    var isValidIMetaUsername = function (username) {
        var regex = /^[a-zA-Z0-9.]{5,50}$/; //5-50 characters, A-Z , 0-9 , and .
        return regex.test(username);
    };
    var isValidTelegramUsername = function (username) {
        var regex = /^[a-zA-Z0-9_]{5,32}$/; // 5-32 charactrrs, A-Z, 0-9, and _
        return regex.test(username);
    };
    var isValidLinkedInUsername = function (username) {
        var regex = /^[a-zA-Z0-9_]{5,30}$/; // 5-32 charactrrs, A-Z, 0-9, and _
        return regex.test(username);
    };
    //-------------------------------------------------------------
    var instUserName = media.instagram;
    var isInstagramUsernameValid = instUserName ? isValidInstagramUsername(instUserName) : false;
    var instaURL = isInstagramUsernameValid ? "https://www.instagram.com/".concat(instUserName) : '#';
    var teleUserName = media.telegram;
    var isTelegramUsernameValid = teleUserName ? isValidTelegramUsername(teleUserName) : false;
    var teleURL = isTelegramUsernameValid ? "https://t.me/".concat(teleUserName) : '#';
    var LinkedInUserName = media.linkedin;
    var isLinkedInUsernameValid = LinkedInUserName ? isValidLinkedInUsername(LinkedInUserName) : false;
    var LinkedInURL = isLinkedInUsernameValid ? "https://www.linkedin.com/in/".concat(LinkedInUserName) : '#';
    var TwitterUserName = media.twitter;
    var isTwitterUsernameValid = TwitterUserName ? isValidTwitterUsername(TwitterUserName) : false;
    var TwitterURL = isTwitterUsernameValid ? "https://twitter.com/".concat(TwitterUserName) : '#';
    var MetaUserName = media.meta;
    var isMetaUserNameValid = MetaUserName ? isValidIMetaUsername(MetaUserName) : false;
    var MetaURL = isMetaUserNameValid ? "https://facebook.com/".concat(MetaUserName) : '#';
    //--------------------------------------------------------
    var socialPlaceholders = {
        instagram: 'https://www.instagram.com/',
        linkedin: 'https://www.linkedin.com/in/',
        twitter: 'https://twitter.com/',
        telegram: 'https://t.me/',
        meta: 'https://facebook.com/'
    };
    //formatting and rendering vacation dates
    var formatDate = function (dateString) {
        if (!dateString || !moment(dateString, 'YYYY-MM-DD', true).isValid()) {
            return '';
        }
        return moment(dateString).format('DD.MM.YYYY');
    };
    var firstformattedDate = formatDate(firstPart);
    //console.log('formattedDate second part',firstformattedDate);
    var secondformattedDate = formatDate(secondPart);
    //console.log('formattedDate second part',secondformattedDate);
    // Calculate by adding 14 days 
    var addDays = function (dateString, days) {
        if (!dateString || !moment(dateString, 'YYYY-MM-DD', true).isValid()) {
            return '';
        }
        return moment(dateString).add(days, 'days').format('DD.MM.YYYY');
    };
    var datePlus14First = addDays(firstPart, 14);
    // console.log('datePlus14First:', datePlus14First);
    var datePlus14Second = addDays(secondPart, 14);
    // console.log('datePlus14Second:', datePlus14Second);
    var applyStrikethrough = function (date, currentDate) {
        return { textDecoration: date && moment(date, 'DD.MM.YYYY').isBefore(moment(currentDate, 'DD.MM.YYYY')) ? 'line-through' : 'none' };
    };
    var currentDate = moment().format('DD.MM.YYYY');
    // console.log('currentDate', currentDate);
    var renderDate = function (fromDate, toDate) { return (React.createElement("div", { style: applyStrikethrough(toDate, currentDate) }, toDate ? "".concat(strings.Social_from, " ").concat(fromDate, " ").concat(strings.Social_To, " ").concat(toDate) : 'No Data')); };
    var UserVacationDates1 = (React.createElement("span", null, firstformattedDate === '30.12.1899' ? 'No Data' : renderDate(firstformattedDate, datePlus14First)));
    var UserVacationDates2 = (React.createElement("span", null, secondformattedDate === '30.12.1899' ? 'No Data' : renderDate(secondformattedDate, datePlus14Second)));
    var formattedHireDate = excelHireDate === '30.12.1899' ? '' : formatDate(excelHireDate);
    var RenderFormattedHireDate = formattedHireDate === '30.12.1899' ? '' : formattedHireDate;
    //console.log('formattedHireDate',formattedHireDate)
    var userId = user === null || user === void 0 ? void 0 : user.id;
    //const workTime = excelHireDate === '1899.12.30' ? 'No Data' : getWorkTime(formattedHireDate);
    var RenderWorkTime = formattedHireDate === '30.12.1899' ? 'No Data' : getWorkTime(formattedHireDate);
    return (React.createElement("div", { className: styles.firstBox },
        React.createElement("div", { className: styles.lowerinfo },
            React.createElement("div", { className: styles.bluebox },
                React.createElement("div", { className: styles.colorbox },
                    React.createElement("span", { className: styles.jobDuration },
                        strings.Social_ProjectTime,
                        " ",
                        React.createElement("br", null),
                        "\u00A0",
                        RenderFormattedHireDate,
                        " \u00A0 "),
                    " ",
                    React.createElement("br", null),
                    React.createElement("span", { className: styles.workTime },
                        "| \u00A0 ",
                        RenderWorkTime,
                        " ")),
                React.createElement("div", { className: styles.socialIconContainer },
                    Object.keys(media).every(function (key) { return media[key] === ""; }) ? (React.createElement("div", null, _isMyProfile ? (React.createElement("div", { className: styles.editIcon },
                        React.createElement("div", { className: styles.addSocialsBox },
                            " ",
                            strings.Social_addLinks,
                            " \u00A0 "))) : (React.createElement("div", { className: styles.addSocialsBox }, strings.Social_noSocialNetworks)))) : (React.createElement("div", { className: styles.socialIconContainer },
                        media && media.meta && React.createElement("a", { href: MetaURL, target: "_blank", rel: "noopener noreferrer", className: "".concat(styles.socialIcon, " ").concat(styles.meta) }),
                        media && media.instagram && (React.createElement("div", { className: styles.instasocials },
                            React.createElement("a", { href: instaURL, target: "_blank", rel: "noopener noreferrer", className: styles.insta }))),
                        media && media.linkedin && (React.createElement("a", { href: LinkedInURL, target: "_blank", rel: "noopener noreferrer", className: "".concat(styles.socialIcon, " ").concat(styles.linkedin) })),
                        media && media.telegram && (React.createElement("a", { href: teleURL, target: "_blank", rel: "noopener noreferrer", className: "".concat(styles.socialIcon, " ").concat(styles.telegram) })),
                        media && media.twitter && (React.createElement("a", { href: TwitterURL, target: "_blank", rel: "noopener noreferrer", className: "".concat(styles.socialIcon, " ").concat(styles.twitter) })))),
                    _isMyProfile && (React.createElement("div", { className: styles.editIcon, onClick: openEditDialog },
                        React.createElement("div", { className: styles.pencil }))))),
            React.createElement(PrimaryButton, { href: "https://eneraseg.sharepoint.com/sites/UZMTO2/SitePages/Seating-Map.aspx?userId=".concat(userId), target: "_blank", className: styles.greencolorboxSeat, styles: { root: { border: 'none' } } }, "Where I sit"),
            React.createElement("div", { className: styles.greenbox },
                React.createElement("div", null,
                    React.createElement("div", { className: styles.labels },
                        strings.Social_vacationPlan,
                        " \u00A0")),
                UserVacationDates1 || UserVacationDates2 ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: styles.greencolorbox }, UserVacationDates1),
                    React.createElement("div", { className: styles.greencolorbox }, UserVacationDates2))) : (React.createElement("div", null, strings.Skills_NoData)))),
        React.createElement(Dialog, { hidden: !isEditing, styles: dialogStyles, dialogContentProps: {
                type: DialogType.largeHeader,
                title: strings.Social_editSocialMedia,
            } },
            React.createElement("div", { className: styles.socialEditDialog }, Object.keys(editedSocialMediaLinks).map(function (social) { return (React.createElement("div", { key: social, className: styles.socialEditRow },
                React.createElement("div", { className: styles.firsthalf },
                    styles[social] && (React.createElement("div", { className: "".concat(styles.socialIcon, " ").concat(styles[social]) })),
                    social === 'instagram' && styles.insta && (React.createElement("div", { className: styles.instasocials },
                        React.createElement("div", { className: styles.insta }))),
                    React.createElement("label", { className: styles.socialslabel }, social.charAt(0).toUpperCase() + social.slice(1))),
                React.createElement("div", { className: styles.coloumnbox },
                    React.createElement("div", { className: styles.socialInputContainer },
                        React.createElement("span", { className: styles.linkStyle }, socialPlaceholders[social]),
                        React.createElement("input", { type: "text", value: editedSocialMediaLinks[social] || '', onChange: function (e) {
                                setValidationErrors(function (prevErrors) {
                                    var _a;
                                    return (__assign(__assign({}, prevErrors), (_a = {}, _a[social] = '', _a)));
                                });
                                editIndividualSocialMedia(social, e.target.value);
                            }, className: styles.inputStyle })),
                    React.createElement("div", { className: styles.errorbox }, validationErrors[social] && (React.createElement("div", { className: styles.errorMessage }, validationErrors[social])))))); })),
            React.createElement(DialogFooter, null,
                React.createElement(PrimaryButton, { onClick: handleSaveSocialMedia, text: strings.Social_save, disabled: isSaveDisabled() }),
                React.createElement(DefaultButton, { onClick: function (e) { e.preventDefault(); setIsEditing(false); }, text: strings.Social_cancel })))));
};
export default SocialsAndOther;
//# sourceMappingURL=SocialsAndOther.js.map