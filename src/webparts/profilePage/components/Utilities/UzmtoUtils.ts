
import { Moment } from 'moment';
import * as moment from 'moment';
import * as strings from 'ProfilePageWebPartStrings';

export const getRightWord = (value: number, words: string[]) => {
  let num = value % 100;
  if (num > 19) {
    num = num % 10;
  }

  switch (num) {
    case 1:
      return words[0];
    case 2:
    case 3:
    case 4:
      return words[1];
    default:
      return words[2];
  }
};

// export const getWorkTime = (hireDate: string) => {
//   if (!hireDate) {
//     return '';
//   }

//   const hDate: Moment = moment(hireDate, "YYYY-MM-DDTHH:mm:ssZ");
//   const currentDate: Moment = moment();

//   const years = currentDate.diff(hDate, 'years');
//   const months = currentDate.diff(hDate, 'months');

//   let result = '';

//   if (years > 0) {
//     result += `${years} ${getRightWord(years, [strings.Social_Year, strings.Social_years, strings.Social_years])} `;
//   }

//   if (months >= 12) {
//     const remainingMonths = months % 12;
//     if (remainingMonths > 0) {
//       result += `${remainingMonths} ${getRightWord(remainingMonths, [strings.Social_month, strings.Social_month, strings.Social_month])}`;
//     }
//   } else {
//     result += `${months} ${getRightWord(months, [strings.Social_month, strings.Social_month, strings.Social_month])}`;
//   }

//   return result.trim();
// };

export const getWorkTime = (formattedHireDate: string) => {
  if (!formattedHireDate || formattedHireDate === '01.01.0001') {
    return '';
  }

  const hDate: Moment = moment(formattedHireDate, "DD.MM.YYYY");
  const currentDate: Moment = moment();

  const years = currentDate.diff(hDate, 'years');
  const months = currentDate.diff(hDate, 'months');

  let result = '';

  if (years > 0) {
    result += `${years} ${getRightWord(years, [strings.Social_Year, strings.Social_years, strings.Social_years])} `;
  }

  if (months >= 12) {
    const remainingMonths = months % 12;
    if (remainingMonths > 0) {
      result += `${remainingMonths} ${getRightWord(remainingMonths, [strings.Social_month, strings.Social_month, strings.Social_month])}`;
    }
  } else {
    result += `${months} ${getRightWord(months, [strings.Social_month, strings.Social_month, strings.Social_month])}`;
  }

  return result.trim();
};




export const formatToDDMMYYYY = (dateString: string | undefined): string => {
  if (!dateString) {
    return '';
  }

  const formattedDate: string = moment.utc(dateString).format('DD.MM.YYYY');
  return formattedDate;
};

