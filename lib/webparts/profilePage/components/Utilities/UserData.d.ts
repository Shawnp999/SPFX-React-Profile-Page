import { MSGraphClientV3 } from '@microsoft/sp-http';
interface ExcelRow {
    nameRus: string;
    FIO: string;
    Position: string;
    firstPart: string;
    secondPart: string;
}
export declare const fetchExcelData: (client: MSGraphClientV3) => Promise<any[]>;
export declare const processData: (excelData: any) => ExcelRow[];
export declare const findUserByUsername: (data: ExcelRow[], username: string) => ExcelRow | undefined;
export {};
//# sourceMappingURL=UserData.d.ts.map