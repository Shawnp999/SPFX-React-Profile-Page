var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { useState, useRef } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import styles from './Languages.module.scss';
import * as strings from 'ProfilePageWebPartStrings';
var Languages = function (_a) {
    var languages = _a.languages, onSave = _a.onSave, _isMyProfile = _a._isMyProfile;
    var _b = useState(languages || []), editedLangs = _b[0], setEditedLangs = _b[1];
    var _c = useState(false), isEditing = _c[0], setIsEditing = _c[1];
    var _d = useState(''), errorMsg = _d[0], setErrorMsg = _d[1];
    var inputRef = useRef(null);
    var openEditDialog = function () {
        setEditedLangs(languages || []);
        setIsEditing(true);
    };
    var handleSaveLang = function () {
        onSave(editedLangs, setIsEditing(false));
        ;
    };
    var addLang = function () {
        var _a;
        if (((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value) === '') {
            setErrorMsg(strings.Languages_EmptyFieldError);
            return;
        }
        setErrorMsg('');
        setEditedLangs(__spreadArray(__spreadArray([], editedLangs, true), [inputRef.current.value], false));
        inputRef.current.value = '';
    };
    var removeLang = function (index) {
        setEditedLangs(function (prevLangs) { return prevLangs.filter(function (s, i) { return i !== index; }); });
    };
    var isSaveDisabled = function () {
        return (JSON.stringify(languages) === JSON.stringify(editedLangs));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.skillscont },
            React.createElement("div", { className: styles.labelRow },
                strings.Languages_Label,
                " \u00A0",
                _isMyProfile && (React.createElement("div", { className: styles.editIcon, onClick: openEditDialog },
                    React.createElement("div", { className: styles.pencil })))),
            React.createElement("div", { className: styles.skillsContent }, languages !== null && languages !== undefined && languages.length > 0 ? (languages.map(function (lang, index) { return (React.createElement("div", { className: styles.skillsbox, key: index },
                React.createElement("div", { className: styles.widthRender },
                    " ",
                    lang,
                    " "))); })) : (React.createElement("div", { className: styles.addLangsBox }, _isMyProfile ? strings.Languages_AddLanguages : strings.Languages_NoData)))),
        React.createElement(Dialog, { hidden: !isEditing, dialogContentProps: {
                type: DialogType.normal,
                title: strings.Languages_Title,
            } },
            React.createElement("div", { className: styles.skillscont }, editedLangs.map(function (lang, index) {
                return (React.createElement("div", { className: styles.skillsboxdialog, key: index },
                    React.createElement("div", { className: styles.maxWidth },
                        " ",
                        lang,
                        " "),
                    React.createElement("span", { className: styles.removeSkillButton, onClick: function () { return removeLang(index); } },
                        "\u00A0 X",
                        ' ')));
            })),
            React.createElement("div", null,
                React.createElement("input", { className: styles.skillsboxdialog, ref: inputRef }),
                React.createElement("span", { className: styles.errormsg }, errorMsg)),
            React.createElement("button", { onClick: addLang }, strings.Languages_AddButton),
            React.createElement(DialogFooter, null,
                React.createElement(PrimaryButton, { type: "button", onClick: handleSaveLang, text: strings.Languages_SaveButton, disabled: isSaveDisabled() }),
                React.createElement(DefaultButton, { type: "button", onClick: function () { return setIsEditing(false); }, text: strings.Languages_CancelButton })))));
};
export default Languages;
//# sourceMappingURL=Languages.js.map