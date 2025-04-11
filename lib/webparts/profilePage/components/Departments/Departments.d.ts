export interface IDepartment {
    departmentName: string;
    departmentAAD: string;
    groupEmail?: string;
}
export declare class Department implements IDepartment {
    departmentName: string;
    departmentAAD: string;
    groupEmail?: string;
    constructor(departmentName: string, departmentAAD?: string, groupEmail?: string);
}
//# sourceMappingURL=Departments.d.ts.map