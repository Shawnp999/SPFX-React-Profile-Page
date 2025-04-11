import * as moment from 'moment';
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
export var getWorkTime = function (hireDate) {
    if (!hireDate) {
        return '';
    }
    var hDate = moment(hireDate, "YYYY-MM-DDTHH:mm:ssZ");
    var currentDate = moment();
    var years = currentDate.diff(hDate, 'years');
    var months = currentDate.diff(hDate, 'months') % 12;
    var result = '';
    if (years > 0) {
        result += "".concat(years, " ").concat(getRightWord(years, ['Year', 'Years', 'Years']), " ");
    }
    if (months > 0) {
        result += "".concat(months, " ").concat(getRightWord(months, ['Month', 'Months', 'Months']));
    }
    return result.trim();
};
//# sourceMappingURL=Utils.js.map