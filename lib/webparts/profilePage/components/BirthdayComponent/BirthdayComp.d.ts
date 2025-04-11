import * as React from 'react';
interface User {
    birthday: string | undefined | null;
}
interface BirthdayCompProps {
    handleSaveUserPropertyMethod: (user: User) => void;
    userBirthday: string | undefined | null;
    _isMyProfile: boolean;
    ExcelBirthday: string;
}
declare const BirthdayComp: React.FC<BirthdayCompProps>;
export default BirthdayComp;
//# sourceMappingURL=BirthdayComp.d.ts.map