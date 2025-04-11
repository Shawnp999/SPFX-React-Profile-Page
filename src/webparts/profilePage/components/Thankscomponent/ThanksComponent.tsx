import * as React from 'react';
// import { useState, useRef } from 'react';
import styles from './ThanksComponent.module.scss';
import * as strings from 'ProfilePageWebPartStrings';

interface ThanksMesComponent {
  compliment: string;
  onSave: (value: {}) => void;
  _isMyProfile: boolean;
}

const ThanksComponent: React.FC<ThanksMesComponent> = ({ compliment, onSave }) => {
  // const [isEditMode, setIsEditMode] = useState<boolean>(false);
  // const textThanksMesComponentRef = useRef<HTMLTextAreaElement>(null);

  // const handleThanksMesSaveComponent = () => {
  //   if (textThanksMesComponentRef && textThanksMesComponentRef.current) {
  //     onSave({
  //       compliment: textThanksMesComponentRef.current.value,
  //     });
  //     setIsEditMode(false);
  //   }
  // };

  const handleLeaveThanks = () => {
    // Show an alert when the "Оставить благодарность" button is pressed
    alert(strings.Thanks_appInDevelopment);
  };

  // const handleCancelThanksMesComponent = () => {
  //   setIsEditMode(false);
  // };

  return (
    <>
      <div className={styles.thanksCont}>
        <div className={styles.labelRow}>
          {strings.Thanks_title} &nbsp;
          {/* <div className={styles.editIcon} onClick={handleLeaveThanks}>
            🖉
          </div> */}
        </div>
        <div className={styles.thanksContent}>
          <div className={styles.fiftypercellleft}>
            <textarea
              className={styles.bottomtextbox}
              style={{ resize: 'none' }}
              value={compliment}
            ></textarea>
            <button
              className={styles.greenbutton}
              id='leave-thanks-btn'
              data-prop='languages'
              onClick={handleLeaveThanks}
            >
              {strings.Thanks_leaveThanks}
            </button>
          </div>
          <div className={styles.fiftypercellright}>
            <div style={{ minWidth: '100px' }}>
              <div className={styles.orangeboxes}>3</div>
              <div className={styles.orangeBoxesText}>{strings.Thanks_lastMonth}</div>
            </div>
            <div style={{ minWidth: '100px' }}>
              <div className={styles.orangeboxes}>17</div>
              <div className={styles.orangeBoxesText}>{strings.Thanks_thisYear}</div>
            </div>
            <div style={{ minWidth: '100px' }}>
              <div className={styles.orangeboxes}>38</div>
              <div className={styles.orangeBoxesText}>{strings.Thanks_allTime}</div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};


export default ThanksComponent;
