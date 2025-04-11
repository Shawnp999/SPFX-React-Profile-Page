import * as React from 'react';
import { WebPartContext } from "@microsoft/sp-webpart-base";
interface IProfilePageProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    context: WebPartContext;
}
declare const ProfilePage: React.FunctionComponent<IProfilePageProps>;
export default ProfilePage;
//# sourceMappingURL=ProfilePage.d.ts.map