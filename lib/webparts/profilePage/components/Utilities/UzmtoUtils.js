import * as moment from 'moment';
import * as strings from 'ProfilePageWebPartStrings';
export var getRightWord = function (value, words) {
    var num = value % 100;
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
export var getWorkTime = function (formattedHireDate) {
    if (!formattedHireDate || formattedHireDate === '01.01.0001') {
        return '';
    }
    var hDate = moment(formattedHireDate, "DD.MM.YYYY");
    var currentDate = moment();
    var years = currentDate.diff(hDate, 'years');
    var months = currentDate.diff(hDate, 'months');
    var result = '';
    if (years > 0) {
        result += "".concat(years, " ").concat(getRightWord(years, [strings.Social_Year, strings.Social_years, strings.Social_years]), " ");
    }
    if (months >= 12) {
        var remainingMonths = months % 12;
        if (remainingMonths > 0) {
            result += "".concat(remainingMonths, " ").concat(getRightWord(remainingMonths, [strings.Social_month, strings.Social_month, strings.Social_month]));
        }
    }
    else {
        result += "".concat(months, " ").concat(getRightWord(months, [strings.Social_month, strings.Social_month, strings.Social_month]));
    }
    return result.trim();
};
export var formatToDDMMYYYY = function (dateString) {
    if (!dateString) {
        return '';
    }
    var formattedDate = moment.utc(dateString).format('DD.MM.YYYY');
    return formattedDate;
};
//# sourceMappingURL=UzmtoUtils.js.map