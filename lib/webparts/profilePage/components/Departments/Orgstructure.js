import { Department } from "./Departments";
var OrgStructure = /** @class */ (function () {
    function OrgStructure() {
        this.departments = [];
    }
    OrgStructure.prototype.init = function () {
        this.departments = [];
        var projectControlDep = new Department("Департамент проектного контроля", "");
        this.departments.push(projectControlDep);
        var itDep = new Department("Департамент информационных технологий", "");
        this.departments.push(itDep);
        var PeronManagmentdep = new Department("Департамент управления персоналом", "");
        this.departments.push(PeronManagmentdep);
        var Constructiondep = new Department("Департамент строительства", "");
        this.departments.push(Constructiondep);
        var Auditordep = new Department("Департамент внутреннего аудита, организационного развития и стратегии", "Департамент внутреннего аудита, организационного развития и стра");
        this.departments.push(Auditordep);
        var desmanagmentdep = new Department("Департамент управления проектированием", "");
        this.departments.push(desmanagmentdep);
        var financecondep = new Department("Департамент экономики и финансов", "");
        this.departments.push(financecondep);
        var admindep = new Department("Административно-хозяйственный департамент", "");
        this.departments.push(admindep);
        var ESGdep = new Department("Департамент экологического, социального и корпоративного управления", "Департамент экологического, социального и корпоративного управле");
        this.departments.push(ESGdep);
        var legaldep = new Department("Департамент корпоративно-правовой работы", "");
        this.departments.push(legaldep);
        var matprocurement = new Department("Департамент закупок оборудования и материалов", "");
        this.departments.push(matprocurement);
        var pubrelationsdep = new Department("Департамент связей с общественностью", "");
        this.departments.push(pubrelationsdep);
        var secuiritydep = new Department("Департамент безопасности и корпоративного регулирования", "");
        this.departments.push(secuiritydep);
        var laborprotdep = new Department("Департамент охраны труда, промышленной безопасности и охраны окружающей среды", ""); //, "HSES"
        this.departments.push(laborprotdep);
        var businessanalytics = new Department("Департамент аналитики и развития бизнеса", "");
        this.departments.push(businessanalytics);
        var marketdep = new Department("Департамент маркетинга", "");
        this.departments.push(marketdep);
        var managementdep = new Department("Менеджмент", "");
        this.departments.push(managementdep);
    };
    return OrgStructure;
}());
export { OrgStructure };
//# sourceMappingURL=Orgstructure.js.map