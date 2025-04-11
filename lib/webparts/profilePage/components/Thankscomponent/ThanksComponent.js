import * as React from 'react';
// import { useState, useRef } from 'react';
import styles from './ThanksComponent.module.scss';
import * as strings from 'ProfilePageWebPartStrings';
var ThanksComponent = function (_a) {
    // const [isEditMode, setIsEditMode] = useState<boolean>(false);
    // const textThanksMesComponentRef = useRef<HTMLTextAreaElement>(null);
    var compliment = _a.compliment, onSave = _a.onSave;
    // const handleThanksMesSaveComponent = () => {
    //   if (textThanksMesComponentRef && textThanksMesComponentRef.current) {
    //     onSave({
    //       compliment: textThanksMesComponentRef.current.value,
    //     });
    //     setIsEditMode(false);
    //   }
    // };
    var handleLeaveThanks = function () {
        // Show an alert when the "Оставить благодарность" button is pressed
        alert(strings.Thanks_appInDevelopment);
    };
    // const handleCancelThanksMesComponent = () => {
    //   setIsEditMode(false);
    // };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.thanksCont },
            React.createElement("div", { className: styles.labelRow },
                strings.Thanks_title,
                " \u00A0"),
            React.createElement("div", { className: styles.thanksContent },
                React.createElement("div", { className: styles.fiftypercellleft },
                    React.createElement("textarea", { className: styles.bottomtextbox, style: { resize: 'none' }, value: compliment }),
                    React.createElement("button", { className: styles.greenbutton, id: 'leave-thanks-btn', "data-prop": 'languages', onClick: handleLeaveThanks }, strings.Thanks_leaveThanks)),
                React.createElement("div", { className: styles.fiftypercellright },
                    React.createElement("div", { style: { minWidth: '100px' } },
                        React.createElement("div", { className: styles.orangeboxes }, "3"),
                        React.createElement("div", { className: styles.orangeBoxesText }, strings.Thanks_lastMonth)),
                    React.createElement("div", { style: { minWidth: '100px' } },
                        React.createElement("div", { className: styles.orangeboxes }, "17"),
                        React.createElement("div", { className: styles.orangeBoxesText }, strings.Thanks_thisYear)),
                    React.createElement("div", { style: { minWidth: '100px' } },
                        React.createElement("div", { className: styles.orangeboxes }, "38"),
                        React.createElement("div", { className: styles.orangeBoxesText }, strings.Thanks_allTime)))))));
};
export default ThanksComponent;
//# sourceMappingURL=ThanksComponent.js.map