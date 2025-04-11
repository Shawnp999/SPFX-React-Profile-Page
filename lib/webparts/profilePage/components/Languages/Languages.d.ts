import * as React from 'react';
interface LanguagesProps {
    languages: string[] | null | undefined;
    onSave: (languages: string[], callBackFn: any) => void;
    _isMyProfile: boolean;
}
declare const Languages: React.FC<LanguagesProps>;
export default Languages;
//# sourceMappingURL=Languages.d.ts.map