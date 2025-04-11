import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export interface UzmtoUser extends MicrosoftGraph.User {
    languages?: string[];
    vacationDate1?: string;
    vacationDate2?: string;
    excelHireDate?: string;
    birthday?: string;
}
export interface UserMedia {
    instagram?: string;
    meta?: string;
    telegram?: string;
    twitter?: string;
    linkedin?: string;
}
//# sourceMappingURL=UzmtoUser.d.ts.map