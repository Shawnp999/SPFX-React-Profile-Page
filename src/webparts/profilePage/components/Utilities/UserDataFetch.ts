import { MSGraphClientV3 } from '@microsoft/sp-http';
import { UzmtoUser } from '../Useruzmto/UzmtoUser';
import * as moment from 'moment';

interface ExcelRow {
  nameRus: string;
  FIO: string;
  Position: string;
  firstPart: number;
  secondPart: number;
  birthday: string;
  hiredate: number;
}

const fetchExcelData = async (client: MSGraphClientV3): Promise<any[]> => {
  try {
    const response = await client
      .api(`https://graph.microsoft.com/beta/sites/eneraseg.sharepoint.com,78d24909-8203-47e2-8f6c-d52b62b39808,5cb48ff4-9da9-4b5b-8ef2-051960c7a180/drives/b!CUnSeAOC4kePbNUrYrOYCPSPtFypnVtLjvIFGWDHoYDXrKfhI9hcRIVAQOzb0i9W/items/017OOUJUBXHLJDZ7O63VD3ZHUVVJOG7BEU/workbook/worksheets('{00000000-0001-0000-0000-000000000000}')/range(address='2024!B1:K556')`)
      .get();

    const values = response?.values || [];
    return values;
  } catch (error) {
    console.error("Error fetching Excel data:", error);
    if (error instanceof Error) {
      // Check for specific error messages that might indicate permission issues
      if (error.message.includes("Access denied") || error.message.includes("UnauthorizedAccess")) {
        throw new Error("You don't have permission to access this Excel file. Please contact your administrator.");
      }
    }
    throw error;
  } 
};

const processData = (excelData: any): ExcelRow[] => {
  if (Array.isArray(excelData) && excelData.length > 0) {
    const mappedData: ExcelRow[] = excelData.map((row: any) => ({
      nameRus: row[0],
      FIO: row[1],
      Position: row[2],
      firstPart: row[3],
      secondPart: row[4],
      birthday: row[8],
      hiredate: row[9], 
    }));

    //console.log('mappeddata',mappedData)
    return mappedData;
  } else {
    console.log("Excel data is empty or not an array.");
    return [];
  }
};



const getFormattedDate = (excelSerialDateNumber: number | null): string => {
  if (excelSerialDateNumber) {
    //calc number of days since Dec 30, 1899
    const date = moment('1899-12-30').add(excelSerialDateNumber, 'days');
    
    const formattedDate = date.format('YYYY-MM-DD');
    
    return formattedDate;
  }
  return 'Not defined';
};


const getVacationDatesByUser = async (client: MSGraphClientV3, user: UzmtoUser): Promise<{ vacationDate1: string, vacationDate2: string, hireDate: string, birthday: string }> => {
  try {
    const excelData = await fetchExcelData(client);
    const userData = findUserByUsername(processData(excelData), user?.displayName || "");

    if (userData) {
      const { firstPart, secondPart, hiredate, birthday } = userData; 

      const vacationDate1 = getFormattedDate(firstPart);
      const vacationDate2 = getFormattedDate(secondPart);
      const hireDate = getFormattedDate(hiredate);
      const userBirthday = birthday
      // console.log(`First vacation date: `,vacationDate1);
      // console.log(`Second vacation date: `, vacationDate2);
      console.log(`Hire date:`, hireDate);
      // console.log(`Birthday: ` , userBirthday);

      return { vacationDate1, vacationDate2, hireDate, birthday: userBirthday };
    } else {
      console.log('User not found in Excel data.');
      
      return { vacationDate1: 'Not defined', vacationDate2: 'Not defined', hireDate: 'Not defined', birthday: 'Not defined' };
    }
  } catch (error) {
    console.error("Error getting vacation dates", error);
    throw error;
  }
};

const findUserByUsername = (data: ExcelRow[], username: string): ExcelRow | undefined => {
  const trimmedUsername = username.trim();

  const foundUser = data.find((user) => {
    const trimmedUserRus = user.nameRus.trim();
    const trimmedUserFIO = user.FIO.trim();

    // Check both FIO and nameRus
    return trimmedUserRus === trimmedUsername || trimmedUserFIO === trimmedUsername;
  });

  return foundUser;
};

export { getVacationDatesByUser };
