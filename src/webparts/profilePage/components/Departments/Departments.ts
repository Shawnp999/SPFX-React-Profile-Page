export interface IDepartment {
  departmentName: string;
  departmentAAD: string;
  groupEmail?: string; 
}

export class Department implements IDepartment {
  departmentName: string;
  departmentAAD: string;
  groupEmail?: string;

  constructor(departmentName: string, departmentAAD?: string, groupEmail?: string) {
    this.departmentName = departmentName;
    this.departmentAAD = departmentAAD || departmentName;
    this.groupEmail = groupEmail;
  }
}
