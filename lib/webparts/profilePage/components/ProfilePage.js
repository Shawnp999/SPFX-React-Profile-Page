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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { useState, useEffect } from 'react';
import UserInfo from './UserInfo/UserInfo';
import styles from './ProfilePage.module.scss';
import SocialsAndOther from './SocialsAndVaca/SocialsAndOther';
import AboutMe from './AboutMe/AboutMe';
import Skills from './Skills/Skills';
import { OrgStructure } from './Departments/Orgstructure';
import Languages from './Languages/Languages';
import { getVacationDatesByUser } from './Utilities/UserDataFetch';
var ProfilePage = function (props) {
    var _a = useState(true), isLoading = _a[0], setIsLoading = _a[1];
    //const [userVacaData, setUserVacaData] = useState({ firstPart: null || undefined || "", secondPart: null || undefined || "" });
    //const [manager, setManager] = useState<MicrosoftGraph.User | undefined>(undefined);
    var _b = useState(null), errorMessage = _b[0], setErrorMessage = _b[1];
    var _c = useState([]), errorLogs = _c[0], setErrorLogs = _c[1];
    var _d = useState({
        media: {
            instagram: "",
            meta: "",
            telegram: "",
            twitter: "",
            linkedin: "",
        },
        ExcelvacationDate1: '',
        ExcelvacationDate2: '',
        Excelbirthday: '',
        ExcelhireDate: '',
    }), user = _d[0], setUser = _d[1];
    var orgStructure = new OrgStructure();
    orgStructure.init();
    var orgStructureMap = new Map();
    orgStructure.departments.forEach(function (dep) {
        orgStructureMap.set(dep.departmentAAD, dep.departmentName);
    });
    var extensionUserAdditionalSettingId = 'com.uzmto.additionalUserSettings';
    useEffect(function () {
        fetchData('');
    }, []);
    var saveUserProperty = function (savedObject) {
        props.context.msGraphClientFactory.getClient('3').then(function (client) {
            client.api('/me').update(savedObject).then(function () {
                var someExistUserProperty = Object.keys(savedObject)[0];
                setUser(function (prevUser) {
                    var _a;
                    return (__assign(__assign({}, prevUser), (_a = {}, _a[someExistUserProperty] = savedObject[someExistUserProperty], _a)));
                });
            });
        });
    };
    var getExtensionDataObject = function () {
        return {
            extensionName: extensionUserAdditionalSettingId,
            languages: user.languages,
            media: user.media || {
                instagram: "",
                meta: "",
                telegram: "",
                twitter: "",
                linkedin: "",
            },
        };
    };
    var saveUserLangs = function (userLangs) {
        saveUserAdditionalData("languages", userLangs);
    };
    var saveUserMedia = function (userMedia) {
        saveUserAdditionalData("media", userMedia);
    };
    var saveUserAdditionalData = function (fieldName, fieldValue) {
        var extensionDataObject = getExtensionDataObject();
        extensionDataObject[fieldName] = fieldValue;
        try {
            var endpoint_1 = "/me/extensions";
            props.context.msGraphClientFactory.getClient('3').then(function (client) {
                if (user.extensions && user.extensions.length !== 0) {
                    // Patch
                    client
                        .api(endpoint_1 + "/".concat(extensionUserAdditionalSettingId))
                        .version('v1.0')
                        .patch(extensionDataObject)
                        .then(function (res) {
                        setUser(function (prevUser) {
                            var _a;
                            return (__assign(__assign({}, prevUser), (_a = {}, _a[fieldName] = fieldValue, _a)));
                        });
                    });
                }
                else {
                    // Post
                    client
                        .api(endpoint_1)
                        .version('v1.0')
                        .post(extensionDataObject)
                        .then(function (res) {
                        setUser(function (prevUser) {
                            var _a;
                            return (__assign(__assign({}, prevUser), (_a = {}, _a[fieldName] = fieldValue, _a)));
                        });
                    });
                }
            });
        }
        catch (error) {
            console.error('error', error);
        }
    };
    var _isMyProfile = user.mail === props.context.pageContext.user.email;
    var checkAppPermissions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, props.context.msGraphClientFactory.getClient('3')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.api('/me').get()];
                case 2:
                    _a.sent(); // This is a simple call to check permissions
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _a.sent();
                    console.error("Permission check failed:", error_1);
                    if (error_1 instanceof Error) {
                        if (error_1.message.includes("AccessDenied") || error_1.message.includes("UnauthorizedAccess")) {
                            setErrorMessage("The app doesn't have the necessary permissions.");
                            setErrorLogs(["Please have an administrator grant the required permissions in Azure AD."]);
                        }
                    }
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        var initializeData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var hasPermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, checkAppPermissions()];
                    case 1:
                        hasPermissions = _a.sent();
                        if (hasPermissions) {
                            fetchData('');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        initializeData();
    }, []);
    var fetchData = function (searchText) { return __awaiter(void 0, void 0, void 0, function () {
        var params, userId, profileUrl, client, user_1, vacationDates, userextensions, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    setErrorMessage(null);
                    setErrorLogs([]);
                    params = new URLSearchParams(document.location.search);
                    userId = params.get("userId");
                    profileUrl = 'https://graph.microsoft.com/beta/me';
                    if (userId) {
                        profileUrl = 'https://graph.microsoft.com/beta/users/' + userId;
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, props.context.msGraphClientFactory.getClient('3')];
                case 2:
                    client = _b.sent();
                    return [4 /*yield*/, client.api(profileUrl + '/?$select=mail,department,hireDate,aboutMe,skills,birthday,displayName,jobTitle,mobilePhone,businessPhones&$expand=extensions,manager').get()];
                case 3:
                    user_1 = _b.sent();
                    return [4 /*yield*/, getVacationDatesByUser(client, user_1)];
                case 4:
                    vacationDates = _b.sent();
                    if (user_1.extensions) {
                        userextensions = user_1.extensions.find(function (extension) { return extension.id === 'com.uzmto.additionalUserSettings'; });
                        if (userextensions) {
                            user_1.languages = userextensions.languages && userextensions.languages != '' ? userextensions.languages : [];
                            user_1.media = userextensions.media ? userextensions.media : {};
                        }
                    }
                    setUser(__assign(__assign({}, user_1), { ExcelvacationDate1: vacationDates.vacationDate1, ExcelvacationDate2: vacationDates.vacationDate2, Excelbirthday: vacationDates.birthday, ExcelhireDate: vacationDates.hireDate }));
                    return [3 /*break*/, 7];
                case 5:
                    error_2 = _b.sent();
                    console.error("Error fetching data:", error_2);
                    if (error_2 instanceof Error) {
                        if (error_2.message.includes("AccessDenied") || error_2.message.includes("UnauthorizedAccess")) {
                            setErrorMessage("Access denied. Please check your app registration and permissions.");
                            setErrorLogs(["This error might be due to incorrect app registration or insufficient permissions.",
                                "Please verify:",
                                "1. Your app is properly registered in Azure AD",
                                "2. The app has the necessary Microsoft Graph permissions",
                                "3. An admin has consented to the required permissions"]);
                        }
                        else if (error_2.message.includes("InvalidAuthenticationToken")) {
                            setErrorMessage("Authentication failed. Please sign in again or check your app registration.");
                            setErrorLogs(["This error might be due to an expired or invalid authentication token.",
                                "Please try:",
                                "1. Signing out and signing in again",
                                "2. Verifying the app's client ID and secret are correct",
                                "3. Checking if the app's registration in Azure AD is still valid"]);
                        }
                        else {
                            setErrorMessage("An error occurred while fetching user data. Please try again later.");
                            setErrorLogs(((_a = error_2.stack) === null || _a === void 0 ? void 0 : _a.split('\n')) || [error_2.message]);
                        }
                    }
                    else {
                        setErrorMessage("An unexpected error occurred. Please try again later.");
                        setErrorLogs(["Unknown error occurred"]);
                    }
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // console.log('uservacadate1', user.ExcelvacationDate1)
    // console.log('ExcelvacationDate2', user.ExcelvacationDate2)
    // console.log('Excelbirthday', user.Excelbirthday)
    // console.log('ExcelhireDate', user.ExcelhireDate)
    var correctUserDepartmentName = function (incorrectDepartmentName) {
        if (incorrectDepartmentName === null || incorrectDepartmentName === undefined) {
            return 'No department';
        }
        var departmentValue = incorrectDepartmentName;
        if (departmentValue === null) {
            return 'No department';
        }
        var correctDepartment = orgStructure.departments.find(function (dep) { return dep.departmentAAD === departmentValue; });
        if (correctDepartment === undefined) {
            return departmentValue;
        }
        return correctDepartment.departmentName;
    };
    var getUserGroupEmail = function (departmentAAD) {
        if (!departmentAAD) {
            return undefined;
        }
        var departmentName = orgStructureMap.get(departmentAAD);
        var correctDepartment = orgStructure.departments.find(function (dep) { return dep.departmentName === departmentName; });
        return correctDepartment === null || correctDepartment === void 0 ? void 0 : correctDepartment.groupEmail;
    };
    user.department = correctUserDepartmentName(user.department || undefined);
    return (React.createElement("div", { className: styles.mainCont }, isLoading ? (React.createElement("div", { className: styles.loadingContainer },
        React.createElement("img", { src: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif", alt: "Loading..." }))) : errorMessage ? (React.createElement("div", { className: styles.errorContainer },
        React.createElement("p", null, errorMessage),
        React.createElement("button", { onClick: function () { return fetchData(''); } }, "Retry"),
        errorLogs.length > 0 && (React.createElement("div", { className: styles.errorLogs },
            React.createElement("h4", null, "Error Details:"),
            React.createElement("pre", null, errorLogs.map(function (log, index) { return (React.createElement("div", { key: index }, log)); })))),
        errorMessage && errorMessage.includes("permissions") && (React.createElement("p", null,
            "Administrators can manage app permissions in the",
            React.createElement("a", { href: "https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps", target: "_blank", rel: "noopener noreferrer" }, "Azure Portal"),
            ".")))) : (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.row1 },
            React.createElement("div", { className: styles.seventy },
                React.createElement(UserInfo, { user: user, manager: user.manager, handleSaveUserPropertyMethod: saveUserProperty, _isMyProfile: _isMyProfile, correctUserDepartmentName: correctUserDepartmentName, groupEmail: getUserGroupEmail(user.department), ExcelBirthday: user.Excelbirthday })),
            React.createElement("div", { className: styles.thirty },
                React.createElement(SocialsAndOther, { user: user, hiredate: user.hireDate, media: user.media || {}, onSaveMedia: saveUserMedia, _isMyProfile: _isMyProfile, firstPart: user.ExcelvacationDate1, secondPart: user.ExcelvacationDate2, excelHireDate: user.ExcelhireDate }))),
        React.createElement("div", { className: styles.row1 },
            React.createElement("div", { className: styles.seventy },
                React.createElement(AboutMe, { aboutMe: user.aboutMe || '', onSave: saveUserProperty, _isMyProfile: _isMyProfile })),
            React.createElement("div", { className: styles.thirty },
                React.createElement(Languages, { languages: user.languages, onSave: saveUserLangs, _isMyProfile: _isMyProfile }))),
        React.createElement("div", { className: styles.row1 },
            React.createElement("div", { className: styles.seventy }),
            React.createElement("div", { className: styles.thirty },
                React.createElement(Skills, { skills: user.skills, onSave: saveUserProperty, _isMyProfile: _isMyProfile })))))));
};
export default ProfilePage;
//# sourceMappingURL=ProfilePage.js.map