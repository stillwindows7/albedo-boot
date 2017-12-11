export class Module {
    /*** 模块类型 0 菜单模块 1权限模块 */
    public type?:string;

    public target?:string;
    /*** 请求方法*/
    public requestMethod?:string;
    /*** 链接地址 */
    public url?:string;
    /*** 图标class */
    public iconCls?:string;
    /*** 权限标识 */
    public permission?:string;
    /*** 针对顶层菜单，0 普通展示下级菜单， 1以树形结构展示 */
    public showType?:string;
    /*** 服务名称 */
    public microservice?:string;

    constructor(
        type?:string,
        target?:string,
        /*** 请求方法*/
         requestMethod?:string,
        /*** 链接地址 */
         url?:string,
        /*** 图标class */
         iconCls?:string,
        /*** 权限标识 */
         permission?:string,
        /*** 针对顶层菜单，0 普通展示下级菜单， 1以树形结构展示 */
         showType?:string,
        /*** 服务名称 */
         microservice?:string
    ) {
        this.type = type ? type : null;
        this.target = target ? target : null;
        this.requestMethod = requestMethod ? requestMethod : null;
        this.url = url ? url : null;
        this.iconCls = iconCls ? iconCls : null;
        this.permission = permission ? permission : null;
        this.showType = showType ? showType : null;
        this.microservice = microservice ? microservice : null;
    }
}
