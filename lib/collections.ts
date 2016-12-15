import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection<IProject>('projects');

interface ICollection {
    _id?: string;
}

export interface IProject extends ICollection {
    projectNo?: number;
    projectName?: string;
    buildDate?: Date;
    design?: Design; // array
    machining?: Machining;
    molding?: Molding;
}

type Design = {
    orderNum?: string; // 訂單編號
    moldNum?: string; // 模具編號
    Template?: string; // 模具設計樣板
    cumstomerId?: string; // 客戶編號
    productName?: string; // 品名
    orderDate?: string; // 訂單時間
    deadlineTime?: string; // 完工時間
    Event?: string;
    Data?: string;
    Date?: string;
    Percent?: number;
};

type Machining = {
    machiningNo: number;
    machiningProgress: number;
};

type Molding = {
    moldingNo: number;
    moldingProgress: number;
};
