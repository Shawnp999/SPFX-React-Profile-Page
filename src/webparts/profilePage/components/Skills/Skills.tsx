import * as React from 'react';
import { useState, useRef } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import styles from './Skills.module.scss';
import * as strings from 'ProfilePageWebPartStrings';

interface SkillsProps {
  skills: string[] | null | undefined;
  onSave: (skills: {}) => void;
  _isMyProfile: boolean;
}

const Skills: React.FC<SkillsProps> = ({ skills, onSave, _isMyProfile }) => {
  const [editedSkills, setEditedSkills] = useState<string[]>(skills || []);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const openEditDialog = () => {
    setEditedSkills(skills || []);
    setIsEditing(true);
  };

  const handleSaveSkills = () => {
    onSave({
      skills: editedSkills,
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (inputRef.current?.value === '') {
      setErrorMsg(strings.Skills_EmptyFieldError);
      return;
    }

    setErrorMsg('');
    setEditedSkills([...editedSkills, inputRef.current!.value]);
    inputRef.current!.value = '';
  };
  const removeSkill = (index: number) => {
    setEditedSkills((prevSkills) => prevSkills.filter((s, i) => i !== index));
  };

  const isSaveDisabled = () => {
    return (
      JSON.stringify(skills) === JSON.stringify(editedSkills)
    );
  };

  return (
    <>
      <div className={styles.skillscont}>
        <div className={styles.labelRow}>
          {strings.Skills_Label} &nbsp;
          {_isMyProfile && (
            <div className={styles.editIcon} onClick={openEditDialog}>
              <div className={styles.pencil} />
            </div>
          )}
        </div>

        <div className={styles.skillsContent}>
          {skills !== null && skills!.length > 0 ? (
            skills!.map((skill, index) => (
              <div className={styles.skillsbox} key={index}>
                <div className={styles.widthRender}> {skill} </div>
              </div>
              ))
            ) : (
              <div className={styles.addskillsbox}>
                {_isMyProfile ? strings.Skills_AddSkills : strings.Skills_NoData}
              </div>
            )} 
        </div>
      </div>


      <Dialog
        hidden={!isEditing}
        dialogContentProps={{
          type: DialogType.normal,
          title: strings.Skills_Title,
        }}
      >
        <div className={styles.skillscont}>
          {editedSkills.map((skill, index) => {
            return (
              <div className={styles.skillsboxdialog} key={index}>
                <div className={styles.maxWidth}>{skill} </div>
                <span className={styles.removeSkillButton} onClick={() => removeSkill(index)}>
                  &nbsp; X &nbsp; {' '}
                </span>
              </div>
            );
          })}
        </div>

        <div >
          <input className={styles.skillsboxdialog} ref={inputRef}></input>
          <span className={styles.errormsg}>{errorMsg}</span>
        </div>

        <button onClick={addSkill}> {strings.Skills_AddButton} </button>

        <DialogFooter>
          <PrimaryButton type="button" onClick={handleSaveSkills} text={strings.Skills_SaveButton} disabled={isSaveDisabled()} />
          <DefaultButton type="button" onClick={() => setIsEditing(false)} text={strings.Skills_CancelButton} />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Skills;
