import {Tree} from "../../base/model/tree.model";

export class Module extends Tree{
    /*** 模块类型 0 菜单模块 1权限模块 */
    public type?: string;

    public target?: string;
    /*** 请求方法*/
    public requestMethod?: string;
    /*** 链接地址 */
    public url?: string;
    /*** 图标class */
    public iconCls?: string;
    /*** 权限标识 */
    public permission?: string;
    /*** 针对顶层菜单，0 普通展示下级菜单， 1以树形结构展示 */
    public showType?: string;
    /*** 服务名称 */
    public microservice?: string;
    /*** 菜单子节点 */
    public menuLeaf?: boolean;
    /*** 顶层菜单 */
    public menuTop?: boolean;
    /*** 是否显示 */
    public show?: boolean;
    /*** 链接名 */
    public hrefName?: string;




    constructor(
        type?: string,
        target?: string,
        /*** 请求方法*/
        requestMethod?: string,
        /*** 链接地址 */
        url?: string,
        /*** 图标class */
        iconCls?: string,
        /*** 权限标识 */
        permission?: string,
        /*** 针对顶层菜单，0 普通展示下级菜单， 1以树形结构展示 */
        showType?: string,
        /*** 服务名称 */
        microservice?: string,
        /*** 菜单子节点 */
        menuLeaf?: boolean,
        /*** 顶层菜单 */
        menuTop?: boolean,
        /*** 是否显示 */
        show?: boolean,
        /*** 链接名 */
        hrefName?: string
    ) {
        super();
        this.type = type ? type : null;
        this.target = target ? target : null;
        this.requestMethod = requestMethod ? requestMethod : null;
        this.url = url ? url : null;
        this.iconCls = iconCls ? iconCls : null;
        this.permission = permission ? permission : null;
        this.showType = showType ? showType : null;
        this.microservice = microservice ? microservice : null;
        this.menuLeaf = menuLeaf ? menuLeaf : null;
        this.menuTop = menuTop ? menuTop : null;
        this.show = show ? show : null;
        this.hrefName = hrefName ? hrefName : null;
    }
}
