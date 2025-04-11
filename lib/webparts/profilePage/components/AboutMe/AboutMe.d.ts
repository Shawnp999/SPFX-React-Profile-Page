import * as React from 'react';
interface AboutMeProps {
    aboutMe: string;
    onSave: (value: {
        aboutMe: string;
    }) => void;
    _isMyProfile: boolean;
}
declare const AboutMe: React.FC<AboutMeProps>;
export default AboutMe;
//# sourceMappingURL=AboutMe.d.ts.map