/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
    id: string;
}



declare var albedoList: AlbedoList;

interface AlbedoList {
    init(target?: any): void;

    initTable(table: any, formBtn: any, option?: any): void;
}
declare var albedoForm: AlbedoForm;

interface AlbedoForm {
    init(target?: any): void;

    initSave(target?: any, validateFun?: any): void;

    initValidate(target?: any, option?: any): void;

    validate(target?: any): void;

    initFormData(selector: string, user: any): void;

    initTree(target?: any): void;
}

declare var albedo: Albedo;

interface Albedo {
    setCtx(ctx: any): void;

    setToken(token: any): void;

    setUserCookie(key: string, value: any): void;

    getUserCookie(s: string): any;

    setUserId(userId: String): void;
}
declare var mApp: MApp;

interface MApp {
    alert(options: any): void;
}


declare var toastr: Toastr;

interface Toastr {
    info(message: string, options?: any): void;
    warning(message: string, options?: any): void;
    success(message: string, options?: any): void;
    error(message: string, options?: any): void;
}




interface JQuery {
    mMenu(options: any): JQuery;

    animateClass(options: any): JQuery;

    setActiveItem(item: any): JQuery;

    getPageTitle(item: any): JQuery;

    getBreadcrumbs(item: any): JQuery;

    validate(options?: any): JQuery;

    mDatatable(options: any): JQuery;

    loadFilterGird(): JQuery;

    selectpicker(): JQuery;

    select2(): JQuery;

    valid(): JQuery;

    resetForm(): JQuery;

    markdown(): JQuery;

    mTreeInit(obj: any, setting: any, data: any): JQuery;

    mTreeObj(s: string): any;
}



