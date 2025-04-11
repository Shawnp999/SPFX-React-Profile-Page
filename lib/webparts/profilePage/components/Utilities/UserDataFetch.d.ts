import { MSGraphClientV3 } from '@microsoft/sp-http';
import { UzmtoUser } from '../Useruzmto/UzmtoUser';
declare const getVacationDatesByUser: (client: MSGraphClientV3, user: UzmtoUser) => Promise<{
    vacationDate1: string;
    vacationDate2: string;
    hireDate: string;
    birthday: string;
}>;
export { getVacationDatesByUser };
//# sourceMappingURL=UserDataFetch.d.ts.map