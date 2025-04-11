import * as React from 'react';
import {useState, useEffect} from 'react';
import {WebPartContext} from "@microsoft/sp-webpart-base";
import {MSGraphClientV3} from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import UserInfo from './UserInfo/UserInfo';
import styles from './ProfilePage.module.scss';
import SocialsAndOther from './SocialsAndVaca/SocialsAndOther';
import AboutMe from './AboutMe/AboutMe';
import Skills from './Skills/Skills';
//import ThanksComponent from './Thankscomponent/ThanksComponent';
import {UserMedia} from './Useruzmto/UzmtoUser';
import {OrgStructure} from './Departments/Orgstructure';
import Languages from './Languages/Languages';
import {getVacationDatesByUser} from './Utilities/UserDataFetch';

//import { UzmtoUser } from './Useruzmto/UzmtoUser';


interface IProfilePageProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    context: WebPartContext;
}

interface UserWithLanguages extends MicrosoftGraph.User {
    languages?: string[];
    media?: UserMedia;
    ExcelvacationDate1: string;
    ExcelvacationDate2: string;
    Excelbirthday: string;
    ExcelhireDate: string;
}


const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props: IProfilePageProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    //const [userVacaData, setUserVacaData] = useState({ firstPart: null || undefined || "", secondPart: null || undefined || "" });
    //const [manager, setManager] = useState<MicrosoftGraph.User | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorLogs, setErrorLogs] = useState<string[]>([]);
    const [user, setUser] = useState<UserWithLanguages>({
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
    });

    const orgStructure = new OrgStructure();
    orgStructure.init();

    const orgStructureMap: Map<string, string> = new Map();

    orgStructure.departments.forEach(dep => {
        orgStructureMap.set(dep.departmentAAD, dep.departmentName);
    });

    const extensionUserAdditionalSettingId = 'com.uzmto.additionalUserSettings';

    useEffect(() => {
        fetchData('');
    }, []);

    const saveUserProperty = (savedObject: any) => {

        props.context.msGraphClientFactory.getClient('3').then((client: MSGraphClientV3): void => {

            client.api('/me').update(savedObject).then(() => {

                const someExistUserProperty = Object.keys(savedObject)[0];

                setUser((prevUser) => ({
                    ...prevUser,
                    [someExistUserProperty]: savedObject[someExistUserProperty],
                }));

            });

        });
    };

    const getExtensionDataObject = (): Object => {
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


    const saveUserLangs = (userLangs: string[]) => {
        saveUserAdditionalData("languages", userLangs);
    };

    const saveUserMedia = (userMedia: any) => {
        saveUserAdditionalData("media", userMedia);
    };

    const saveUserAdditionalData = (fieldName: string, fieldValue: any) => {
        const extensionDataObject: any = getExtensionDataObject();
        extensionDataObject[fieldName] = fieldValue;

        try {
            let endpoint = `/me/extensions`;

            props.context.msGraphClientFactory.getClient('3').then((client: MSGraphClientV3): void => {

                if (user.extensions && user.extensions.length !== 0) {
                    // Patch
                    client
                        .api(endpoint + `/${extensionUserAdditionalSettingId}`)
                        .version('v1.0')
                        .patch(extensionDataObject)
                        .then((res: any) => {

                            setUser((prevUser) => ({
                                ...prevUser,
                                [fieldName]: fieldValue,
                            }));

                        });

                } else {

                    // Post
                    client
                        .api(endpoint)
                        .version('v1.0')
                        .post(extensionDataObject)
                        .then((res: any) => {

                            setUser((prevUser) => ({
                                ...prevUser,
                                [fieldName]: fieldValue,
                            }));

                        });
                }
            });

        } catch (error) {
            console.error('error', error);
        }
    };

    const _isMyProfile = user.mail === props.context.pageContext.user.email;

    const checkAppPermissions = async () => {
        try {
            const client = await props.context.msGraphClientFactory.getClient('3');
            await client.api('/me').get(); // This is a simple call to check permissions
            return true;
        } catch (error) {
            console.error("Permission check failed:", error);
            if (error instanceof Error) {
                if (error.message.includes("AccessDenied") || error.message.includes("UnauthorizedAccess")) {
                    setErrorMessage("The app doesn't have the necessary permissions.");
                    setErrorLogs(["Please have an administrator grant the required permissions in Azure AD."]);
                }
            }
            return false;
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            const hasPermissions = await checkAppPermissions();
            if (hasPermissions) {
                fetchData('');
            }
        };
    
        initializeData();
    }, []);

    const fetchData = async (searchText: string) => {
        setIsLoading(true);
        setErrorMessage(null);
        setErrorLogs([]);
    
        const params = new URLSearchParams(document.location.search);
        const userId = params.get("userId");
    
        let profileUrl = 'https://graph.microsoft.com/beta/me';
    
        if (userId) {
            profileUrl = 'https://graph.microsoft.com/beta/users/' + userId;
        }
    
        try {
            const client = await props.context.msGraphClientFactory.getClient('3');
            const user = await client.api(profileUrl + '/?$select=mail,department,hireDate,aboutMe,skills,birthday,displayName,jobTitle,mobilePhone,businessPhones&$expand=extensions,manager').get();
    
            const vacationDates = await getVacationDatesByUser(client, user);
    
            if (user.extensions) {
                const userextensions = user.extensions.find((extension: any) => extension.id === 'com.uzmto.additionalUserSettings');
                if (userextensions) {
                    user.languages = userextensions.languages && userextensions.languages != '' ? userextensions.languages : [];
                    user.media = userextensions.media ? userextensions.media : {};
                }
            }
    
            setUser({
                ...user,
                ExcelvacationDate1: vacationDates.vacationDate1,
                ExcelvacationDate2: vacationDates.vacationDate2,
                Excelbirthday: vacationDates.birthday,
                ExcelhireDate: vacationDates.hireDate,
            });
    
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error instanceof Error) {
                if (error.message.includes("AccessDenied") || error.message.includes("UnauthorizedAccess")) {
                    setErrorMessage("Access denied. Please check your app registration and permissions.");
                    setErrorLogs(["This error might be due to incorrect app registration or insufficient permissions.", 
                                  "Please verify:", 
                                  "1. Your app is properly registered in Azure AD",
                                  "2. The app has the necessary Microsoft Graph permissions",
                                  "3. An admin has consented to the required permissions"]);
                } else if (error.message.includes("InvalidAuthenticationToken")) {
                    setErrorMessage("Authentication failed. Please sign in again or check your app registration.");
                    setErrorLogs(["This error might be due to an expired or invalid authentication token.",
                                  "Please try:", 
                                  "1. Signing out and signing in again",
                                  "2. Verifying the app's client ID and secret are correct",
                                  "3. Checking if the app's registration in Azure AD is still valid"]);
                } else {
                    setErrorMessage("An error occurred while fetching user data. Please try again later.");
                    setErrorLogs(error.stack?.split('\n') || [error.message]);
                }
            } else {
                setErrorMessage("An unexpected error occurred. Please try again later.");
                setErrorLogs(["Unknown error occurred"]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // console.log('uservacadate1', user.ExcelvacationDate1)
    // console.log('ExcelvacationDate2', user.ExcelvacationDate2)
    // console.log('Excelbirthday', user.Excelbirthday)
    // console.log('ExcelhireDate', user.ExcelhireDate)

    const correctUserDepartmentName = (incorrectDepartmentName: MicrosoftGraph.NullableOption<string> | undefined): string => {
        if (incorrectDepartmentName === null || incorrectDepartmentName === undefined) {
            return 'No department';
        }

        const departmentValue = incorrectDepartmentName as string;

        if (departmentValue === null) {
            return 'No department';
        }

        const correctDepartment = orgStructure.departments.find(dep => dep.departmentAAD === departmentValue);

        if (correctDepartment === undefined) {
            return departmentValue;
        }

        return correctDepartment.departmentName;
    };

    const getUserGroupEmail = (departmentAAD: MicrosoftGraph.NullableOption<string> | undefined): string | undefined => {
        if (!departmentAAD) {
            return undefined;
        }

        const departmentName = orgStructureMap.get(departmentAAD as string);
        const correctDepartment = orgStructure.departments.find(dep => dep.departmentName === departmentName);

        return correctDepartment?.groupEmail;
    };

    user.department = correctUserDepartmentName(user.department || undefined);

    return (
        <div className={styles.mainCont}>
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <img
                        src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                        alt="Loading..."
                    />
                </div>
            ) : errorMessage ? (
                <div className={styles.errorContainer}>
                    <p>{errorMessage}</p>
                    <button onClick={() => fetchData('')}>Retry</button>
                    {errorLogs.length > 0 && (
                        <div className={styles.errorLogs}>
                            <h4>Error Details:</h4>
                            <pre>
                                {errorLogs.map((log, index) => (
                                    <div key={index}>{log}</div>
                                ))}
                            </pre>
                        </div>
                    )}
                    {errorMessage && errorMessage.includes("permissions") && (
                        <p>
                            Administrators can manage app permissions in the 
                            <a href="https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps" 
                            target="_blank" 
                            rel="noopener noreferrer">
                                Azure Portal
                            </a>.
                        </p>
                    )}
                </div>
            ) : (
                <>
                    <div className={styles.row1}>
                        <div className={styles.seventy}>
                            <UserInfo
                                user={user}
                                manager={user.manager}
                                handleSaveUserPropertyMethod={saveUserProperty}
                                _isMyProfile={_isMyProfile}
                                correctUserDepartmentName={correctUserDepartmentName}
                                groupEmail={getUserGroupEmail(user.department)}
                                ExcelBirthday={user.Excelbirthday}
                            />
                        </div>
                        <div className={styles.thirty}>

                            <SocialsAndOther
                                user={user}
                                hiredate={user.hireDate}
                                media={user.media || {}}
                                onSaveMedia={saveUserMedia}
                                _isMyProfile={_isMyProfile}
                                firstPart={user.ExcelvacationDate1}
                                secondPart={user.ExcelvacationDate2}
                                excelHireDate={user.ExcelhireDate}
                            />

                        </div>
                    </div>
                    <div className={styles.row1}>
                        <div className={styles.seventy}>
                            <AboutMe
                                aboutMe={user.aboutMe || ''}
                                onSave={saveUserProperty}
                                _isMyProfile={_isMyProfile}
                            />
                        </div>
                        <div className={styles.thirty}>
                            <Languages
                                languages={user.languages}
                                onSave={saveUserLangs}
                                _isMyProfile={_isMyProfile}
                            />
                        </div>
                    </div>
                    <div className={styles.row1}>
                        <div className={styles.seventy}>
                            {/* <ThanksComponent compliment='' onSave={saveUserProperty} _isMyProfile={_isMyProfile} /> */}
                        </div>
                        <div className={styles.thirty}>
                            <Skills
                                skills={user.skills}
                                onSave={saveUserProperty}
                                _isMyProfile={_isMyProfile}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfilePage;