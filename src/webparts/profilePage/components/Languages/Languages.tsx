import * as React from 'react';
import { useState, useRef } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import styles from './Languages.module.scss';
import * as strings from 'ProfilePageWebPartStrings';

interface LanguagesProps {
  languages: string[] | null | undefined;
  onSave: (languages: string[], callBackFn: any) => void;
  _isMyProfile: boolean;
}

const Languages: React.FC<LanguagesProps> = ({ languages, onSave, _isMyProfile }) => {
  const [editedLangs, setEditedLangs] = useState<string[]>(languages || []);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const openEditDialog = () => {
    setEditedLangs(languages || []);
    setIsEditing(true);
  };

  const handleSaveLang = () => {
    onSave(editedLangs, setIsEditing(false));
    ;
  };

  const addLang = () => {
    if (inputRef.current?.value === '') {
      setErrorMsg(strings.Languages_EmptyFieldError);
      return;
    }

    setErrorMsg('');
    setEditedLangs([...editedLangs, inputRef.current!.value]);
    inputRef.current!.value = '';
  };

  const removeLang = (index: number) => {
    setEditedLangs((prevLangs) => prevLangs.filter((s, i) => i !== index));
  };

  const isSaveDisabled = () => {
    return (
      JSON.stringify(languages) === JSON.stringify(editedLangs)
    );
  };

  return (
    <>
      <div className={styles.skillscont}>
        <div className={styles.labelRow}>
          {strings.Languages_Label} &nbsp;
          {_isMyProfile && (
            <div className={styles.editIcon} onClick={openEditDialog}>
              <div className={styles.pencil} />
            </div>
          )}
        </div>

        <div className={styles.skillsContent}>
          {languages !== null && languages !== undefined && languages.length > 0 ? (
            languages.map((lang, index) => (
              <div className={styles.skillsbox} key={index}>
                <div className={styles.widthRender}> {lang} </div>
              </div>
            ))
          ) : (
            <div className={styles.addLangsBox}>
              {_isMyProfile ? strings.Languages_AddLanguages : strings.Languages_NoData}
            </div>
          )}
        </div>
      </div>

        <Dialog
          hidden={!isEditing}
          dialogContentProps={{
            type: DialogType.normal,
            title: strings.Languages_Title,
          }}
        >
          <div className={styles.skillscont}>
            {editedLangs.map((lang, index) => {
              return (
                <div className={styles.skillsboxdialog} key={index}>
                  <div className={styles.maxWidth}> {lang} </div>
                  <span className={styles.removeSkillButton} onClick={() => removeLang(index)}>
                    &nbsp; X{' '}
                  </span>
                </div>
              );
            })}
          </div>

          <div>
            <input className={styles.skillsboxdialog} ref={inputRef}></input>
            <span className={styles.errormsg}>{errorMsg}</span>
          </div>

          <button onClick={addLang}>{strings.Languages_AddButton}</button>

          <DialogFooter>
            <PrimaryButton type="button" onClick={handleSaveLang} text={strings.Languages_SaveButton} disabled={isSaveDisabled()} />
            <DefaultButton type="button" onClick={() => setIsEditing(false)} text={strings.Languages_CancelButton} />
          </DialogFooter>

        </Dialog>   

    </>
  );
};

export default Languages;
