import * as React from 'react';
import { UserMedia } from '../Useruzmto/UzmtoUser';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
interface SocialsAndOtherProps {
    user: MicrosoftGraph.User | undefined;
    hiredate: string | undefined;
    _isMyProfile: boolean;
    media: UserMedia;
    onSaveMedia: (editedMedia: any) => void;
    firstPart: string;
    secondPart: string;
    excelHireDate?: string;
}
declare const SocialsAndOther: React.FC<SocialsAndOtherProps>;
export default SocialsAndOther;
//# sourceMappingURL=SocialsAndOther.d.ts.map