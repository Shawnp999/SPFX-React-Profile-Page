import * as React from 'react';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
interface IUserInfoProps {
    user: MicrosoftGraph.User | undefined;
    handleSaveUserPropertyMethod: any;
    manager: MicrosoftGraph.User | null | undefined;
    _isMyProfile: boolean;
    correctUserDepartmentName: (incorrectDepartmentName: string | undefined) => string;
    groupEmail: string | undefined;
    ExcelBirthday: string;
}
declare const UserInfo: React.FC<IUserInfoProps>;
export default UserInfo;
//# sourceMappingURL=UserInfo.d.ts.map