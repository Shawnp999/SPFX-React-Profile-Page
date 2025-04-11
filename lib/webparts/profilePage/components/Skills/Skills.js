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
import styles from './Skills.module.scss';
import * as strings from 'ProfilePageWebPartStrings';
var Skills = function (_a) {
    var skills = _a.skills, onSave = _a.onSave, _isMyProfile = _a._isMyProfile;
    var _b = useState(skills || []), editedSkills = _b[0], setEditedSkills = _b[1];
    var _c = useState(false), isEditing = _c[0], setIsEditing = _c[1];
    var _d = useState(''), errorMsg = _d[0], setErrorMsg = _d[1];
    var inputRef = useRef(null);
    var openEditDialog = function () {
        setEditedSkills(skills || []);
        setIsEditing(true);
    };
    var handleSaveSkills = function () {
        onSave({
            skills: editedSkills,
        });
        setIsEditing(false);
    };
    var addSkill = function () {
        var _a;
        if (((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value) === '') {
            setErrorMsg(strings.Skills_EmptyFieldError);
            return;
        }
        setErrorMsg('');
        setEditedSkills(__spreadArray(__spreadArray([], editedSkills, true), [inputRef.current.value], false));
        inputRef.current.value = '';
    };
    var removeSkill = function (index) {
        setEditedSkills(function (prevSkills) { return prevSkills.filter(function (s, i) { return i !== index; }); });
    };
    var isSaveDisabled = function () {
        return (JSON.stringify(skills) === JSON.stringify(editedSkills));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.skillscont },
            React.createElement("div", { className: styles.labelRow },
                strings.Skills_Label,
                " \u00A0",
                _isMyProfile && (React.createElement("div", { className: styles.editIcon, onClick: openEditDialog },
                    React.createElement("div", { className: styles.pencil })))),
            React.createElement("div", { className: styles.skillsContent }, skills !== null && skills.length > 0 ? (skills.map(function (skill, index) { return (React.createElement("div", { className: styles.skillsbox, key: index },
                React.createElement("div", { className: styles.widthRender },
                    " ",
                    skill,
                    " "))); })) : (React.createElement("div", { className: styles.addskillsbox }, _isMyProfile ? strings.Skills_AddSkills : strings.Skills_NoData)))),
        React.createElement(Dialog, { hidden: !isEditing, dialogContentProps: {
                type: DialogType.normal,
                title: strings.Skills_Title,
            } },
            React.createElement("div", { className: styles.skillscont }, editedSkills.map(function (skill, index) {
                return (React.createElement("div", { className: styles.skillsboxdialog, key: index },
                    React.createElement("div", { className: styles.maxWidth },
                        skill,
                        " "),
                    React.createElement("span", { className: styles.removeSkillButton, onClick: function () { return removeSkill(index); } },
                        "\u00A0 X \u00A0 ",
                        ' ')));
            })),
            React.createElement("div", null,
                React.createElement("input", { className: styles.skillsboxdialog, ref: inputRef }),
                React.createElement("span", { className: styles.errormsg }, errorMsg)),
            React.createElement("button", { onClick: addSkill },
                " ",
                strings.Skills_AddButton,
                " "),
            React.createElement(DialogFooter, null,
                React.createElement(PrimaryButton, { type: "button", onClick: handleSaveSkills, text: strings.Skills_SaveButton, disabled: isSaveDisabled() }),
                React.createElement(DefaultButton, { type: "button", onClick: function () { return setIsEditing(false); }, text: strings.Skills_CancelButton })))));
};
export default Skills;
//# sourceMappingURL=Skills.js.map