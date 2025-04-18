// excelService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
export var fetchExcelData = function (client) { return __awaiter(void 0, void 0, void 0, function () {
    var response, values, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client
                        .api("https://graph.microsoft.com/beta/sites/eneraseg.sharepoint.com,78d24909-8203-47e2-8f6c-d52b62b39808,5cb48ff4-9da9-4b5b-8ef2-051960c7a180/drives/b!CUnSeAOC4kePbNUrYrOYCPSPtFypnVtLjvIFGWDHoYDXrKfhI9hcRIVAQOzb0i9W/items('017OOUJUDHZ7HRSAXX6NHLCXI25APSOYNE')/workbook/worksheets('{00000000-0001-0000-0000-000000000000}')/range(address='2024!B1:F556')")
                        .get()];
            case 1:
                response = _a.sent();
                values = (response === null || response === void 0 ? void 0 : response.values) || [];
                return [2 /*return*/, values];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching Excel data:", error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
export var processData = function (excelData) {
    if (Array.isArray(excelData) && excelData.length > 0) {
        var mappedData = excelData.map(function (row) { return ({
            nameRus: row[0],
            FIO: row[1],
            Position: row[2],
            firstPart: row[3],
            secondPart: row[4],
        }); });
        return mappedData;
    }
    else {
        console.log("Excel data is empty or not an array.");
        return [];
    }
};
export var findUserByUsername = function (data, username) {
    var trimmedUsername = username.trim();
    var foundUser = data.find(function (user) {
        var trimmedUserRus = user.nameRus.trim();
        var trimmedUserFIO = user.FIO.trim();
        // Check both fio and nameRUs
        return trimmedUserRus === trimmedUsername || trimmedUserFIO === trimmedUsername;
    });
    // console.log('Found User:', foundUser);
    return foundUser;
};
//# sourceMappingURL=UserData.js.map