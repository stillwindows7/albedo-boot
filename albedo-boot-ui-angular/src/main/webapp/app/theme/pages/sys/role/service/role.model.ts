import { Data } from "../../../../../shared/index"

export class Role extends Data {
    public id?: any
    public name?: string
    public en?: string
    public type?: string
    public orgId?: string
    public orgName?: string
    public sysData?: number
    public dataScope?: number
    public sort?: number
    public moduleIdList?: string[]
    public orgIdList?: string[]

}
