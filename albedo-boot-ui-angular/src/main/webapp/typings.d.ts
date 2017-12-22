/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

declare var albedoForm: AlbedoForm;
interface AlbedoForm {
    init(): void;
}

declare var mApp: MApp;
interface MApp {
    alert(options: any): void;
}


interface JQuery {
    mMenu(options: any): JQuery;
    animateClass(options: any): JQuery;
    setActiveItem(item: any): JQuery;
    getPageTitle(item: any): JQuery;
    getBreadcrumbs(item: any): JQuery;
    validate(options: any): JQuery;
    mDatatable(options: any): JQuery;
    loadFilterGird(): JQuery;
    selectpicker(): JQuery;
    valid(): JQuery;
    resetForm(): JQuery;
    markdown(): JQuery;
}
